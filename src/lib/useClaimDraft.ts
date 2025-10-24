"use client";
import { useEffect, useState } from "react";

import type { ClaimDraft } from "./claimTypes";
import { emptyDraft } from "./claimTypes";

const KEY = "claimDraft";

/** LocalStorage placeholder claim draft. TODO: replace with redux. */
export function useClaimDraft() {
  const [draft, setDraft] = useState<ClaimDraft>(() => {
    if (typeof window === "undefined") return emptyDraft;

    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        return { ...emptyDraft, ...JSON.parse(raw) };
      } catch (error) {
        console.error("Placeholder storing went wrong:", error);
        localStorage.removeItem(KEY);
      }
    }
    return emptyDraft;
  });

  function update(patch: Partial<ClaimDraft>) {
    setDraft((prev) => ({ ...prev, ...patch }));
  }

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(draft));
  }, [draft]);

  return {
    draft,
    update,
    reset: () => {
      localStorage.removeItem(KEY);
      setDraft(emptyDraft);
    },
  };
}
