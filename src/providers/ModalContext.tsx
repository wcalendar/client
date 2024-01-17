'use client';

import {  ModalKey, ModalProps, ModalType } from "@/types";
import { ReactNode, createContext, useState } from "react";

export interface ModalContextValue {
  modals: ModalKey[];
  addModal: (modalKey: ModalKey) => void;
}

export const ModalContext = createContext<ModalContextValue>({
  modals: [],
  addModal: () => {},
});

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({
  children,
}: ModalProviderProps) => {
  const [modals, setModals] = useState<ModalKey[]>([]);

  const addModal = (modalKey: ModalKey) => {
    setModals([modalKey]);
  };

  return (
    <ModalContext.Provider value={{ modals, addModal }}>{children}</ModalContext.Provider>
  )
};