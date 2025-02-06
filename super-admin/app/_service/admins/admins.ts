import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getAllAdminsListService = async () => {
  try {
    const auth_token = sessionStorage.getItem("session_id");
    const fetchRecords = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_URL}/super-admin/get-all-admins`,
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
