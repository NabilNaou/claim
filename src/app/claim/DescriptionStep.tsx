"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useId, useRef, useState } from "react";

import styles from "@/app/claim/[step]/page.module.css";
import WizardActions from "@/app/claim/WizardActions";
import type { ClaimDraft } from "@/lib/claimTypes";

type DescriptionProps = {
  draft: Pick<ClaimDraft, "description">;
  update: (data: Partial<ClaimDraft>) => void;
  onNext: () => void;
  onBack: () => void;
};

const MIN = 20;
const MAX = 500;

function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export default function DescriptionStep({
  draft,
  update,
  onNext,
  onBack,
}: DescriptionProps) {
  const uid = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showError, setShowError] = useState(false);

  const ids = {
    input: `${uid}-desc`,
    help: `${uid}-desc-help`,
    error: `${uid}-desc-error`,
    counter: `${uid}-desc-counter`,
  };

  const value = draft.description ?? "";
  const normalized = normalize(value);
  const tooShort = normalized.length < MIN;
  const tooLong = normalized.length > MAX;
  const hasError = tooShort || tooLong;
  const shouldShowError = showError && hasError;

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    update({ description: e.currentTarget.value });
    if (showError) {
      setShowError(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (hasError) {
      setShowError(true);
      textareaRef.current?.focus();
      return;
    }
    update({ description: normalized });
    onNext();
  }

  const counterLabel = `${value.length}/${MAX}`;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <fieldset className={styles.field}>
        <legend className={styles.required}>Wat is er gebeurd?</legend>

        <label htmlFor={ids.input}>Omschrijving</label>
        <textarea
          ref={textareaRef}
          id={ids.input}
          name="description"
          className={`${styles.input} ${styles.textarea ?? ""}`}
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
            {counterLabel}
          </div>
        </div>

        <div className={styles.error}>
          {shouldShowError && (
            <p id={ids.error} role="alert">
              {tooShort
                ? `Schrijf alstublieft iets meer (minimaal ${MIN} tekens).`
                : `Je omschrijving is te lang (maximaal ${MAX} tekens).`}
            </p>
          )}
        </div>
      </fieldset>

      <WizardActions onBack={onBack} nextType="submit" />
    </form>
  );
}
