import { loginType } from "@/app/_types/login.type";
import axios from "axios";

export const useLoginService = async (data: loginType) => {
  try {
    const response = await axios.post(
      "http://localhost:4200/admin/login",
      data,
    );

    const loginData = await response.data;
    return loginData;
  } catch (error) {
    throw error;
  }
};
