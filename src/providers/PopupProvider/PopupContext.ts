'use client';

import { PopupKey } from "@/types";
import { createContext } from "react";

export interface PopupContextValue {
  popup: PopupKey | null;
  openPopup: (popupKey: PopupKey) => void;
  closePopup: () => void;
}

export const PopupContext = createContext<PopupContextValue>({ popup: null, openPopup: () => {}, closePopup: () => {} });