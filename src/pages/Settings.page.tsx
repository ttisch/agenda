import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { PlannerThemeSelector } from '@/components/ColorSchemeToggle/PlannerThemeSelector';
import { BusinessHoursSelector } from '../components/BusinessHoursSelector/BusinessHoursSelector';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { LanguageSelector } from '../components/LanguageSelector/LanguageSelector';

export function SettingsPage() {
  const navigate = useNavigate();

  return (
    <Container size="xl" p="md" pb="xl">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--mantine-spacing-xl)',
        }}
      >
        <Title order={1}>Settings</Title>
        <Button component={Link} to="/" variant="filled">
          Back to Home
        </Button>
      </div>
      <Stack gap="lg" h="calc(100vh - 180px)" style={{ overflowY: 'auto' }}>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card withBorder shadow="sm" padding="md">
              <Stack gap="md">
                <div>
                  <Text size="sm" fw={500} mb={8}>
                    Locale
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
                <div>
                  <Text size="sm" fw={500} mb={8}>
                    Business Hours
                  </Text>
                  <BusinessHoursSelector />
                </div>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
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
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card withBorder shadow="sm" padding="md">
              <Stack gap="md">
                <Title order={4}>Reset Application</Title>
                <Text size="sm" c="dimmed">
                  Clear all settings and return to the startup wizard. This will reset your
                  preferences but won't delete your events.
                </Text>
                <Group>
                  <Button
                    variant="light"
                    color="red"
                    onClick={() => {
                      localStorage.clear();
                      navigate('/startup');
                    }}
                  >
                    Reset Settings
                  </Button>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}
