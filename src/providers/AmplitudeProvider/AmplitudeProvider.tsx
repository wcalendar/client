'use client';

import { init, track } from "@amplitude/analytics-browser";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { AmplitudeContext } from "./AmplitudeContext";

interface AmplitudeProviderProps {
  children: ReactNode;
}

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function AmplitudeProvider({
  children,
}: AmplitudeProviderProps) {
  const [canAmplitudeTrack, setAmplitudeTrack] = useState(false);

  useEffect(() => {
    if(AMPLITUDE_API_KEY) {
      init(AMPLITUDE_API_KEY);
      setAmplitudeTrack(true);
    }
  }, []);

  const trackAmpEvent = useCallback((event: string, properties: Record<string, any>) => {
    if(canAmplitudeTrack) track(event, properties);
  }, [canAmplitudeTrack]);
  
  return (
    <AmplitudeContext.Provider value={{ trackAmpEvent }}>
      {children}
    </AmplitudeContext.Provider>
  )
}