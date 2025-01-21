import { useWizard } from 'react-use-wizard';
import { Button, Container, Divider } from '@mantine/core';
import FancyTextReveal from '@/components/FancyTextReveal/FancyTextReveal';

export default function Step1() {
  const { handleStep, previousStep, nextStep } = useWizard();

  return (
    <>
      <Container>
        <FancyTextReveal />
        <Divider my="md" />
        <Button size="lg" onClick={nextStep}>
          Let's Go
        </Button>
      </Container>
    </>
  );
}
