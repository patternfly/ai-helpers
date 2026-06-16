// packages/react-core/src/components/Wizard/Wizard.tsx
import { ReactNode, useState } from 'react';
import { WizardStep } from './WizardStep';
import { WizardNav } from './WizardNav';
import { WizardFooter } from './WizardFooter';

export interface WizardProps {
  steps: { name: string; component: ReactNode }[];
  onSave: () => void;
  onClose: () => void;
  className?: string;
}

export const Wizard = ({
  steps,
  onSave,
  onClose,
  className,
  ...props
}: WizardProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onSave();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => Math.max(0, prev - 1));

  return (
    <div className={`pf-v6-c-wizard ${className || ''}`} {...props}>
      <WizardNav
        steps={steps.map((s) => s.name)}
        activeStep={activeStep}
        onStepClick={setActiveStep}
      />
      <WizardStep>{steps[activeStep].component}</WizardStep>
      <WizardFooter
        onNext={handleNext}
        onBack={handleBack}
        onClose={onClose}
        isBackDisabled={activeStep === 0}
        nextLabel={isLastStep ? 'Save' : 'Next'}
      />
    </div>
  );
};
