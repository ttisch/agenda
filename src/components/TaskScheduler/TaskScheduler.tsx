import React, { useEffect, useState } from 'react';
import deLocale from '@fullcalendar/core/locales/de';
import enLocale from '@fullcalendar/core/locales/en-gb';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Button, Group, Modal } from '@mantine/core';
import { useLanguage } from '../../contexts/LanguageContext';
import { addEvent, deleteEvent, getEvents } from '../../services/database';
import { createEventId } from './event-utils';

interface DatabaseEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  all_day?: boolean | string;
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
        id: createEventId(),
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

  function handleEventClick(clickInfo: any) {
    setDeleteModal({
      isOpen: true,
      eventToDelete: clickInfo.event,
    });
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
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5], // Monday - Thursday
            startTime: '07:00', // a start time (10am in this example)
            endTime: '16:00',
          }}
          nowIndicator
          initialView="timeGridWeek"
          editable
          selectable
          selectMirror
          dayMaxEvents
          weekends={false}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
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

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}&nbsp;</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
