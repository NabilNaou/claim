"use client";
import { useEffect, useState } from "react";
import { ClaimDraft, emptyDraft } from "./claimTypes";

const KEY = "claimDraft";

/** LocalStorage placeholder claim draft. TODO: replace with redux. */
export function useClaimDraft() {
  const [draft, setDraft] = useState<ClaimDraft>(emptyDraft);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        setDraft({ ...emptyDraft, ...JSON.parse(raw) });
      } catch (error) {
        console.error("Placeholder storing went wrong:", error);
        localStorage.removeItem(KEY);
      }
    }
  }, []);

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
