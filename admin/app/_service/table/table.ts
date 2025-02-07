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
