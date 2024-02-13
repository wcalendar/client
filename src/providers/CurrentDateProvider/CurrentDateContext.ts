'use client';

import time from "@/lib/time";
import { Dayjs } from "dayjs";
import { createContext } from "react";

export interface ModalContextValue {
  currentDate: Dayjs;
}

export const CurrentDateContext = createContext<ModalContextValue>({
  currentDate: time.now(),
});