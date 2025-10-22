"use client";

import { ClaimDraft, ClaimProduct, PRODUCTS } from "@/lib/claimTypes";
import { useRef, useState } from "react";
import styles from "./page.module.css";
import WizardActions from "@/app/claim/WizardActions";

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
        <legend>
          Welk product gaat het om? <span aria-hidden="true">*</span>
        </legend>
        <p id="product-help" className="visually-hidden">
          Kies één product (verplicht)
        </p>

        <div
          className={styles.radios}
          role="radiogroup"
          aria-describedby="product-help"
          aria-errormessage={hasError ? "product-error" : undefined}
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
              />
              {product}
            </label>
          ))}
        </div>

        {hasError && (
          <p ref={errorRef} id="product-error" role="alert" tabIndex={-1}>
            Maak een keuze om door te gaan.
          </p>
        )}
      </fieldset>

      <WizardActions onBack={onBack} nextType="submit" />
    </form>
  );
}
