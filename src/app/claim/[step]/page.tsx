"use client";

import PlaceholderStep from "@/app/claim/[step]/PlaceholderStep";
import ProductStep from "@/app/claim/[step]/ProductStep";
import Stepper from "@/components/ui/Stepper";
import { useClaimDraft } from "@/lib/useClaimDraft";
import { useParams, useRouter } from "next/navigation";

export default function ClaimStepPage() {
  const { step: stepParam } = useParams<{ step: string }>();
  const step = Number(stepParam) || 1; // Fallback logic for non numbers

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

      {step !== 1 && (
        <PlaceholderStep
          step={step}
          onNext={() => router.push(`/claim/${step + 1}`)}
          onBack={() => router.push(`/claim/${step - 1}`)}
        />
      )}
    </section>
  );
}
