import { sigUpType } from "../_types/signup.type";
import axios from "axios";

export const sigUpSerice = async (data: sigUpType) => {
  try {
    const signUp = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL}/owner/create`,
      data,
    );
  } catch (error) {
    console.group("Faild to create new user");
  }
};
