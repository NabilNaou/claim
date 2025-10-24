"use client";

import { useParams, useRouter } from "next/navigation";

import PlaceholderStep from "@/app/claim/[step]/PlaceholderStep";
import IbanStep from "@/app/claim/IbanStep";
import IncidentDateStep from "@/app/claim/IncidentDateStep";
import ProductStep from "@/app/claim/ProductStep";
import Stepper from "@/components/ui/Stepper";
import { useClaimDraft } from "@/lib/useClaimDraft";

export default function ClaimStepPage() {
  const { step: stepParam } = useParams<{ step: string }>();
  const step = Number(stepParam) || 1;

  const { draft, update } = useClaimDraft();
  const router = useRouter();

  return (
    <section className="stack" aria-labelledby="h1">
      <h1 id="h1">Claim indienen</h1>
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

      {step > 3 && (
        <PlaceholderStep
          step={step}
          onNext={() => router.push(`/claim/${step + 1}`)}
          onBack={() => router.push(`/claim/${step - 1}`)}
        />
      )}
    </section>
  );
}
