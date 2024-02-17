'use client';

import time from "@/lib/time";
import { Dayjs } from "dayjs";
import { createContext } from "react";

export interface ModalContextValue {
  currentDate: Dayjs;
  setCurrentDate: (newDate: Dayjs) => void;
}

export const CurrentDateContext = createContext<ModalContextValue>({
  currentDate: time.new(time.now().year(), time.now().month()),
  setCurrentDate: () => {},
});