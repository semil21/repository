import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getAllCategoriesService = async () => {
  try {
    const auth_token = sessionStorage.getItem("session_id");

    const fetchCategories = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_URL}/super-admin/category`,
      {
        headers: {
          Authorization: auth_token,
        },
      },
    );

    return fetchCategories?.data?.response;
  } catch (error) {
    throw error;
  }
};
