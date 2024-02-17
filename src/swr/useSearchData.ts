import useDev from "@/hooks/useDev";
import { fetchers } from "@/lib/apis";
import useSWR from "swr";

export default function useSearchData(searchTerm: string) {
  const { isDev } = useDev();

  const { data, isLoading, mutate } = useSWR(searchTerm !== '' ? ['/schedules/search', isDev(), searchTerm] : null, fetchers.searchSchedule, {});

  return {
    searchData: data,
    isSearchDataLoading: isLoading,
    mutateSearchData: mutate,
  }
}