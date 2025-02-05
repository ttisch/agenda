import { useWizard } from 'react-use-wizard';
import { Container, Divider, Space, Title } from '@mantine/core';
import { PlannerThemeSelector } from '../ColorSchemeToggle/PlannerThemeSelector';
import StepTransition from './StepTransition';

export default function Step2() {
  const { nextStep } = useWizard();

  const _onThemeSelected = () => {
    console.log('Theme selected');
    nextStep();
  };

  return (
    <>
      <StepTransition>
        <Container>
          <Space h="xl" />
          <Space h="xl" />
          <Space h="xl" />
          <Space h="xl" />
          <Title order={1}>Please choose color theme</Title>
          <Divider my="md" />
          <PlannerThemeSelector onThemeSelected={_onThemeSelected} />
          {/* <Divider my="md" />
        <Button size="lg" onClick={() => navigate('/')}>
          Next
        </Button> */}
        </Container>
      </StepTransition>
    </>
  );
}
