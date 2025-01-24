import { useWizard, Wizard } from 'react-use-wizard';
import Step0 from '@/components/Startup/Step0';
import Step1 from '@/components/Startup/Step1';
import Step2 from '@/components/Startup/Step2';
import agendaImg from '../assets/Agenda.svg';

export function StartupPage() {
  return (
    // <div className="w-screen flex items-center justify-center pt-48">
    agendaImg ? (
      <Wizard>
        <Step0 agendaImg={agendaImg} />
        <Step1 />
        <Step2 />
      </Wizard>
    ) : (
      <></>
    )
  );
}
