'use client';

import time from "@/lib/time";
import { Dayjs } from "dayjs";
import { ReactNode, useCallback, useState } from "react";
import { CurrentDateContext } from "./CurrentDateContext";

interface CurrentDateProviderProps {
  children: ReactNode;
}

export const CurrentDateProvider = ({
  children,
}: CurrentDateProviderProps) => {
  const [date, setDate] = useState<Dayjs>(time.now());

  const setCurrentDate = useCallback((newDate: Dayjs) => {
    setDate(newDate);
  }, []);

  return (
    <CurrentDateContext.Provider value={{ currentDate: date, setCurrentDate }}>{children}</CurrentDateContext.Provider>
  )
};