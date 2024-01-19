'use client';

import {  ModalKey } from "@/types";
import { createContext } from "react";

export interface ModalContextValue {
  modals: ModalKey[];
  addModal: (modalKey: ModalKey) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextValue>({
  modals: [],
  addModal: () => {},
  closeModal: () => {},
});