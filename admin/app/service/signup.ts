import { sigUpType } from "../_types/signup.type";
import axios from "axios";
import { toast } from "react-toastify";

export const sigUpService = async (data: sigUpType) => {
  try {
    const signUp = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL}/owner/create`,
      data,
    );
  } catch (error: any) {
    console.log("asdf456", error);
    toast.error(`${error?.response?.data?.response}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
