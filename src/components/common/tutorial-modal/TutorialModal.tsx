import { useCallback, useState } from "react";
import FixedModal from "../fixed-modal/FixedModal";
import { ModalStatus } from "@/types";
import Tutorial from "./Tutorial";
import useDevice from "@/hooks/useDevice";

export interface TutorialModalProps {

}

export default function TutorialModal() {
  const device = useDevice();

  const [status, setStatus] = useState<ModalStatus>('open');

  const handleClose = useCallback(() => {
    setStatus('closing');
  }, []);

  return (
    <FixedModal
      width={device === 'mobile' ? '18.75rem' : '31.25rem'}
      backgroundColor='black'
      status={status}
      onModalClose={handleClose}
    >
      <Tutorial onClose={handleClose} />
    </FixedModal>
  );
}