import {
  getAllCategoriesOfUser,
  useAddCategoryService,
} from "@/app/_service/category/category";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddCategryHook = () => {
  return useMutation({
    mutationFn: useAddCategoryService,
  });
};

export const useGetAllCategoriesHook = () => {
  return useQuery({
    queryKey: ["all-categories"],
    queryFn: getAllCategoriesOfUser,
  });
};
