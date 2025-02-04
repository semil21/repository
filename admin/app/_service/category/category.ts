import { categoryType } from "@/app/_types/category.type";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
export const addCategoryService = async (data: categoryType) => {
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

export const getAllCategoriesOfUserService = async () => {
  try {
    const authToken = sessionStorage.getItem("session_id");

    const fetchCategories = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_URL}/category/get-categories`,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

    return fetchCategories?.data?.response;
  } catch (error) {
    throw error;
  }
};

export const updateCatgoryStatusService = async (data: categoryType) => {
  const authToken = sessionStorage.getItem("session_id");
  const { _id, status } = data;
  try {
    const updateStatus = await axios.put(
      `${process.env.NEXT_PUBLIC_DB_URL}/category/update-status/${_id}`,
      { status: status },
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

    return updateStatus?.data?.response;
  } catch (error) {
    throw error;
  }
};

export const updateCategoryRecordService = async (data: categoryType) => {
  try {
    const authToken = sessionStorage.getItem("session_id");

    console.log("poiu098", data);
    const { _id } = data;

    const updateCategory = await axios.put(
      `${process.env.NEXT_PUBLIC_DB_URL}/category/update/${_id}`,
      data,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

    return updateCategory?.data?.response;
  } catch (error) {
    throw error;
  }
};
