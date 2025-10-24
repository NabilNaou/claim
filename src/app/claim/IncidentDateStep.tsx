"use client";

import type { FormEvent } from "react";
import { useId, useRef, useState } from "react";

import styles from "@/app/claim/[step]/page.module.css";
import WizardActions from "@/app/claim/WizardActions";
import type { ClaimDraft } from "@/lib/claimTypes";

type IncidentStepProps = {
  draft: Pick<ClaimDraft, "incidentDate">;
  update: (data: Partial<ClaimDraft>) => void;
  onNext: () => void;
  onBack: () => void;
};

/**
 * Returns todays date in local ISO format.
 * @returns {string}
 */
function getTodayIsoLocal(): string {
  const d = new Date();
  // Timezone offset for the correct local date calculation.
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

/**
 * Validates the incident date.
 * @param {string} value - The date string from the input.
 * @param {string} today - Todays date string for comparison. Date shouldnt be in the future.
 * @returns
 */
function validateIncidentDate(value: string, today: string) {
  const isEmpty = !value;
  const isFuture = value > today;
  const hasError = isEmpty || isFuture;
  let message: string | undefined;

  if (isEmpty) {
    message = "Vul een datum in.";
  } else if (isFuture) {
    message = "Datum mag niet in de toekomst liggen.";
  }

  return { isEmpty, isFuture, hasError, message };
}

export default function IncidentDateStep({
  draft,
  update,
  onNext,
  onBack,
}: IncidentStepProps) {
  const [showError, setShowError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = useId();

  const ids = {
    input: `${uid}-incident-date`,
    help: `${uid}-date-help`,
    error: `${uid}-date-error`,
  };

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
