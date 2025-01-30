import {
  addRestaurantService,
  getAllRestaurantOfUser,
} from "@/app/_service/restaurant/restaurant.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddRestaurantHook = () => {
  return useMutation({
    mutationFn: addRestaurantService,
  });
};

export const useGetAllRestaurantHooke = () => {
  return useQuery({
    queryKey: ["all-restaurants"],
    queryFn: getAllRestaurantOfUser,
  });
};
