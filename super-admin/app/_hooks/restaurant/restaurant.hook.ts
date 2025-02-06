import { getAllRestaurantservice } from "@/app/_service/restaurant/restaurant";
import { useQuery } from "@tanstack/react-query";

export const useGetAllRestaurantHook = () => {
  return useQuery({
    queryKey: ["all-restaurants"],
    queryFn: getAllRestaurantservice,
  });
};
