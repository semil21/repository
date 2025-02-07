import {
  addNewTableService,
  getAllTablesService,
  updateTableRecordService,
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

export const useUpdateTableHook = () => {
  return useMutation({ mutationFn: updateTableRecordService });
};
