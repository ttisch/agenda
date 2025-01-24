import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizard } from 'react-use-wizard';
import { Container, Image, Progress } from '@mantine/core';

export default function StepLoader({ agendaImg: agendaImg }: { agendaImg: string }) {
  const [progress, setProgress] = useState(0);
  const { handleStep, previousStep, nextStep } = useWizard();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // nextStep();
          navigate('/');
          return 100;
        }
        return prev + 2;
      });
    }, 60); // 60ms * 50 steps = 3000ms (3 seconds)

    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image src={agendaImg} alt="Agenda" style={{ width: '500px' }} />
      </Container>
      <Container>
        <Progress value={progress} />
      </Container>
    </>
  );
}
