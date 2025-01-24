import { useEffect, useState } from 'react';
import { Container, Image, Progress } from '@mantine/core';

export default function Step0({ agendaImg: agendaImg }: { agendaImg: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
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
