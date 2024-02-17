import useDev from "@/hooks/useDev";
import { fetchers } from "@/lib/apis";
import { useCurrentDate } from "@/providers/CurrentDateProvider/useCurrentDate";
import useSWR from "swr";

export default function useCategoriesData() {
  const { isDev } = useDev();
  const { currentDate } = useCurrentDate();

  const { data, isLoading, mutate } = useSWR(['/categories', isDev(), currentDate.year(), currentDate.month()], fetchers.getCategories, {});

  return {
    categoriesData: data,
    iscategoriesDataLoading: isLoading,
    mutateCategoriesData: mutate,
  };
}