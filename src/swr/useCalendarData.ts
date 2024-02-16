import useDev from "@/hooks/useDev";
import { fetchers } from "@/lib/apis";
import { useCurrentDate } from "@/providers/CurrentDateProvider/useCurrentDate";
import useSWR from "swr";

export default function useCalendarData() {
  const { isDev } = useDev();
  const { currentDate } = useCurrentDate();

  const { data, isLoading, mutate } = useSWR(['/schedules', isDev(), currentDate.year(), currentDate.month()], fetchers.getCalendarData, {});

  return {
    calendarData: data,
    isCalendarDateLoading: isLoading,
    mutateCalendarData: mutate,
  };
}