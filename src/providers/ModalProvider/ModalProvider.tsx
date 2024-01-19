'use client';

import { ModalKey } from "@/types";
import { ReactNode, useCallback, useState } from "react";
import { ModalContext } from "./ModalContext";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({
  children,
}: ModalProviderProps) => {
  const [modals, setModals] = useState<ModalKey[]>([]);

  const addModal = useCallback((modalKey: ModalKey) => {
    setModals([modalKey]);
  }, []);

  const closeModal = useCallback(() => {
    setModals([]);
  }, []); 

  return (
    <ModalContext.Provider value={{ modals, addModal, closeModal }}>{children}</ModalContext.Provider>
  )
};