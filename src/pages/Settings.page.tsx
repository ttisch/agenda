import { useNavigate } from 'react-router-dom';
import { Button, Stack, Text, Title } from '@mantine/core';
import { LanguageSelector } from '../components/LanguageSelector/LanguageSelector';

export function SettingsPage() {
  const navigate = useNavigate();

  return (
    <Stack gap="md">
      <Title order={3}>Settings</Title>

      <div>
        <Text size="sm" fw={500} mb={8}>
          Language
        </Text>
        <LanguageSelector />
      </div>

      <Button variant="filled" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </Stack>
  );
}
