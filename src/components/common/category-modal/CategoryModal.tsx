import { CategoryModalInfo } from "@/types";
import FloatingModal from "../floating-modal/FloatingModal";
import { useCallback, useState } from "react";
import { useModal } from "@/providers/ModalProvider/useModal";
import CategoryModalContent from "./CategoryModalContent";

export type CategoryModalProps = {
  categoryModalInfo: CategoryModalInfo;
}

export default function CategoryModal({
  categoryModalInfo,
}: CategoryModalProps) {
  const { closeModal } = useModal();

  const [modalInfo, setModalInfo] = useState(categoryModalInfo);
  const { x, y, category } = modalInfo;

  const handleClose = useCallback(() => {
    closeModal();
  }, []);
  
  return (
    <FloatingModal x={x} y={y} onClose={handleClose}>
      <CategoryModalContent category={category} onClose={handleClose} />
    </FloatingModal>
  );
}