'use client';

import { ReactNode, useCallback, useState } from "react";
import { PopupContext } from "./PopupContext";
import { PopupKey } from "@/types";

interface PopupProviderProps {
  children: ReactNode;
}

export default function PopupProvider({
  children,
}: PopupProviderProps) {
  const [popup, setPopup] = useState<PopupKey | null>(null);

  const openPopup = useCallback((popupKey: PopupKey) => {
    setPopup(popupKey);
  }, []);

  const closePopup = useCallback(() => {
    setPopup(null);
  }, []);

  return (
    <PopupContext.Provider value={{ popup, openPopup, closePopup }}>{children}</PopupContext.Provider>
  )
}