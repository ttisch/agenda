import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Image, Progress } from '@mantine/core';
import { completeInitialStartup } from '@/services/startup';
import StepTransition from './StepTransition';

export default function StepLoader({ agendaImg: agendaImg }: { agendaImg: string }) {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          completeInitialStartup();
          navigate('/');
          return 100;
        }
        return prev + 2;
      });
    }, 60); // 60ms * 50 steps = 3000ms (3 seconds)

    return () => clearInterval(timer);
  }, []);
  return (
    <StepTransition>
      <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image src={agendaImg} alt="Agenda" style={{ width: '500px' }} />
      </Container>
      <Container>
        <Progress value={progress} />
      </Container>
    </StepTransition>
  );
}
