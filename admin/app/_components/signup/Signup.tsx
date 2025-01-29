"use client";
import { useSignUpHook } from "@/app/_hooks/signup/signup.hook";
import { sigUpType } from "@/app/_types/signup.type";
import Link from "next/link";

import React from "react";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const { mutate, isPeding } = useSignUpHook();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: sigUpType) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(
          "Your account is created successfully. Log in and start your journey",
          {
            position: "top-center",
          },
        );
        reset();
      },
      onError: (error) => {
        toast.error(`${error?.response?.data?.response}`, {
          autoClose: 9000,
          position: "top-center",
        });
      },
    });
  };

  return (
    <>
      <ToastContainer />

      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-10 lg:px-32">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="hidden md:flex md:w-1/2 bg-blue-500 flex-col justify-center items-center text-white p-6">
            <h1 className="text-4xl font-bold mb-4 text-center">
              Start Your Journey
            </h1>
            <p className="text-lg text-center">
              Join us and experience the best services at your fingertips.
            </p>
          </div>

          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
              Sign Up
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm md:text-base font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <span className="text-red-600 text-sm">
                    First Name is required
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm md:text-base font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <span className="text-red-600 text-sm">
                    Last Name is required
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm md:text-base font-medium">
                  Aadhar Number
                </label>
                <input
                  type="number"
                  placeholder="Enter your Aadhar number"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("aadharNumber", { required: true })}
                />
                {errors.aadharNumber && (
                  <span className="text-red-600 text-sm">
                    Aadhar Number is required
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm md:text-base font-medium">
                  Contact Number
                </label>
                <input
                  type="number"
                  placeholder="Enter your contact number"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("contact", { required: true })}
                />
                {errors.contact && (
                  <span className="text-red-600 text-sm">
                    Contact Number is required
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm md:text-base font-medium">
                  Alternate Number
                </label>
                <input
                  type="number"
                  placeholder="Enter your contact number"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("alternateContact")}
                />
              </div>

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
              >
                {isPeding ? "Submitting" : "Submit"}
              </button>

              <p className="text-center text-sm md:text-lg">
                Already have an account?
                <Link href="/">
                  <span className="text-blue-500 font-medium hover:underline px-2">
                    Log in here
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

export default Signup;
