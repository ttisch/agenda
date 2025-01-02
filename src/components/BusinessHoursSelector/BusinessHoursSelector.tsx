import { Checkbox, Group, Stack } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useBusinessHours } from '../../contexts/BusinessHoursContext';

const WEEKDAYS = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 0, label: 'Sunday' },
];

export function BusinessHoursSelector() {
  const { businessHours, setBusinessHours } = useBusinessHours();

  return (
    <Stack gap="sm">
      <Group>
        <TimeInput
          label="Start Time"
          value={businessHours.startTime}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newTime = event.currentTarget.value;
            setBusinessHours({
              ...businessHours,
              startTime: newTime,
            });
          }}
        />
        <TimeInput
          label="End Time"
          value={businessHours.endTime}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newTime = event.currentTarget.value;
            setBusinessHours({
              ...businessHours,
              endTime: newTime,
            });
          }}
        />
      </Group>
      <Stack gap="xs">
        {WEEKDAYS.map((day) => (
          <Checkbox
            key={day.value}
            label={day.label}
            checked={businessHours.workDays.includes(day.value)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const checked = event.currentTarget.checked;
              setBusinessHours({
                ...businessHours,
                workDays: checked
                  ? [...businessHours.workDays, day.value].sort()
                  : businessHours.workDays.filter((d) => d !== day.value),
              });
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}
