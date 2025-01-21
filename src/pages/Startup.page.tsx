import { useWizard, Wizard } from 'react-use-wizard';
import Step1 from '@/components/Startup/Step1';
import Step2 from '@/components/Startup/Step2';

export function StartupPage() {
  return (
    // <div className="w-screen flex items-center justify-center pt-48">
    <Wizard>
      <Step1 />
      <Step2 />
    </Wizard>
  );
}
