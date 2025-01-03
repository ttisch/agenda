import { reschedule } from '../../services/events';

let eventGuid = 0;

// Schedule daily rescheduling at midnight
export function scheduleDailyReschedule() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const timeUntilMidnight = tomorrow.getTime() - now.getTime();

  // Schedule first run at next midnight
  setTimeout(() => {
    reschedule();
    // Then schedule it to run every 24 hours
    setInterval(reschedule, 24 * 60 * 60 * 1000);
  }, timeUntilMidnight);
}

export function createEventId() {
  return String(eventGuid++);
}
