import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
export const getAllRestaurantservice = async () => {
  try {
    const auth_token = sessionStorage.getItem("session_id");
    const fetchRestaurantsData = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_URL}/super-admin/restaurant`,

      {
        headers: {
          Authorization: auth_token,
        },
      },
    );

    return fetchRestaurantsData?.data?.response;
  } catch (error) {
    throw error;
  }
};
