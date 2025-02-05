import { itemType } from "@/app/_types/item.type";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const addNewItemService = async (data: itemType) => {
  try {
    const auth_toke = sessionStorage.getItem("session_id");

    const addRecord = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL}/item/create`,
      data,
      {
        headers: {
          Authorization: auth_toke,
        },
      },
    );

    return addRecord?.data?.response;
  } catch (error) {
    throw error;
  }
};

export const getAllItemsOfUser = async () => {
  try {
    const auth_token = sessionStorage.getItem("session_id");

    const fetchRecords = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_URL}/item/all-items`,
      {
        headers: {
          Authorization: auth_token,
        },
      },
    );

    return fetchRecords?.data?.response;
  } catch (error) {
    throw error;
  }
};

export const updateItemStatus = async (data: itemType) => {
  try {
    const auth_token = sessionStorage.getItem("session_id");

    const { _id, status } = data;

    const updateRecord = await axios.put(
      `${process.env.NEXT_PUBLIC_DB_URL}/item/update-status/${_id}`,
      { status: status },
      {
        headers: {
          Authorization: auth_token,
        },
      },
    );

    return updateRecord?.data?.response?.status;
  } catch (error) {
    throw error;
  }
};
