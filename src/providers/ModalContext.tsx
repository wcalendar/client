import { ModalInfo, ModalKey, ModalType } from "@/types";
import { ReactNode, createContext, useState } from "react";

export interface ModalContextValue {
  modals: ModalKey[];
  addModal: (modalType: ModalType, modalInfo: ModalInfo) => void;
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

  const addModal = (modalType: ModalType, modalInfo: ModalInfo) => {
    setModals([{ key: modalType, modalInfo, }]);
  };

  return (
    <ModalContext.Provider value={{ modals, addModal }}>{children}</ModalContext.Provider>
  )
};