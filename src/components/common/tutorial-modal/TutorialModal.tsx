import { useState } from "react";
import FixedModal from "../fixed-modal/FixedModal";
import { ModalStatus } from "@/types";
import Tutorial from "./Tutorial";

export interface TutorialModalProps {

}

export default function TutorialModal() {
  const [status, setStatus] = useState<ModalStatus>('open');

  return (
    <FixedModal
      width='33rem'
      status={status}
      onModalClose={() => {}}
    >
      <Tutorial />
    </FixedModal>
  );
}