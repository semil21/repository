import { categoryType } from "@/app/_types/category.type";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
export const useAddCategoryService = async (data: categoryType) => {
  try {
    const authToken = sessionStorage.getItem("session_id");
    const addData = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL}/category/create`,
      data,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

    return addData?.data?.response;
  } catch (error) {
    throw error;
  }
};
