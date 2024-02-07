import { useContext } from "react";
import { PopupContext } from "./PopupContext";

export const usePopup = () => useContext(PopupContext);