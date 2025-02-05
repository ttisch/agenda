import '@mantine/core/styles.css';

import { useEffect, useState } from 'react';
import { listen } from '@tauri-apps/api/event';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppShell, Container, MantineProvider, Text } from '@mantine/core';
import * as pkg from '../package.json';
import { BusinessHoursProvider } from './contexts/BusinessHoursContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { PlannerThemeProvider, usePlannerTheme } from './contexts/PlannerThemeContext';
import { reschedule } from './services/events';
import { theme } from './theme';

import './styles.css';

const AppContent = () => {
  const navigate = useNavigate();
  const { currentPlannerTheme } = usePlannerTheme();

  useEffect(() => {
    // listen for Tauri events
    const unlisten = listen('navigate', (e: { payload: string }) => {
      console.log('An event occurred: ', e);
      navigate(e.payload);
    });

    return () => {
      if (unlisten === undefined) {
        return;
      }
      unlisten.catch(console.error);
    };
  }, []);

  return (
    <AppShell>
      {/* <AppShell.Header>
        <Container>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
              Agenda
            </Text>
            <ActionIcon
              bg={currentPlannerTheme.primaryColor}
              variant="filled"
              size="sm"
              aria-label="Settings"
              onClick={() => navigate('/settings')}
            >
              <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </div>
        </Container>
      </AppShell.Header> */}
      <AppShell.Main className={currentPlannerTheme.code}>
        <Container>
          <Outlet />
        </Container>
      </AppShell.Main>
      <AppShell.Footer>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text size="xs" c="gray">
              © {new Date().getFullYear()} MIT License - ts
            </Text>
            <Link to="/changelog" style={{ textDecoration: 'none' }}>
              <Text size="xs" c="gray" style={{ cursor: 'pointer' }}>
                v{pkg.version}
              </Text>
            </Link>
          </div>
        </Container>
      </AppShell.Footer>
    </AppShell>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      await reschedule();
      setLoading(false);
    };
    initializeApp();
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <LanguageProvider>
        <PlannerThemeProvider>
          <BusinessHoursProvider>
            <AppContent />
          </BusinessHoursProvider>
        </PlannerThemeProvider>
      </LanguageProvider>
    </MantineProvider>
  );
}
