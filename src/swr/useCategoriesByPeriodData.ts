import useDev from "@/hooks/useDev";
import { fetchers } from "@/lib/apis";
import useSWR from "swr";

export default function useCategoriesByPeriodData(sy: number, sm: number, ey: number, em: number) {
  const { isDev } = useDev();
  
  const { data, isLoading, mutate } = useSWR(['/categories', isDev(), sy, sm, ey, em], fetchers.getCategoriesByPeriod, {});

  return {
    categoriesByPeriodData: data,
    isCategoriesByPeriodDataLoading: isLoading,
    mutateCategoriesByPeriodData: mutate,
  }
}