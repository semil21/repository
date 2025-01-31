import {
  addRestaurantService,
  getAllRestaurantOfUser,
  updateRestaurantData,
  updateRestaurantStatus,
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

export const useUpdateRestaurantHook = () => {
  return useMutation({
    mutationFn: updateRestaurantData,
  });
};

export const useUpdateRestaurantStatusHook = () => {
  return useMutation({
    mutationFn: updateRestaurantStatus,
  });
};
