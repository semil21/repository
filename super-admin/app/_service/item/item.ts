import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getAllItemsService = async () => {
  try {
    const auth_token = sessionStorage.getItem("session_id");

    const fetchItems = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_URL}/super-admin/item`,
      {
        headers: {
          Authorization: auth_token,
        },
      },
    );

    return fetchItems?.data?.response;
  } catch (error) {
    throw error;
  }
};
