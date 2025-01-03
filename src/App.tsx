import '@mantine/core/styles.css';

import { useState } from 'react';
import { IconAdjustments } from '@tabler/icons-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ActionIcon, AppShell, Container, MantineProvider, Text } from '@mantine/core';
import { scheduleDailyReschedule } from './components/TaskScheduler/event-utils';
import { BusinessHoursProvider } from './contexts/BusinessHoursContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { reschedule } from './services/events';
import { theme } from './theme';

export default function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const _ = async () => {
    // reschedule events on app start and daily at midnight
    await scheduleDailyReschedule();
    await reschedule();
    setLoading(false);
  };
  _();

  if (loading) {
    return <></>;
  }
  return (
    <LanguageProvider>
      <BusinessHoursProvider>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <AppShell header={{ height: 30 }}>
            <AppShell.Header>
              <Container>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    variant="gradient"
                    component="span"
                    gradient={{ from: 'pink', to: 'yellow' }}
                  >
                    Agenda
                  </Text>
                  <ActionIcon
                    variant="filled"
                    size="sm"
                    aria-label="Settings"
                    onClick={() => {
                      navigate('/settings');
                    }}
                  >
                    <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
                  </ActionIcon>
                </div>
              </Container>
            </AppShell.Header>
            <AppShell.Main>
              <Container>
                <Outlet />
              </Container>
            </AppShell.Main>
          </AppShell>
        </MantineProvider>
      </BusinessHoursProvider>
    </LanguageProvider>
  );
}
