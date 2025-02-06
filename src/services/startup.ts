import { addEvent, getEvents } from './database';

interface Event {
  id?: number;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  done?: boolean;
}

const INITIAL_STARTUP_KEY = 'planner_initial_startup';

export function isInitialStartup(): boolean {
  return localStorage.getItem(INITIAL_STARTUP_KEY) === null;
}

export function completeInitialStartup(): void {
  localStorage.setItem(INITIAL_STARTUP_KEY, 'completed');
}

export async function addDemoEventsIfNeeded(): Promise<void> {
  const events = (await getEvents()) as Event[];
  console.log('Existing events:', events);
  if (events.length === 0) {
    // Get current date
    const now = new Date();

    // Find the Monday of the current week
    const monday = new Date(now);
    monday.setDate(monday.getDate() - monday.getDay() + 1);

    // Create dates for each weekday
    const weekDays = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      return date;
    });

    // Set reasonable times within business hours (7:00-16:00)
    const demoEvents = [
      {
        title: 'Welcome to Planner! 👋',
        start: (() => {
          const date = weekDays[0]; // Monday
          date.setHours(9, 0, 0, 0);
          return date.toISOString();
        })(),
        end: (() => {
          const date = weekDays[0];
          date.setHours(10, 30, 0, 0);
          return date.toISOString();
        })(),
        allDay: false,
        done: false,
      },
      {
        title: 'Project kickoff meeting',
        start: (() => {
          const date = weekDays[1]; // Tuesday
          date.setHours(10, 0, 0, 0);
          return date.toISOString();
        })(),
        end: (() => {
          const date = weekDays[1];
          date.setHours(11, 0, 0, 0);
          return date.toISOString();
        })(),
        allDay: false,
        done: false,
      },
      {
        title: 'Review Q1 goals',
        start: (() => {
          const date = weekDays[2]; // Wednesday
          date.setHours(11, 0, 0, 0);
          return date.toISOString();
        })(),
        end: (() => {
          const date = weekDays[2];
          date.setHours(12, 0, 0, 0);
          return date.toISOString();
        })(),
        allDay: false,
        done: false,
      },
      {
        title: 'Team sync meeting',
        start: (() => {
          const date = weekDays[3]; // Thursday
          date.setHours(13, 0, 0, 0);
          return date.toISOString();
        })(),
        end: (() => {
          const date = weekDays[3];
          date.setHours(14, 0, 0, 0);
          return date.toISOString();
        })(),
        allDay: false,
        done: false,
      },
      {
        title: 'Client presentation',
        start: (() => {
          const date = weekDays[4]; // Friday
          date.setHours(14, 0, 0, 0);
          return date.toISOString();
        })(),
        end: (() => {
          const date = weekDays[4];
          date.setHours(15, 30, 0, 0);
          return date.toISOString();
        })(),
        allDay: false,
        done: false,
      },
    ];

    for (const event of demoEvents) {
      console.log('Adding event:', event);
      await addEvent(event);
    }
  }
}
