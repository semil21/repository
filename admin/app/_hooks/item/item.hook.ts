import { addNewItemService } from "@/app/_service/item/item.service";
import { useMutation } from "@tanstack/react-query";

export const useAddItemHook = () => {
  return useMutation({
    mutationFn: addNewItemService,
  });
};
