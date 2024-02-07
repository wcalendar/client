import { useState } from "react";
import FixedModal from "../fixed-modal/FixedModal";
import { ModalStatus } from "@/types";
import Tutorial from "./Tutorial";
import useDevice from "@/hooks/useDevice";

export interface TutorialModalProps {

}

export default function TutorialModal() {
  const device = useDevice();

  const [status, setStatus] = useState<ModalStatus>('open');

  return (
    <FixedModal
      width={device === 'mobile' ? '18.75rem' : '31.25rem'}
      status={status}
      onModalClose={() => {}}
    >
      <Tutorial />
    </FixedModal>
  );
}