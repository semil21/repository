import { loginType } from "../_types/login.types";
import axios from "axios";

export const loginService = async (data: loginType) => {
  try {
    const login = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL}/owner/login`,
      data,
    );
  } catch (error) {
    console.log("Failed to log in");
    alert("wrong password");
  }
};
