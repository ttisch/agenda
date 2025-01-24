import { IconCheck } from '@tabler/icons-react';
import { Badge, Button, Card, Container, Grid, Group, Image, Text } from '@mantine/core';
import { usePlannerTheme } from '../../contexts/PlannerThemeContext';

export function PlannerThemeSelector({ onThemeSelected }: { onThemeSelected: () => void }) {
  const { currentPlannerTheme, setPlannerTheme, availablePlannerThemes } = usePlannerTheme();

  const _onThemeSelected = (plannerTheme: any) => {
    console.log('Theme selected', plannerTheme);
    setPlannerTheme(plannerTheme);
    onThemeSelected && onThemeSelected();
  };

  return (
    <>
      {/* <Container> */}
      <Grid>
        {availablePlannerThemes.map((plannerTheme) => (
          <Grid.Col span={3}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ cursor: 'pointer', height: '270px' }}
              onClick={() => _onThemeSelected(plannerTheme)}
            >
              <Card.Section>
                <Image src={plannerTheme.thumbnail} height={160} alt="Chilling Green" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>
                  {plannerTheme.name}&nbsp;
                  {/* {currentPlannerTheme.code === plannerTheme.code && <IconCheck />} */}
                </Text>
                {/* <Badge color="pink">On Sale</Badge> */}
              </Group>

              <Text size="sm" c="dimmed">
                {plannerTheme.description}
              </Text>

              {/* <Button
                size="xs"
                color={plannerTheme.primaryColor}
                fullWidth
                mt="md"
                radius="md"
                onClick={() => }
              >
                Select
              </Button> */}
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      {/* </Container> */}
    </>
  );
}
