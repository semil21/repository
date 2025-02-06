import { useQuery } from "@tanstack/react-query";
import { getAllCategoriesService } from "@/app/_service/category/category";

export const useGetAllCategoriesHook = () => {
  return useQuery({
    queryKey: ["all-categories"],
    queryFn: getAllCategoriesService,
  });
};
