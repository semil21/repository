import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getAllCountsService = async () => {
  try {
    const auth_token = sessionStorage.getItem("session_id");

    const fetchData = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_URL}/super-admin/count`,
      {
        headers: {
          Authorization: auth_token,
        },
      },
    );

    return fetchData?.data?.response;
  } catch (error) {
    throw error;
  }
};
