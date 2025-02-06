import { getAllCountsService } from "@/app/_service/home-page/home-page";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCountsHook = () => {
  return useQuery({
    queryKey: ["all-counts"],
    queryFn: getAllCountsService,
  });
};
