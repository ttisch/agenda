import { Button, Group, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group>
      <Button variant="light" onClick={() => setColorScheme('light')}>
        Light
      </Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button variant="gradient" onClick={() => setColorScheme('auto')}>
        Auto
      </Button>
    </Group>
  );
}
