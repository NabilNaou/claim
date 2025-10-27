"use client";
import { useState } from "react";

import type { ClaimDraft } from "./claimTypes";
import { emptyDraft } from "./claimTypes";

const KEY = "claimDraft";

// Disable for testing.
const DEV_BYPASS_STORAGE = false;

/** LocalStorage placeholder claim draft. TODO: replace with redux. */
export function useClaimDraft() {
  const [draft, setDraft] = useState<ClaimDraft>(() => {
    if (DEV_BYPASS_STORAGE || typeof window === "undefined") {
      return emptyDraft;
    }

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
    const next = { ...draft, ...patch };
    setDraft(next);

    if (!DEV_BYPASS_STORAGE) {
      localStorage.setItem(KEY, JSON.stringify(next));
    }
  }

  function reset() {
    setDraft(emptyDraft);
    if (!DEV_BYPASS_STORAGE) {
      localStorage.removeItem(KEY);
    }
  }

  return { draft, update, reset };
}
