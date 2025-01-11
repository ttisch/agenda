import { useNavigate } from 'react-router-dom';
import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { BusinessHoursSelector } from '../components/BusinessHoursSelector/BusinessHoursSelector';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { LanguageSelector } from '../components/LanguageSelector/LanguageSelector';

export function SettingsPage() {
  const navigate = useNavigate();

  return (
    <Stack gap="md">
      <Title order={3}>Settings</Title>

      <Stack gap="lg">
        <div>
          <Text size="sm" fw={500} mb={8}>
            Language
          </Text>
          <LanguageSelector />
        </div>

        <div>
          <Text size="sm" fw={500} mb={8}>
            Theme
          </Text>
          <ColorSchemeToggle />
        </div>

        <div>
          <Text size="sm" fw={500} mb={8}>
            Business Hours
          </Text>
          <BusinessHoursSelector />
        </div>
      </Stack>

      <Group>
        <Button
          variant="outline"
          onClick={() => {
            navigate('/demo');
          }}
        >
          Demo
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            navigate('/changelog');
          }}
        >
          Changelog
        </Button>
      </Group>

      <Button variant="filled" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </Stack>
  );
}
