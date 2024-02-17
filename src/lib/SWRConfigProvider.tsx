'use client';

import useExceptionPopup from "@/hooks/useExceptionPopup";
import { AxiosError } from "axios";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

interface SWRConfigProviderProps {
  children: ReactNode;
}

export default function SWRConfigProvider({
  children,
}: SWRConfigProviderProps) {
  const openExceptionPopup = useExceptionPopup();

  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        onError: (error: AxiosError<any>, key) => {
          openExceptionPopup(error);
        }
      }}
    >
      {children}
    </SWRConfig>
  );
}