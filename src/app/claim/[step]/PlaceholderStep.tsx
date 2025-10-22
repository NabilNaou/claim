import WizardActions from "@/app/claim/WizardActions";

interface PlaceholderStepProps {
  step: number;
  onNext: () => void;
  onBack: () => void;
}

export default function PlaceholderStep({
  step,
  onNext,
  onBack,
}: PlaceholderStepProps) {
  return (
    <>
      <p>Klik door om te testen.</p>
      <WizardActions
        onBack={onBack}
        onNext={onNext}
        disableBack={step <= 1}
        disableNext={step >= 5}
      />
    </>
  );
}
