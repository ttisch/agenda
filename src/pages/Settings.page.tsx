import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { PlannerThemeSelector } from '@/components/ColorSchemeToggle/PlannerThemeSelector';
import { BusinessHoursSelector } from '../components/BusinessHoursSelector/BusinessHoursSelector';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { LanguageSelector } from '../components/LanguageSelector/LanguageSelector';

export function SettingsPage() {
  const navigate = useNavigate();

  return (
    <Container size="xl" p="md" pb="xl">
      <Stack gap="lg">
        <Title order={2}>Settings</Title>

        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card withBorder shadow="sm" padding="md">
              <Stack gap="md">
                <Title order={4}>Language & Theme</Title>
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
                  <PlannerThemeSelector onThemeSelected={() => {}} />
                </div>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card withBorder shadow="sm" padding="md">
              <Stack gap="md">
                <Title order={4}>Schedule Settings</Title>
                <div>
                  <Text size="sm" fw={500} mb={8}>
                    Business Hours
                  </Text>
                  <BusinessHoursSelector />
                </div>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        <Card withBorder shadow="sm" padding="md">
          <Stack gap="md">
            <Title order={4}>Navigation</Title>
            <Group wrap="wrap" gap="xs">
              <Button variant="light" onClick={() => navigate('/demo')}>
                Demo
              </Button>
              <Button variant="light" onClick={() => navigate('/startup')}>
                Startup
              </Button>
              <Button variant="light" onClick={() => navigate('/changelog')}>
                Changelog
              </Button>
            </Group>
          </Stack>
        </Card>

        <Group justify="flex-end" wrap="wrap" gap="xs">
          <Button variant="filled" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
