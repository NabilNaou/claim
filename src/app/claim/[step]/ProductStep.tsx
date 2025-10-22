"use client";

import WizardActions from "@/app/claim/WizardActions";
import { ClaimDraft, ClaimProduct, PRODUCTS } from "@/lib/claimTypes";
import { useRef, useState } from "react";
import styles from "./page.module.css";

interface ProductStepProps {
  draft: Pick<ClaimDraft, "product">;
  update: (data: Partial<ClaimDraft>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ProductStep({
  draft,
  update,
  onNext,
  onBack,
}: ProductStepProps) {
  const [showError, setShowError] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);

  const hasError = showError && !draft.product;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!draft.product) {
      setShowError(true);
      errorRef.current?.focus();
      return;
    }

    onNext();
  }

  function handleProductChange(product: ClaimProduct) {
    update({ product });
    setShowError(false);
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="product-help"
    >
      <fieldset>
        <legend className={styles.required}>Welk product gaat het om?</legend>

        <p id="product-help" className="visually-hidden">
          Kies één product (verplicht)
        </p>

        <div
          className={styles.radios}
          role="radiogroup"
          aria-describedby="product-help"
          aria-invalid={hasError}
        >
          {PRODUCTS.map((product) => (
            <label key={product}>
              <input
                type="radio"
                name="product"
                value={product}
                checked={draft.product === product}
                onChange={() => handleProductChange(product)}
                aria-invalid={hasError}
                aria-describedby={hasError ? "product-error" : "product-help"}
              />
              {product}
            </label>
          ))}
        </div>

        <div className={styles.error}>
          {hasError && (
            <p ref={errorRef} id="product-error" role="alert" tabIndex={-1}>
              Maak een keuze om door te gaan.
            </p>
          )}
        </div>
      </fieldset>

      <WizardActions onBack={onBack} nextType="submit" />
    </form>
  );
}
