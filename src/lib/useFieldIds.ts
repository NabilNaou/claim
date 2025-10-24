import { useId } from "react";

export function useFieldIds(name: string) {
  const base = useId();
  return {
    input: `${base}-${name}`,
    help: `${base}-${name}-help`,
    error: `${base}-${name}-error`,
    counter: `${base}-${name}-counter`,
  } as const;
}
