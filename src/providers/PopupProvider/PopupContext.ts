'use client';

import { PopupInfo } from "@/types";
import { createContext } from "react";

export interface PopupContextValue {
  popupInfo: PopupInfo | null;
  openPopup: (popupInfo: PopupInfo) => void;
  closePopup: () => void;
}

export const PopupContext = createContext<PopupContextValue>({ popupInfo: null, openPopup: () => {}, closePopup: () => {} });