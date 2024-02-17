import { useContext } from "react";
import { AmplitudeContext } from "./AmplitudeContext";

export default function useAmplitude() {
  return useContext(AmplitudeContext); 
}