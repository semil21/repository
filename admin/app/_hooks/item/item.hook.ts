import {
  addNewItemService,
  getAllItemsOfUser,
  updateItemRecord,
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

export const useItemStatusUpdateHook = () => {
  return useMutation({
    mutationFn: updateItemStatus,
  });
};

export const useItemUpdateHook = () => {
  return useMutation({
    mutationFn: updateItemRecord,
  });
};
