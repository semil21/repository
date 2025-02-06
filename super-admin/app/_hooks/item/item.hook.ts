import { getAllItemsService } from "@/app/_service/item/item";
import { useQuery } from "@tanstack/react-query";

export const useAllItemsHook = () => {
  return useQuery({
    queryKey: ["all-items"],
    queryFn: getAllItemsService,
  });
};
