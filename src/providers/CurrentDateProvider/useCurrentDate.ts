import { useContext } from "react";
import { CurrentDateContext } from "./CurrentDateContext";

export const useCurrentDate = () => useContext(CurrentDateContext);