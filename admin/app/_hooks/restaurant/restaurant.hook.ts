import {
  addRestaurantService,
  getAllRestaurantOfUser,
  updateRestaurantData,
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
    // staleTime: 1000 * 60 * 40,
  });
};

export const useUpdateRestaurantHook = () => {
  return useMutation({
    mutationFn: updateRestaurantData,
  });
};
