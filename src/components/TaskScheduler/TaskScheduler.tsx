import React, { useEffect, useState } from 'react';
import deLocale from '@fullcalendar/core/locales/de';
import enLocale from '@fullcalendar/core/locales/en-gb';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { IconCheck, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Button, Group, Modal } from '@mantine/core';
import { useBusinessHours } from '../../contexts/BusinessHoursContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { addEvent, deleteEvent, getEvents, updateEventDoneStatus } from '../../services/database';
import { reschedule } from '../../services/events';
import styles from './TaskScheduler.module.css';

interface DatabaseEvent {
  id?: number;
  title: string;
  start: string;
  end?: string;
  all_day?: boolean | string;
  done?: boolean | string;
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eventTitle: string;
}

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, eventTitle }: DeleteModalProps) {
  return (
    <Modal opened={isOpen} onClose={onClose} title="Delete Event" centered>
      <p>Are you sure you want to delete the event '{eventTitle}'?</p>
      <Group justify="flex-end" mt="md">
        <Button variant="light" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
}

export function TaskScheduler() {
  const [_currentEvents, setCurrentEvents] = useState<any[]>([]);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    eventToDelete: null as any,
  });
  const { currentLanguage } = useLanguage();
  const { businessHours } = useBusinessHours();
  const calendarRef = React.useRef<any>(null);

  const [rescheduling, setRescheduling] = useState(false);

  const handleClickReschedule = async () => {
    console.log('Reschedule');
    setRescheduling(true);
    const rescheduledEvents = await reschedule();
    console.log('Rescheduled events:', rescheduledEvents);
    setRescheduling(false);
    // add rescheduled events to the calendar
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      rescheduledEvents.forEach((event: any) => {
        calendarApi.addEvent({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          allDay: event.all_day && event?.all_day === 'true',
          backgroundColor: event.done && event.done === 'true' ? '#e9ecef' : '#228be6',
          borderColor: event.done && event.done === 'true' ? '#dee2e6' : '#1c7ed6',
          extendedProps: { done: event.done && event.done === 'true' },
        });
      });
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const events = (await getEvents()) as DatabaseEvent[];
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        calendarApi.removeAllEvents();
        events.forEach((event) => {
          calendarApi.addEvent({
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
            allDay: event.all_day && event?.all_day === 'true',
            backgroundColor: event.done && event.done === 'true' ? '#e9ecef' : '#228be6',
            borderColor: event.done && event.done === 'true' ? '#dee2e6' : '#1c7ed6',
            extendedProps: { done: event.done && event.done === 'true' },
          });
        });
      }
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  }

  async function handleDateSelect(selectInfo: any) {
    const title = 'New Event';
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const newEvent = {
        // id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      try {
        await addEvent(newEvent);
        calendarApi.addEvent(newEvent);
      } catch (error) {
        console.error('Failed to add event:', error);
      }
    }
  }

  async function handleDeleteConfirm() {
    const event = deleteModal.eventToDelete;
    if (event) {
      try {
        await deleteEvent(event.id);
        event.remove();
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    }
    setDeleteModal({ isOpen: false, eventToDelete: null });
  }

  function handleDeleteCancel() {
    setDeleteModal({ isOpen: false, eventToDelete: null });
  }

  function handleEvents(events: any[]) {
    setCurrentEvents(events);
  }

  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <div className={styles.calendarContainer}>
          <Button onClick={handleClickReschedule} disabled={rescheduling}>
            Reschedule
          </Button>
          <FullCalendar
            ref={calendarRef}
            locales={[deLocale, enLocale]}
            locale={currentLanguage.code}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridWeek',
            }}
            slotMinTime="06:00:00"
            slotMaxTime="19:00:00"
            businessHours={{
              daysOfWeek: businessHours.workDays,
              startTime: businessHours.startTime,
              endTime: businessHours.endTime,
            }}
            nowIndicator
            initialView="timeGridWeek"
            editable
            selectable
            selectMirror
            dayMaxEvents
            weekends={false}
            select={handleDateSelect}
            eventContent={(e) => renderEventContent(e, setDeleteModal)}
            eventClick={undefined} // remove event click handler
            eventsSet={handleEvents}
          />
        </div>
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          eventTitle={deleteModal.eventToDelete?.title || ''}
        />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo: any, setDeleteModal: any) {
  const isDone = eventInfo.event.extendedProps.done as boolean;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1px',
        height: '100%',
        padding: '0px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1px',
        }}
      >
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: isDone ? 'var(--mantine-color-gray-6)' : 'inherit',
          }}
        >
          {eventInfo.timeText}
        </span>
        <div style={{ display: 'flex', gap: '2px' }}>
          <ActionIcon
            size="xs"
            color={isDone ? 'gray' : 'blue'}
            variant="subtle"
            onClick={async (e) => {
              e.stopPropagation();
              const newDoneStatus = !isDone;
              eventInfo.event.setExtendedProp('done', newDoneStatus);
              eventInfo.event.setProp('backgroundColor', newDoneStatus ? '#e9ecef' : '#228be6');
              eventInfo.event.setProp('borderColor', newDoneStatus ? '#dee2e6' : '#1c7ed6');
              try {
                await updateEventDoneStatus(eventInfo.event.id, newDoneStatus);
              } catch (error) {
                console.error('Failed to update event done status:', error);
              }
            }}
          >
            <IconCheck size={12} />
          </ActionIcon>
          <ActionIcon
            size="xs"
            color="red"
            variant="subtle"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteModal({
                isOpen: true,
                eventToDelete: eventInfo.event,
              });
            }}
          >
            <IconTrash size={12} />
          </ActionIcon>
        </div>
      </div>
      <div
        style={{
          fontSize: '0.75rem',
          fontWeight: 400,
          color: isDone ? 'var(--mantine-color-gray-6)' : 'inherit',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {eventInfo.event.title}
      </div>
    </div>
  );
}
