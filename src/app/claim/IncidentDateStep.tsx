"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";

import styles from "@/app/claim/[step]/page.module.css";
import WizardActions from "@/app/claim/WizardActions";
import type { ClaimDraft } from "@/lib/claimTypes";
import { getTodayIsoLocal } from "@/lib/dates";
import { useFieldIds } from "@/lib/useFieldIds";
import { validateIncidentDate } from "@/lib/validator";

type IncidentStepProps = {
  draft: Pick<ClaimDraft, "incidentDate">;
  update: (data: Partial<ClaimDraft>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function IncidentDateStep({
  draft,
  update,
  onNext,
  onBack,
}: IncidentStepProps) {
  const [showError, setShowError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const ids = useFieldIds("incident-date");
  const today = getTodayIsoLocal();
  const value = draft.incidentDate || "";

  const { hasError, message } = validateIncidentDate(value, today);
  const shouldShowError = showError && hasError;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (hasError) {
      setShowError(true);
      inputRef.current?.focus();
      return;
    }
    onNext();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <fieldset className={styles.field}>
        <legend className={styles.required}>Wanneer is het gebeurd?</legend>

        <label htmlFor={ids.input}>Datum</label>
        <input
          ref={inputRef}
          id={ids.input}
          name="incidentDate"
          type="date"
          className={styles.input}
          required
          max={today}
          value={value}
          onChange={(e) => {
            update({ incidentDate: e.currentTarget.value });
            setShowError(false);
          }}
          aria-invalid={shouldShowError}
          aria-describedby={shouldShowError ? ids.error : ids.help}
          aria-errormessage={shouldShowError ? ids.error : undefined}
        />

        <p id={ids.help} className={styles.help}>
          Kies de datum van het incident. Datum mag niet in de toekomst liggen.
        </p>

        <div className={styles.error}>
          {shouldShowError && (
            <p id={ids.error} role="alert">
              {message}
            </p>
          )}
        </div>
      </fieldset>

      <WizardActions onBack={onBack} nextType="submit" />
    </form>
  );
}
