import '@mantine/core/styles.css';

import { AppShell, MantineProvider, Text } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AppShell>
        {/* <AppShell.Header>
          <Text variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
            Planner
          </Text>
        </AppShell.Header> */}
        <AppShell.Main>
          <Router />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
