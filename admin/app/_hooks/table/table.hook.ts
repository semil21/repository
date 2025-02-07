import {
  addNewTableService,
  getAllTablesService,
} from "@/app/_service/table/table";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useFetchAllTablesHook = () => {
  return useQuery({
    queryKey: ["all-tables"],
    queryFn: getAllTablesService,
  });
};

export const useAddNewTableHook = () => {
  return useMutation({ mutationFn: addNewTableService });
};
