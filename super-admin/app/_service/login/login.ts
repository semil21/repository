import { loginType } from "@/app/_types/login";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const loginService = async (data: loginType) => {
  try {
    const login = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL}/super-admin/login`,
      data,
    );

    return login?.data?.token;
  } catch (error) {
    throw error;
  }
};
