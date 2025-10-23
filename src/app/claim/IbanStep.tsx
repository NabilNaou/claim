"use client";

import styles from "@/app/claim/[step]/page.module.css";
import WizardActions from "@/app/claim/WizardActions";
import type { ClaimDraft } from "@/lib/claimTypes";
import { useId, useRef, useState } from "react";

/**
 * Normalized IBAN for storage. Uppercase + no spaces.
 * @param raw - the raw IBAN.
 * @returns
 */
function normalizeIban(raw: string) {
  return raw.replace(/\s+/g, "").toUpperCase();
}

/**
 * For display. Format the iban in a presentable format:
 * uppercase, spacebar every 4 chars. Does not change logic.
 * @param raw - the raw pre transformed string.
 * @returns
 */
function formatIbanDisplay(raw: string) {
  const compact = normalizeIban(raw);
  return compact.replace(/(.{4})/g, "$1 ").trim();
}

/**
 * For validation. Check if IBAN is: NL + 2 digits + 4 letters
 * + 10 digits.
 * @param raw
 * @returns
 */
function isValidIban(raw: string) {
  const compact = normalizeIban(raw);
  // test provides validation for our iban.
  return /^NL\d{2}[A-Z]{4}\d{10}$/.test(compact);
}

type IbanProps = {
  draft: Pick<ClaimDraft, "iban">;
  update: (data: Partial<ClaimDraft>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function IbanStep({ draft, update, onNext, onBack }: IbanProps) {
  const [showError, setShowError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = useId();

  const value = draft.iban ?? "";
  const formatted = formatIbanDisplay(value);
  const hasError = showError && !isValidIban(value);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    update({ iban: normalizeIban(e.currentTarget.value) });
    setShowError(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidIban(value)) {
      setShowError(true);
      inputRef.current?.focus();
      return;
    }
    onNext();
  }

  const ids = {
    input: `${uid}-iban`,
    help: `${uid}-iban-help`,
    error: `${uid}-iban-error`,
  };

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
