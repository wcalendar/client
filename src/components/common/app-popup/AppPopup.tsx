'use client';

import { usePopup } from "@/providers/PopupProvider/usePopup";
import Popup from "../popup/Popup";

export default function AppPopup() {
  const { popup } = usePopup();

  return (
    <>
      {popup ? (
        <Popup popup={popup} />
      ) : (
        <></>
      )}
    </>
  )
}