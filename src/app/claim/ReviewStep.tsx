"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import styles from "@/app/claim/[step]/page.module.css";
import WizardActions from "@/app/claim/WizardActions";
import type { ClaimDraft } from "@/lib/claimTypes";
import { useFieldIds } from "@/lib/useFieldIds";
import { formatIbanDisplay } from "@/lib/validator";

type Props = {
  draft: ClaimDraft;
  onBack: () => void;
  onSubmitSuccess: () => void;
};

export default function ReviewStep({ draft, onBack, onSubmitSuccess }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const [agree, setAgree] = useState(false);

  const ids = useFieldIds("terms");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!agree) {
      setAgreeError(true);
      return;
    }
    setSubmitting(true);

    // Simulatie “submit”; hier zou je fetch/POST doen
    setTimeout(() => {
      setSubmitting(false);
      onSubmitSuccess();
    }, 500);
  }

  const items: Array<{ label: string; value: string }> = [
    { label: "Product", value: draft.product ?? "" },
    { label: "Incidentdatum", value: draft.incidentDate || "—" },
    { label: "IBAN", value: draft.iban ? formatIbanDisplay(draft.iban) : "—" },
    { label: "Omschrijving", value: draft.description || "—" },
  ];

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <fieldset className={styles.field}>
        <legend className={`${styles.required} ${styles.headerLine}`}>
          Controleer en verzend
        </legend>

        <div
          className={styles.summary}
          role="table"
          aria-label="Overzicht van je invoer"
        >
          {items.map((row) => (
            <div className={styles.summaryRow} role="row" key={row.label}>
              <div className={styles.summaryKey} role="rowheader">
                {row.label}
              </div>
              <div className={styles.summaryValue} role="cell">
                {row.value}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.checkboxRow}>
          <input
            id={ids.input}
            type="checkbox"
            checked={agree}
            onChange={(e) => {
              setAgree(e.currentTarget.checked);
              setAgreeError(false);
            }}
            aria-describedby={agreeError ? ids.error : ids.help}
            aria-invalid={agreeError}
          />
          <label htmlFor={ids.input}>
            Ik verklaar dat de bovenstaande informatie correct is.
          </label>
        </div>

        <p id={ids.help} className={styles.help}>
          Vink aan om akkoord te gaan en de claim te verzenden.
        </p>

        <div className={styles.error}>
          {agreeError && (
            <p id={ids.error} role="alert">
              Vink het akkoord aan om te kunnen verzenden.
            </p>
          )}
        </div>
      </fieldset>

      <WizardActions
        onBack={onBack}
        nextType="submit"
        nextLabel={submitting ? "Verzenden…" : "Verzend claim"}
        disableNext={submitting}
      />
    </form>
  );
}
