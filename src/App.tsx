import '@mantine/core/styles.css';

import { IconAdjustments } from '@tabler/icons-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ActionIcon, AppShell, Container, MantineProvider, Text } from '@mantine/core';
import { LanguageProvider } from './contexts/LanguageContext';
import { theme } from './theme';

export default function App() {
  const navigate = useNavigate();
  return (
    <LanguageProvider>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <AppShell header={{ height: 40 }}>
          <AppShell.Header>
            <Container>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Text variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
                  Planner
                </Text>
                <ActionIcon
                  variant="filled"
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
    </LanguageProvider>
  );
}
