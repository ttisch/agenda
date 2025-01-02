import { getBusinessHours, getEventsAfter, getUndoneEventsBefore } from './database';

export async function reschedule() {
  // Get undone events before now
  const undoneEvents = (await getUndoneEventsBefore(new Date().toISOString())) as any[];
  console.log('undoneEvents', undoneEvents);

  // Get future events
  const futureEvents = (await getEventsAfter(new Date().toISOString())) as any[];
  console.log('futureEvents', futureEvents);

  // Get business hours
  const businessHours = await getBusinessHours();
  console.log('businessHours', businessHours);

  // Reschedule undone events to next free time slots
  const rescheduledEvents = rescheduleEvents(undoneEvents, futureEvents, businessHours);
  console.log('rescheduledEvents', rescheduledEvents);

  return rescheduledEvents;
}

function rescheduleEvents(undoneEvents: any[], futureEvents: any[], businessHours: any) {
  const rescheduledEvents = [];

  // Sort undone events by original start time to maintain relative priority
  const sortedUndoneEvents = [...undoneEvents].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  for (const event of sortedUndoneEvents) {
    const newSlot = getNextFreeTimeSlot(event, businessHours, [
      ...futureEvents,
      ...rescheduledEvents,
    ]);

    const rescheduledEvent = {
      ...event,
      start: newSlot.start,
      end: newSlot.end,
    };

    rescheduledEvents.push(rescheduledEvent);
  }

  return rescheduledEvents;
}

function getNextFreeTimeSlot(event: any, businessHours: any, futureEvents: any) {
  const duration = event.end
    ? new Date(event.end).getTime() - new Date(event.start).getTime()
    : 30 * 60 * 1000; // default 30 minutes

  const candidateDate = new Date();
  candidateDate.setMinutes(0, 0, 0); // Round to nearest hour

  while (true) {
    // Check if within business hours
    const hours = candidateDate.getHours();
    const minutes = candidateDate.getMinutes();
    const day = candidateDate.getDay();
    const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    const isWorkDay = businessHours.workDays.includes(day);
    const isWithinHours =
      currentTime >= businessHours.startTime && currentTime < businessHours.endTime;

    if (!isWorkDay) {
      // Move to next day at start time
      candidateDate.setDate(candidateDate.getDate() + 1);
      const [startHour, startMinute] = businessHours.startTime.split(':');
      candidateDate.setHours(parseInt(startHour, 10), parseInt(startMinute, 10), 0, 0);
      continue;
    }

    if (!isWithinHours) {
      if (currentTime < businessHours.startTime) {
        // Move to start time of same day
        const [startHour, startMinute] = businessHours.startTime.split(':');
        candidateDate.setHours(parseInt(startHour, 10), parseInt(startMinute, 10), 0, 0);
      } else {
        // Move to next day at start time
        candidateDate.setDate(candidateDate.getDate() + 1);
        const [startHour, startMinute] = businessHours.startTime.split(':');
        candidateDate.setHours(parseInt(startHour, 10), parseInt(startMinute, 10), 0, 0);
      }
      continue;
    }

    // Check if slot conflicts with any future event
    const candidateEnd = new Date(candidateDate.getTime() + duration);
    const hasConflict = futureEvents.some((futureEvent: any) => {
      const futureStart = new Date(futureEvent.start);
      const futureEnd = new Date(futureEvent.end || futureStart.getTime() + duration);
      return (
        (candidateDate >= futureStart && candidateDate < futureEnd) ||
        (candidateEnd > futureStart && candidateEnd <= futureEnd) ||
        (candidateDate <= futureStart && candidateEnd >= futureEnd)
      );
    });

    if (!hasConflict) {
      return {
        start: candidateDate.toISOString(),
        end: candidateEnd.toISOString(),
      };
    }

    // Move to next slot (30 min increments)
    candidateDate.setMinutes(candidateDate.getMinutes() + 30);
  }
}
