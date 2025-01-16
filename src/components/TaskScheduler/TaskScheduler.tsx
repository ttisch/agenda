import React, { useEffect, useState } from 'react';
import deLocale from '@fullcalendar/core/locales/de';
import enLocale from '@fullcalendar/core/locales/en-gb';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { IconCheck, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Button, Group, Modal, Text, TextInput } from '@mantine/core';
import { useBusinessHours } from '../../contexts/BusinessHoursContext';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  addEvent,
  deleteEvent,
  getEvents,
  updateEvent,
  updateEventDoneStatus,
} from '../../services/database';
import styles from './TaskScheduler.module.css';

interface DatabaseEvent {
  id?: number;
  title: string;
  start: string;
  end?: string;
  all_day?: boolean | string;
  done?: boolean | string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eventTitle?: string;
}

interface EventModalProps extends Omit<ModalProps, 'onConfirm'> {
  onConfirm: (title: string) => void;
  defaultTitle?: string;
  startTime: string;
  endTime: string;
  mode: 'create' | 'edit';
}

function EventModal({
  isOpen,
  onClose,
  onConfirm,
  startTime,
  endTime,
  defaultTitle = '',
  mode,
}: EventModalProps) {
  const [title, setTitle] = useState(defaultTitle);

  useEffect(() => {
    if (isOpen) {
      setTitle(defaultTitle);
    }
  }, [isOpen, defaultTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onConfirm(title.trim());
      onClose();
    }
  };

  const formattedStart = new Date(startTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedEnd = new Date(endTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedDate = new Date(startTime).toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Create New Event' : 'Edit Event'}
      centered
      size="sm"
    >
      <form onSubmit={handleSubmit}>
        <Text size="sm" mb="xs" c="dimmed">
          {formattedDate}
        </Text>
        <Text size="sm" mb="md" c="dimmed">
          {formattedStart} - {formattedEnd}
        </Text>
        <TextInput
          data-autofocus
          label="Event Title"
          placeholder="Enter event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb="md"
        />
        <Group justify="flex-end" mt="md">
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!title.trim()}>
            {mode === 'create' ? 'Create' : 'Save'}
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, eventTitle = '' }: ModalProps) {
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
  const [eventModal, setEventModal] = useState({
    isOpen: false,
    selectInfo: null as any,
    mode: 'create' as 'create' | 'edit',
    eventToEdit: null as any,
  });
  const { currentLanguage } = useLanguage();
  const { businessHours } = useBusinessHours();
  const calendarRef = React.useRef<any>(null);

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
            backgroundColor: event.done && event.done === 'true' ? '#d0edda' : '#75d195',
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
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    setEventModal({ isOpen: true, selectInfo, mode: 'create', eventToEdit: null });
  }

  async function handleEventModalConfirm(title: string) {
    if (eventModal.mode === 'create' && eventModal.selectInfo) {
      const newEvent = {
        title,
        start: eventModal.selectInfo.startStr,
        end: eventModal.selectInfo.endStr,
        allDay: eventModal.selectInfo.allDay,
      };

      try {
        const newlyAddedEvent = await addEvent(newEvent);
        eventModal.selectInfo.view.calendar.addEvent({ ...newEvent, id: newlyAddedEvent.id });
      } catch (error) {
        console.error('Failed to add event:', error);
      }
    } else if (eventModal.mode === 'edit' && eventModal.eventToEdit) {
      const event = eventModal.eventToEdit;
      try {
        await updateEvent(event.id, {
          title,
          start: event.startStr,
          end: event.endStr,
          allDay: event.allDay,
          done: event.extendedProps.done,
        });
        event.setProp('title', title);
      } catch (error) {
        console.error('Failed to update event:', error);
      }
    }
    setEventModal({ isOpen: false, selectInfo: null, mode: 'create', eventToEdit: null });
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
            allDaySlot={false}
            initialView="timeGridWeek"
            editable
            selectable
            selectMirror
            dayMaxEvents
            weekends={false}
            select={handleDateSelect}
            eventContent={(e) => renderEventContent(e, setDeleteModal)}
            eventClick={(clickInfo) => {
              setEventModal({
                isOpen: true,
                selectInfo: null,
                mode: 'edit',
                eventToEdit: clickInfo.event,
              });
            }}
            eventDrop={async (dropInfo) => {
              try {
                await updateEvent(dropInfo.event.id, {
                  title: dropInfo.event.title,
                  start: dropInfo.event.startStr,
                  end: dropInfo.event.endStr,
                  allDay: dropInfo.event.allDay,
                  done: dropInfo.event.extendedProps.done,
                });
              } catch (error) {
                console.error('Failed to update event after drag:', error);
                dropInfo.revert();
              }
            }}
            eventResize={async (resizeInfo) => {
              try {
                await updateEvent(resizeInfo.event.id, {
                  title: resizeInfo.event.title,
                  start: resizeInfo.event.startStr,
                  end: resizeInfo.event.endStr,
                  allDay: resizeInfo.event.allDay,
                  done: resizeInfo.event.extendedProps.done,
                });
              } catch (error) {
                console.error('Failed to update event after resize:', error);
                resizeInfo.revert();
              }
            }}
            eventsSet={handleEvents}
            rerenderDelay={0}
            scrollTimeReset={false}
          />
        </div>
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          eventTitle={deleteModal.eventToDelete?.title || ''}
        />
        <EventModal
          isOpen={eventModal.isOpen}
          onClose={() =>
            setEventModal({ isOpen: false, selectInfo: null, mode: 'create', eventToEdit: null })
          }
          onConfirm={handleEventModalConfirm}
          startTime={eventModal.selectInfo?.startStr || eventModal.eventToEdit?.startStr || ''}
          endTime={eventModal.selectInfo?.endStr || eventModal.eventToEdit?.endStr || ''}
          defaultTitle={eventModal.eventToEdit?.title || ''}
          mode={eventModal.mode}
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
            color={isDone ? 'gray' : 'green'}
            variant="outline"
            onClick={async (e) => {
              e.stopPropagation();

              const event = eventInfo.event;
              const newDoneStatus = !isDone;

              try {
                await updateEventDoneStatus(event.id, newDoneStatus);
                event.setExtendedProp('done', newDoneStatus);
                event.setProp('backgroundColor', newDoneStatus ? '#d0edda' : '#75d195');
                event.setProp('borderColor', newDoneStatus ? '#dee2e6' : '#1c7ed6');
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
