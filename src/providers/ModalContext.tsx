'use client';

import {  ModalKey, ModalProps, ModalType } from "@/types";
import { ReactNode, createContext, useState } from "react";

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

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({
  children,
}: ModalProviderProps) => {
  console.log('re')
  const [modals, setModals] = useState<ModalKey[]>([]);

  const addModal = (modalKey: ModalKey) => {
    setModals([modalKey]);
  };

  const closeModal = () => {
    setModals([]);
  }

  return (
    <ModalContext.Provider value={{ modals, addModal, closeModal }}>{children}</ModalContext.Provider>
  )
};