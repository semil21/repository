import { addRestaurantService } from "@/app/_service/restaurant/restaurant.service";
import { useMutation } from "@tanstack/react-query";

export const useAddRestaurantHook = () => {
  return useMutation({
    mutationFn: addRestaurantService,
  });
};
