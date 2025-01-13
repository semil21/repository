"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { loginType } from "../../_types/login.types";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: loginType) => console.log(data);
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen justify-center items-center px-4 sm:px-10 lg:px-60">
        <div className="hidden md:flex bg-red-500 w-full md:w-1/2 lg:w-2/5">
          <Image
            src="/home-banner.jpg"
            height={500}
            width={650}
            alt="Banner Image"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-1/2 lg:w-2.5/5 flex flex-col gap-5 px-6 py-8 md:p-10 bg-white rounded-md shadow-md">
          <div className="flex flex-col gap-8 justify-around">
            <h2 className="text-center text-3xl md:text-4xl font-semibold">
              Welcome Back
            </h2>

            <div className="flex flex-col gap-3">
              <label className="text-lg md:text-xl font-medium">Email:</label>
              <input
                placeholder="Enter your email"
                type="email"
                className="px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-600 text-xl font-normal">
                  Email is required
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-lg md:text-xl font-medium">
                Password:
              </label>
              <input
                placeholder="Enter your password"
                type="password"
                className="px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-600 text-xl font-normal">
                  Password is required
                </span>
              )}
            </div>

            <div className="flex justify-center">
              <button
                className="bg-gray-800 rounded-md text-lg md:text-xl text-white w-full md:w-1/2 py-2"
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </button>
            </div>

            <div className="text-lg md:text-xl text-center">
              Don’t have an account?
              <Link href="/signup">
                <span className="text-blue-500 font-medium px-2 cursor-pointer">
                  Sign up here
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
