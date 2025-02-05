import { useWizard } from 'react-use-wizard';
import { Button, Container, Divider } from '@mantine/core';
import FancyTextReveal from '@/components/FancyTextReveal/FancyTextReveal';
import StepTransition from './StepTransition';

export default function Step1() {
  const { nextStep } = useWizard();

  return (
    <>
      <StepTransition>
        <Container>
          <FancyTextReveal />
          <Divider my="md" />
          <Button size="lg" onClick={nextStep}>
            Let's Go
          </Button>
        </Container>
      </StepTransition>
    </>
  );
}
