"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useRef, useState } from "react";

import styles from "@/app/claim/[step]/page.module.css";
import WizardActions from "@/app/claim/WizardActions";
import type { ClaimDraft } from "@/lib/claimTypes";
import { useFieldIds } from "@/lib/useFieldIds";
import { validateDescription } from "@/lib/validator";

type DescriptionProps = {
  draft: Pick<ClaimDraft, "description">;
  update: (data: Partial<ClaimDraft>) => void;
  onNext: () => void;
  onBack: () => void;
};

const MIN = 20;
const MAX = 500;

export default function DescriptionStep({
  draft,
  update,
  onNext,
  onBack,
}: DescriptionProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showError, setShowError] = useState(false);
  const ids = useFieldIds("desc");

  const value = draft.description;
  const { normalized, normalizedLength, tooShort, tooLong, hasError, message } =
    validateDescription(value, MIN, MAX);
  const shouldShowError = showError && hasError;

  function handleChange(error: ChangeEvent<HTMLTextAreaElement>) {
    if (showError) setShowError(false);
    update({ description: error.currentTarget.value });
  }

  function handleSubmit(error: FormEvent) {
    error.preventDefault();
    if (hasError) {
      setShowError(true);
      textareaRef.current?.focus();
      return;
    }
    update({ description: normalized });
    onNext();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <fieldset className={styles.field}>
        <legend className={styles.required}>Wat is er gebeurd?</legend>

        <label htmlFor={ids.input}>Omschrijving</label>
        <textarea
          ref={textareaRef}
          id={ids.input}
          name="description"
          className={`${styles.input} ${styles.textarea}`}
          rows={6}
          value={value}
          onChange={handleChange}
          aria-invalid={shouldShowError}
          aria-describedby={
            shouldShowError
              ? `${ids.error} ${ids.counter}`
              : `${ids.help} ${ids.counter}`
          }
          aria-errormessage={shouldShowError ? ids.error : undefined}
          maxLength={MAX + 200}
          placeholder="Beschrijf kort wat er is gebeurd (locatie, betrokkenen, schade, etc)…"
        />

        <div className={styles.helpRow}>
          <p id={ids.help} className={styles.help}>
            Geef voldoende detail zodat we je claim snel kunnen beoordelen.
            Minimaal {MIN} tekens, maximaal {MAX} tekens.
          </p>

          <div
            id={ids.counter}
            className={styles.counter}
            data-error={tooLong || (showError && tooShort) ? "true" : "false"}
            aria-live="polite"
          >
            {normalizedLength}/{MAX}
          </div>
        </div>

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
