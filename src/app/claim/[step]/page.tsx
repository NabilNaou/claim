"use client";

import Stepper from "@/components/ui/Stepper";
import { useClaimDraft } from "@/lib/useClaimDraft";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import styles from "./page.module.css";

export default function ClaimStepPage() {
  const { step: stepParam } = useParams<{ step: string }>();
  const step = useMemo(() => {
    const n = Number(stepParam);
    return Number.isFinite(n) && n >= 1 && n <= 5 ? n : 1;
  }, [stepParam]);

  const { draft, update } = useClaimDraft();
  const router = useRouter();

  // Stap 1, product. Radio inside fieldset is navigable with arrow keys on the keyboard.
  if (step === 1) {
    return (
      <section className="stack" aria-labelledby="h1">
        <h1 id="h1">Claim indienen</h1>
        <p className="visually-hidden">Stap {step} van 5</p>

        <Stepper step={1} />

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            if (!draft.product) {
              const el = document.getElementById("product-error");
              el?.focus();
              return;
            }
            router.push("/claim/2");
          }}
          noValidate
          aria-describedby="product-help"
        >
          <fieldset>
            <legend>Welk product gaat het om?</legend>
            <p id="product-help" className="visually-hidden">
              Kies één product
            </p>

            <div className={styles.radios} aria-describedby="product-help">
              <label>
                <input
                  type="radio"
                  name="product"
                  value="auto"
                  checked={draft.product === "auto"}
                  onChange={() => update({ product: "auto" })}
                />{" "}
                Auto
              </label>

              <label>
                <input
                  type="radio"
                  name="product"
                  value="reis"
                  checked={draft.product === "reis"}
                  onChange={() => update({ product: "reis" })}
                />{" "}
                Reis
              </label>

              <label>
                <input
                  type="radio"
                  name="product"
                  value="wonen"
                  checked={draft.product === "wonen"}
                  onChange={() => update({ product: "wonen" })}
                />{" "}
                Wonen
              </label>
            </div>

            {!draft.product && (
              <p id="product-error" role="alert" tabIndex={-1}>
                Maak een keuze om door te gaan.
              </p>
            )}
          </fieldset>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.button} ${styles.secondary}`}
              onClick={() => router.back()}
            >
              Vorige
            </button>
            <button type="submit" className={styles.button}>
              Volgende
            </button>
          </div>
        </form>
      </section>
    );
  }

  // Placeholder voor andere stappen (even door kunnen klikken) //
  return (
    <section className="stack">
      <h1>Stap {step}</h1>
      <Stepper step={step} />
      <p>Klik door om te testen.</p>
      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.button} ${styles.secondary}`}
          onClick={() => router.push(`/claim/${step - 1}`)}
          disabled={step <= 1}
        >
          Vorige
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => router.push(`/claim/${step + 1}`)}
          disabled={step >= 5}
        >
          Volgende
        </button>
      </div>
    </section>
  );
}
