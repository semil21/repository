"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginType } from "../../_types/login.type";
import { useRouter } from "next/navigation";
import { useLoginHook } from "@/app/_hooks/login/login.hook";

const Login = () => {
  const router = useRouter();

  const { mutate, isPending } = useLoginHook();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const sessionId = sessionStorage.getItem("session_id");
    if (sessionId) {
      router.push("/dashboard");
    }
  }, [router]);

  const onSubmit = async (data: loginType) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success("Welcome Back.", {
          autoClose: 1500,
          onClose: () => {
            sessionStorage.setItem("session_id", response.token);
            router.push("/dashboard");
          },
        });
      },
      onError: (error) => {
        console.log("err123", error);
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
      },
    });
  };

  return (
    <>
      <ToastContainer />

      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-10 lg:px-32">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="hidden md:flex md:w-1/2 bg-blue-600 flex-col justify-center items-center text-white p-6">
            <h1 className="text-4xl font-bold mb-4 text-center">
              Welcome Back!
            </h1>
            <p className="text-lg text-center">
              Sign in to access your account and explore our services.
            </p>
          </div>

          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
              Log In
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm md:text-base font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600 text-sm">
                    Email is required
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm md:text-base font-medium">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-600 text-sm">
                    Password is required
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md text-lg hover:bg-blue-600 transition duration-300"
                disabled={isPending}
              >
                {isPending ? "Submitting" : "Submit"}
              </button>

              <p className="text-center text-sm md:text-lg">
                <Link href="/forgot-password">
                  <span className="text-blue-500 font-medium hover:underline px-2">
                    Forgot Password ?
                  </span>
                </Link>
              </p>

              <p className="text-center text-sm md:text-lg">
                Don’t have an account?
                <Link href="/signup">
                  <span className="text-blue-500 font-medium hover:underline px-2">
                    Sign up here
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
