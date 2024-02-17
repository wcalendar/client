import { createContext } from "react";

export interface AmplitudeContextValue {
  trackAmpEvent: (event: string, properties: Record<string, any>) => void;
}

export const AmplitudeContext = createContext<AmplitudeContextValue>({
  trackAmpEvent: () => {},
});