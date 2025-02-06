import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Paper, Portal, Stack } from '@mantine/core';
import { useTour } from '@/contexts/TourContext';

interface TourStep {
  element: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    element: '[data-tour="task-scheduler"]',
    title: 'Task Scheduler',
    description: 'Plan and organize your tasks efficiently with our intuitive scheduler.',
    position: 'bottom',
  },
  {
    element: '[data-tour="business-hours"]',
    title: 'Business Hours',
    description: 'Set your working hours to better manage your schedule.',
    position: 'left',
  },
  {
    element: '[data-tour="theme-selector"]',
    title: 'Theme Customization',
    description: 'Personalize your experience by choosing your preferred theme.',
    position: 'right',
  },
  {
    element: '[data-tour="language-selector"]',
    title: 'Language Settings',
    description: 'Choose your preferred language for the interface.',
    position: 'top',
  },
];

export default function TourGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const { isActive, endTour } = useTour();
  const navigate = useNavigate();

  useEffect(() => {
    if (isActive) {
      setCurrentStep(0);
      navigate('/'); // Start tour on home page
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && currentStep > 0) {
      navigate('/settings'); // Other components are on settings page
    }
  }, [currentStep, isActive]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      endTour();
    }
  };

  const handleSkip = () => {
    endTour();
  };

  const [element, setElement] = useState<HTMLElement | null>(null);
  const currentTourStep = tourSteps[currentStep];

  useEffect(() => {
    if (!isActive) {
      setElement(null);
      return;
    }

    // Add a small delay to ensure the page has loaded
    const timer = setTimeout(() => {
      const el = document.querySelector(currentTourStep.element) as HTMLElement;
      setElement(el);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentStep, currentTourStep.element, isActive]);

  if (!isActive || !element) {
    return null;
  }

  const rect = element.getBoundingClientRect();

  // Calculate tooltip position
  const getTooltipPosition = () => {
    const offset = 10; // Gap between element and tooltip
    const tooltipWidth = 200; // Minimum width of tooltip
    const tooltipHeight = 120; // Approximate height of tooltip
    const margin = 20; // Minimum margin from viewport edges

    let top = rect.top;
    let left = rect.left;
    let transform = 'translate(-50%, -50%)';

    switch (currentTourStep.position) {
      case 'top':
        top = Math.max(margin, rect.top - offset - tooltipHeight / 2);
        left = Math.min(
          Math.max(tooltipWidth / 2 + margin, rect.left + rect.width / 2),
          window.innerWidth - tooltipWidth / 2 - margin
        );
        transform = 'translate(-50%, 0)';
        break;
      case 'bottom':
        top = Math.min(window.innerHeight - tooltipHeight - margin, rect.bottom + offset);
        left = Math.min(
          Math.max(tooltipWidth / 2 + margin, rect.left + rect.width / 2),
          window.innerWidth - tooltipWidth / 2 - margin
        );
        transform = 'translate(-50%, 0)';
        break;
      case 'left':
        top = Math.min(
          Math.max(margin + tooltipHeight / 2, rect.top + rect.height / 2),
          window.innerHeight - tooltipHeight / 2 - margin
        );
        left = Math.max(margin + tooltipWidth / 2, rect.left - offset - tooltipWidth / 2);
        transform = 'translate(0, -50%)';
        break;
      case 'right':
        top = Math.min(
          Math.max(margin + tooltipHeight / 2, rect.top + rect.height / 2),
          window.innerHeight - tooltipHeight / 2 - margin
        );
        left = Math.min(
          window.innerWidth - tooltipWidth / 2 - margin,
          rect.right + offset + tooltipWidth / 2
        );
        transform = 'translate(-100%, -50%)';
        break;
    }

    return { top, left, transform };
  };

  const { top, left, transform } = getTooltipPosition();

  return (
    <Portal>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            border: '2px solid var(--mantine-color-blue-6)',
            borderRadius: '4px',
            pointerEvents: 'none',
          }}
        />
        <Paper
          shadow="md"
          p="md"
          style={{
            position: 'absolute',
            top,
            left,
            transform,
            pointerEvents: 'all',
            zIndex: 10000,
            minWidth: '200px',
          }}
        >
          <Stack gap="xs">
            <div style={{ fontWeight: 'bold' }}>{currentTourStep.title}</div>
            <div>{currentTourStep.description}</div>
            <div
              style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}
            >
              <Button variant="subtle" size="xs" onClick={handleSkip}>
                Skip Tour
              </Button>
              <Button size="xs" onClick={handleNext}>
                {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </Stack>
        </Paper>
      </div>
    </Portal>
  );
}
