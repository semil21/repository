import axios from "axios";
import { sigUpType } from "@/app/_types/signup.type";
import dotenv from "dotenv";

dotenv.config();

export const useSignUpSerivce = async (data: sigUpType) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL}/admin/create`,
      data,
    );

    const signUpData = await response?.data;
    return signUpData;
  } catch (error) {
    throw error;
  }
};
