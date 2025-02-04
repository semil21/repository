import {
  getAllCategoriesOfUserService,
  updateCatgoryStatusService,
  addCategoryService,
  updateCategoryRecordService,
} from "@/app/_service/category/category";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddCategryHook = () => {
  return useMutation({
    mutationFn: addCategoryService,
  });
};

export const useGetAllCategoriesHook = () => {
  return useQuery({
    queryKey: ["all-categories"],
    queryFn: getAllCategoriesOfUserService,
  });
};

export const useUpdateCategoryStatusHook = () => {
  return useMutation({
    mutationFn: updateCatgoryStatusService,
  });
};

export const useUpdateCategoryHoook = () => {
  return useMutation({
    mutationFn: updateCategoryRecordService,
  });
};
