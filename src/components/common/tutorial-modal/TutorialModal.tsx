import { useCallback, useState } from "react";
import FixedModal from "../fixed-modal/FixedModal";
import { ModalStatus } from "@/types";
import Tutorial from "./Tutorial";
import useDevice from "@/hooks/useDevice";
import { useModal } from "@/providers/ModalProvider/useModal";

export interface TutorialModalProps {

}

export default function TutorialModal() {
  const device = useDevice();
  const { closeModal } = useModal();

  const [status, setStatus] = useState<ModalStatus>('open');

  const handleClose = useCallback(() => {
    setStatus('closing');
  }, []);

  return (
    <FixedModal
      width={device === 'mobile' ? '18.75rem' : '31.25rem'}
      status={status}
      onModalClose={handleClose}
    >
      <Tutorial onClose={handleClose} />
    </FixedModal>
  );
}