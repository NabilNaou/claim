export type ClaimProduct = "auto" | "reis" | "wonen";

export type ClaimDraft = {
  product: ClaimProduct | "";
  incidentDate: string;
  iban: string;
  description: string;
};

export const emptyDraft: ClaimDraft = {
  product: "",
  incidentDate: "",
  iban: "",
  description: "",
};
