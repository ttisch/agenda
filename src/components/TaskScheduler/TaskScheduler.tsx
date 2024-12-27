import dayjs from 'dayjs';
import { Event, generateTimeSlots, Scheduler, User } from 'mantine-scheduler';
import { Anchor, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function TaskScheduler() {
  // Define a list of users of whom have events
  const users: User[] = [{ id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' }];

  // Define a list of events for the given users
  const events: Event[] = [
    {
      id: 1,
      userId: 1,
      startTime: '9:00 AM',
      endTime: '10:00 AM',
      title: 'Meeting',
      color: 'blue',
    },
    {
      id: 2,
      userId: 1,
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      title: 'Project Work',
      color: 'green',
    },
  ];

  // Generate time slots for the scheduler
  // NOTE: generateTimeSlots is a helper method we provide
  const timeSlots = generateTimeSlots({
    start: '9:00 AM',
    end: '5:30 PM',
    interval: 30,
  });

  return <Scheduler date={dayjs()} timeSlots={timeSlots} events={events} users={users} />;
}
