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
  if (events.length === 0) {
    const today = new Date();
    today.setHours(9, 0, 0, 0); // Start at 9 AM

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0); // Start at 10 AM

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
    dayAfterTomorrow.setHours(11, 0, 0, 0); // Start at 11 AM

    const demoEvents = [
      {
        title: 'Welcome to Planner! 👋',
        start: today.toISOString(),
        end: new Date(today.getTime() + 90 * 60000).toISOString(),
        allDay: false,
        done: false,
      },
      {
        title: 'Project kickoff meeting',
        start: new Date(today.getTime() + 90 * 60000).toISOString(), // 1.5 hours after welcome
        end: new Date(today.getTime() + 150 * 60000).toISOString(), // 1 hour duration
        allDay: false,
        done: false,
      },
      {
        title: 'Review Q1 goals',
        start: tomorrow.toISOString(),
        end: new Date(tomorrow.getTime() + 60 * 60000).toISOString(), // 1 hour duration
        allDay: false,
        done: false,
      },
      {
        title: 'Team sync meeting',
        start: new Date(tomorrow.getTime() + 180 * 60000).toISOString(), // 3 hours after Q1 review
        end: new Date(tomorrow.getTime() + 240 * 60000).toISOString(), // 30 min duration
        allDay: false,
        done: false,
      },
      {
        title: 'Client presentation',
        start: dayAfterTomorrow.toISOString(),
        end: new Date(dayAfterTomorrow.getTime() + 90 * 60000).toISOString(), // 1.5 hours duration
        allDay: false,
        done: false,
      },
    ];

    for (const event of demoEvents) {
      await addEvent(event);
    }
  }
}
