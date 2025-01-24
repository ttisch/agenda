import { useState } from 'react';
import { Wizard } from 'react-use-wizard';
import Step0 from '@/components/Startup/Step0';
import Step1 from '@/components/Startup/Step1';
import Step2 from '@/components/Startup/Step2';
import agendaImg from '../assets/Agenda.svg';

export function StartupPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <img src={agendaImg} onLoad={() => setIsLoaded(true)} style={{ display: 'none' }} alt="" />
      {isLoaded && (
        <Wizard>
          <Step0 agendaImg={agendaImg} />
          <Step1 />
          <Step2 />
        </Wizard>
      )}
    </>
  );
}
