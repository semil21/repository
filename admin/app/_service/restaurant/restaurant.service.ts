import { restaurantType } from "@/app/_types/restaurant.type";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
export const addRestaurantService = async (data: restaurantType) => {
  try {
    const authToken = sessionStorage.getItem("session_id");
    const addRestaurant = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL}/restaurant/create`,
      data,
      {
        headers: {
          authorization: authToken,
        },
      },
    );

    return addRestaurant;
  } catch (error) {
    throw error;
  }
};
