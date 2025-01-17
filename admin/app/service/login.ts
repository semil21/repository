import { loginType } from "../_types/login.types";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export const loginService = async (data: loginType) => {
  try {
    const login = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URL}/owner/login`,
      data,
    );

    console.log("lkjh", login);

    window.sessionStorage.setItem("token", login.data.token);

    toast.success(`Welcome Back !`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } catch (error: any) {
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
