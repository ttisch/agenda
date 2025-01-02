import '@mantine/core/styles.css';

import { useState } from 'react';
import { IconAdjustments, IconRouteScan } from '@tabler/icons-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ActionIcon, AppShell, Container, MantineProvider, Text } from '@mantine/core';
import { BusinessHoursProvider } from './contexts/BusinessHoursContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { theme } from './theme';

export default function App() {
  const navigate = useNavigate();
  const [rescheduling, setRescheduling] = useState(false);

  const handleClickReschedule = () => {
    console.log('Reschedule');
    setRescheduling(true);
    setTimeout(() => {
      setRescheduling(false);
    }, 2000);
  };

  return (
    <LanguageProvider>
      <BusinessHoursProvider>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <AppShell header={{ height: 30 }}>
            <AppShell.Header>
              <Container>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Text
                    variant="gradient"
                    component="span"
                    gradient={{ from: 'pink', to: 'yellow' }}
                  >
                    Agenda
                  </Text>
                  <ActionIcon variant="filled" size="sm" onClick={handleClickReschedule}>
                    <IconRouteScan style={{ width: '70%', height: '70%' }} stroke={1.5} />
                  </ActionIcon>
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
              <Container>{!rescheduling ? <Outlet /> : <Text>Rescheduling ...</Text>}</Container>
            </AppShell.Main>
          </AppShell>
        </MantineProvider>
      </BusinessHoursProvider>
    </LanguageProvider>
  );
}
