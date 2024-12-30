import { useNavigate } from 'react-router-dom';
import { Button, Stack, Text, Title } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { LanguageSelector } from '../components/LanguageSelector/LanguageSelector';

export function SettingsPage() {
  const navigate = useNavigate();

  return (
    <Stack gap="md">
      <Title order={3}>Settings</Title>

      <Stack gap="md">
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
      </Stack>

      <Button variant="filled" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </Stack>
  );
}
