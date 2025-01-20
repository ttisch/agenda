import { IconCheck } from '@tabler/icons-react';
import { Badge, Button, Card, Container, Grid, Group, Image, Text } from '@mantine/core';
import { usePlannerTheme } from '../../contexts/PlannerThemeContext';

export function PlannerThemeSelector() {
  const { currentPlannerTheme, setPlannerTheme, availablePlannerThemes } = usePlannerTheme();

  return (
    <>
      <Container>
        <Grid>
          {availablePlannerThemes.map((plannerTheme) => (
            <Grid.Col span={3}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image src={plannerTheme.thumbnail} height={160} alt="Chilling Green" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>
                    {plannerTheme.name}&nbsp;
                    {currentPlannerTheme.code === plannerTheme.code && <IconCheck />}
                  </Text>
                  {/* <Badge color="pink">On Sale</Badge> */}
                </Group>

                <Text size="sm" c="dimmed">
                  {plannerTheme.description}
                </Text>

                <Button
                  size="xs"
                  color={plannerTheme.primaryColor}
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() => setPlannerTheme(plannerTheme)}
                >
                  Select
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
}
