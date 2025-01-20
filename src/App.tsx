import '@mantine/core/styles.css';

import { useEffect, useState } from 'react';
import { IconAdjustments } from '@tabler/icons-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ActionIcon, AppShell, Container, MantineProvider, Text } from '@mantine/core';
import * as pkg from '../package.json';
import { BusinessHoursProvider } from './contexts/BusinessHoursContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { reschedule } from './services/events';
import { theme } from './theme';

import './styles.css';

export default function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const initializeApp = async () => {
      // reschedule events on app start and daily at midnight
      // await scheduleDailyReschedule();
      await reschedule();
      setLoading(false);
    };
    initializeApp();
  }, []);

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
            <AppShell.Main className="leaves">
              <Container>
                <Outlet />
              </Container>
            </AppShell.Main>
            <AppShell.Footer>
              <Container>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text size="xs" c="gray">
                    © {new Date().getFullYear()} tisch.systems - MIT License
                  </Text>
                  <Text size="xs" c="gray">
                    v{pkg.version}
                  </Text>
                </div>
              </Container>
            </AppShell.Footer>
          </AppShell>
        </MantineProvider>
      </BusinessHoursProvider>
    </LanguageProvider>
  );
}
