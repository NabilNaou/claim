export const PRODUCTS = ["auto", "reis", "wonen"] as const;

export type ClaimProduct = (typeof PRODUCTS)[number];

export type ClaimDraft = {
  product: ClaimProduct | null;
  incidentDate: string;
  iban: string;
  description: string;
};

export const emptyDraft: ClaimDraft = {
  product: null,
  incidentDate: "",
  iban: "",
  description: "",
};
