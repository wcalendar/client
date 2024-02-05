'use client';

import { ReactNode, useCallback, useState } from "react";
import { PopupContext } from "./PopupContext";
import { PopupInfo } from "@/types";

interface PopupProviderProps {
  children: ReactNode;
}

export default function PopupProvider({
  children,
}: PopupProviderProps) {
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);

  const openPopup = useCallback((popupInfo: PopupInfo) => {
    setPopupInfo(popupInfo);
  }, []);

  const closePopup = useCallback(() => {
    setPopupInfo(null);
  }, []);

  return (
    <PopupContext.Provider value={{ popupInfo, openPopup, closePopup }}>{children}</PopupContext.Provider>
  )
}