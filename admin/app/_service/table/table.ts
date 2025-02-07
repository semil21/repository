import { addNewTable } from "@/app/_types/table.type";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getAllTablesService = async () => {
  try {
    const auth_token = sessionStorage.getItem("session_id");

    const fetchAllTableRecords = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_URL}/table/get-all-tables`,
      {
        headers: {
          Authorization: auth_token,
        },
      },
    );

    return fetchAllTableRecords?.data?.response;
  } catch (error) {
    throw error;
  }
};

export const addNewTableService = async (data: addNewTable) => {
  try {
    const auth_token = sessionStorage.getItem("session_id");
    const addewTableRecord = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL}/table/create`,
      data,
      {
        headers: {
          Authorization: auth_token,
        },
      },
    );

    return addewTableRecord?.data?.response;
  } catch (error) {
    const errorMessage = error?.response?.data?.response || "An error occurred";
    throw new Error(errorMessage);
  }
};
