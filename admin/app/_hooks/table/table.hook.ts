import { getAllTablesService } from "@/app/_service/table/table";
import { useQuery } from "@tanstack/react-query";

export const useFetchAllTablesHook = () => {
  return useQuery({
    queryKey: ["all-tables"],
    queryFn: getAllTablesService,
  });
};
