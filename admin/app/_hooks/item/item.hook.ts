import {
  addNewItemService,
  getAllItemsOfUser,
  updateItemStatus,
} from "@/app/_service/item/item.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddItemHook = () => {
  return useMutation({
    mutationFn: addNewItemService,
  });
};

export const useAllitemshook = () => {
  return useQuery({
    queryKey: ["all-items"],
    queryFn: getAllItemsOfUser,
  });
};

export const useItemUdateHook = () => {
  return useMutation({
    mutationFn: updateItemStatus,
  });
};
