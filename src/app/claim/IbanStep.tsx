"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useRef, useState } from "react";

import styles from "@/app/claim/[step]/page.module.css";
import WizardActions from "@/app/claim/WizardActions";
import type { ClaimDraft } from "@/lib/claimTypes";
import { useFieldIds } from "@/lib/useFieldIds";
import {
  formatIbanDisplay,
  isValidDutchIban,
  normalizeIban,
} from "@/lib/validator";

type IbanProps = {
  draft: Pick<ClaimDraft, "iban">;
  update: (data: Partial<ClaimDraft>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function IbanStep({ draft, update, onNext, onBack }: IbanProps) {
  const [showError, setShowError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const ids = useFieldIds("iban");

  const raw = draft.iban;
  const formatted = formatIbanDisplay(raw);
  const hasError = showError && !isValidDutchIban(raw);

  function handleChange(error: ChangeEvent<HTMLInputElement>) {
    update({ iban: normalizeIban(error.currentTarget.value) });
    setShowError(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidDutchIban(raw)) {
      setShowError(true);
      inputRef.current?.focus();
      return;
    }
    onNext();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <fieldset className={styles.field}>
        <legend className={styles.required}>Wat is je IBAN?</legend>

        <label htmlFor={ids.input}>IBAN (NL)</label>
        <input
          ref={inputRef}
          id={ids.input}
          name="iban"
          type="text"
          className={styles.input}
          required
          value={formatted}
          onChange={handleChange}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${ids.help} ${ids.error}` : ids.help}
          aria-errormessage={hasError ? ids.error : undefined}
          autoComplete="off"
          autoCapitalize="characters"
        />

        <p id={ids.help} className={styles.help}>
          Voer een Nederlands IBAN in, bijv. <code>NL98ABNA0416961347</code>.
        </p>

        <div className={styles.error}>
          {hasError && (
            <p id={ids.error} role="alert">
              Vul een geldig NL-IBAN in (NL + 2 cijfers + 4 letters + 10
              cijfers).
            </p>
          )}
        </div>
      </fieldset>

      <WizardActions onBack={onBack} nextType="submit" />
    </form>
  );
}
