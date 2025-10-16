"use client";
import { useEffect, useState } from "react";
import { ClaimDraft, emptyDraft } from "./claimTypes";

const KEY = "claimDraft";

/** LocalStorage claim draft for demo */
export function useClaimDraft() {
  const [draft, setDraft] = useState<ClaimDraft>(emptyDraft);

  useEffect(() => {
    const raw =
      typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
    if (raw) {
      try {
        setDraft({ ...emptyDraft, ...JSON.parse(raw) });
      } catch {}
    }
  }, []);

  function update(patch: Partial<ClaimDraft>) {
    setDraft((prev) => {
      const next = { ...prev, ...patch };
      if (typeof window !== "undefined")
        localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }

  return {
    draft,
    update,
    reset: () => {
      localStorage.removeItem(KEY);
      setDraft(emptyDraft);
    },
  };
}
