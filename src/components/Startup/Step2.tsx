import { useNavigate } from 'react-router-dom';
import { useWizard } from 'react-use-wizard';
import { Button, Container, Divider, Title } from '@mantine/core';
import FancyTextReveal from '@/components/FancyTextReveal/FancyTextReveal';
import { PlannerThemeSelector } from '../ColorSchemeToggle/PlannerThemeSelector';

export default function Step2() {
  const { handleStep, previousStep, nextStep } = useWizard();
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Title order={3}>Please choose color theme</Title>
        <Divider my="md" />
        <PlannerThemeSelector />
        <Divider my="md" />
        <Button size="lg" onClick={() => navigate('/')}>
          Next
        </Button>
      </Container>
    </>
  );
}
