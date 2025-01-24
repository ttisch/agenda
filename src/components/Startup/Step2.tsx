import { useNavigate } from 'react-router-dom';
import { useWizard } from 'react-use-wizard';
import { Button, Container, Divider, Space, Title } from '@mantine/core';
import FancyTextReveal from '@/components/FancyTextReveal/FancyTextReveal';
import { PlannerThemeSelector } from '../ColorSchemeToggle/PlannerThemeSelector';

export default function Step2() {
  const { handleStep, previousStep, nextStep } = useWizard();
  const navigate = useNavigate();

  const _onThemeSelected = () => {
    console.log('Theme selected');
    nextStep();
  };

  return (
    <>
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
    </>
  );
}
