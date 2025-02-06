import { useWizard } from 'react-use-wizard';
import { Button, Container, Divider } from '@mantine/core';
import FancyTextReveal from '@/components/FancyTextReveal/FancyTextReveal';
import StepTransition from './StepTransition';

export default function Step1() {
  const { nextStep } = useWizard();

  return (
    <>
      <StepTransition>
        <Container
          ta="center"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <FancyTextReveal />
          <Divider my="xl" w="50%" />
          <Button
            size="xl"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            onClick={nextStep}
          >
            Let's Go
          </Button>
        </Container>
      </StepTransition>
    </>
  );
}
