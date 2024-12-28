import '@mantine/core/styles.css';

import { AppShell, Container, MantineProvider, Text } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AppShell header={{ height: 25 }}>
        {/* <AppShell.Navbar>Planner</AppShell.Navbar> */}
        <AppShell.Header>
          <Container>
            <Text variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
              Planner
            </Text>
          </Container>
        </AppShell.Header>
        <AppShell.Main>
          <Container>
            <Router />
          </Container>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
