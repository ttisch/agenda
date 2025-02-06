import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Image, Progress } from '@mantine/core';
import { addDemoEventsIfNeeded, completeInitialStartup } from '@/services/startup';
import StepTransition from './StepTransition';

export default function StepLoader({ agendaImg: agendaImg }: { agendaImg: string }) {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          addDemoEventsIfNeeded().then(() => {
            completeInitialStartup();
            navigate('/');
          });
          return 100;
        }
        return prev + 2;
      });
    }, 30); // 30ms * 50 steps = 1500ms (1.5 seconds)

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
