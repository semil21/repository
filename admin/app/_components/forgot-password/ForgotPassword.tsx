"use client";
import Link from "next/link";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const [hasOtp, setHasOtp] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (email: string) => {
    console.log("email", email);
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-10 lg:px-32">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="hidden md:flex md:w-1/2 bg-blue-600 flex-col justify-center items-center text-white p-6">
            <h1 className="text-4xl font-bold mb-4 text-center">
              Forgot Your Password ?
            </h1>
            <p className="text-lg text-center">
              Reset it easily, and get your work going on.
            </p>
          </div>

          {!hasOtp ? (
            <div className="w-full md:w-1/2 p-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
                Reset Password
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

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md text-lg hover:bg-blue-600 transition duration-300"
                >
                  Submit
                </button>

                <p
                  className="text-center text-sm md:text-lg"
                  onClick={() => setHasOtp(true)}
                >
                  Already have OTP ?
                  <span className="text-blue-500 font-medium hover:underline px-2">
                    Reset your password
                  </span>
                </p>

                <p className="text-center text-sm md:text-lg">
                  <Link href="/">
                    Remember your password ?
                    <span className="text-blue-500 font-medium hover:underline px-2">
                      Log in here
                    </span>
                  </Link>
                </p>
              </form>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex mx-5 justify-center items-center">
                <input className="border-2 w-[5rem] bg-red-300 h-14" />
                <input className="border-2 w-[5rem] bg-yellow-300" />
                <input className="border-2 w-[5rem] bg-green-300" />
                <input className="border-2 w-[5rem] bg-black" />
              </div>
              <p className="text-center text-sm md:text-lg">
                Don't have OTP ?
                <span
                  className="text-blue-500 font-medium hover:underline px-2"
                  onClick={() => setHasOtp(false)}
                >
                  Get new OTP
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
