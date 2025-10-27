"use client";

import { useParams, useRouter } from "next/navigation";

import styles from "@/app/claim/[step]/page.module.css";
import DescriptionStep from "@/app/claim/DescriptionStep";
import IbanStep from "@/app/claim/IbanStep";
import IncidentDateStep from "@/app/claim/IncidentDateStep";
import ProductStep from "@/app/claim/ProductStep";
import ReviewStep from "@/app/claim/ReviewStep";
import Stepper from "@/components/ui/Stepper";
import { useClaimDraft } from "@/lib/useClaimDraft";

export default function ClaimStepPage() {
  const { step: stepParam } = useParams<{ step: string }>();
  const step = +stepParam;
  const { draft, update, reset } = useClaimDraft();
  const router = useRouter();

  return (
    <section className="stack" aria-labelledby="h1">
      <h1 className={styles.headerLine}>Claim indienen</h1>
      <p className="visually-hidden">Stap {step} van 5</p>
      <Stepper step={step} />

      {step === 1 && (
        <ProductStep
          draft={draft}
          update={update}
          onNext={() => router.push("/claim/2")}
          onBack={() => router.push("/")}
        />
      )}

      {step === 2 && (
        <IncidentDateStep
          draft={draft}
          update={update}
          onNext={() => router.push("/claim/3")}
          onBack={() => router.push("/claim/1")}
        />
      )}

      {step === 3 && (
        <IbanStep
          draft={draft}
          update={update}
          onNext={() => router.push("/claim/4")}
          onBack={() => router.push("/claim/2")}
        />
      )}
      {step === 4 && (
        <DescriptionStep
          draft={draft}
          update={update}
          onNext={() => router.push("/claim/5")}
          onBack={() => router.push("/claim/3")}
        />
      )}

      {step === 5 && (
        <ReviewStep
          draft={draft}
          onBack={() => router.push("/claim/4")}
          onSubmitSuccess={() => {
            reset();
            router.push("/claim/success");
          }}
        />
      )}
    </section>
  );
}
