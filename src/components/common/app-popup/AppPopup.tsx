'use client';

import { usePopup } from "@/providers/PopupProvider/usePopup";
import Popup from "../popup/Popup";

export default function AppPopup() {
  const { popupInfo } = usePopup();

  return (
    <>
      {popupInfo ? (
        <Popup popupInfo={popupInfo} />
      ) : (
        <></>
      )}
    </>
  )
}