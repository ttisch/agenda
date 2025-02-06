import { ReactNode } from 'react';

interface StepTransitionProps {
  children: ReactNode;
}

export default function StepTransition({ children }: StepTransitionProps) {
  return (
    <div
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        animation: 'stepFadeIn 0.5s ease-out forwards',
      }}
    >
      <style>
        {`
          @keyframes stepFadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      {children}
    </div>
  );
}
