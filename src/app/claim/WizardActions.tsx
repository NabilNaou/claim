"use client";
import styles from "@/app/claim/[step]/page.module.css";

type WizardActionsProps = {
  onBack: () => void;
  onNext?: () => void;
  nextType?: "button" | "submit";
  disableBack?: boolean;
  disableNext?: boolean;
  backLabel?: string;
  nextLabel?: string;
};

export default function WizardActions({
  onBack,
  onNext,
  nextType = "button",
  disableBack,
  disableNext,
  backLabel = "Vorige",
  nextLabel = "Volgende",
}: WizardActionsProps) {
  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={`${styles.button} ${styles.secondary}`}
        onClick={onBack}
        disabled={disableBack}
      >
        {backLabel}
      </button>

      <button
        type={nextType}
        className={styles.button}
        onClick={nextType === "button" ? onNext : undefined}
        disabled={disableNext}
      >
        {nextLabel}
      </button>
    </div>
  );
}
