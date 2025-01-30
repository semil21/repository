"use client";

import { useAddRestaurantHook } from "@/app/_hooks/restaurant/restaurant.hook";
import { restaurantType } from "@/app/_types/restaurant.type";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddrestaurantModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useAddRestaurantHook();

  const onsubmit = async (data: restaurantType) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Restaurant Added Successfully", {
          position: "top-center",
        });
        setIsOpen(false);
        reset();
      },
    });
  };

  return (
    <>
      <ToastContainer />

      <div className="flex justify-center ">
        <button
          onClick={() => setIsOpen(true)}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Restaurant
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 text-center ">
                Add New Restaurant
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="w-full ">
              <form className="bg-white shadow-md rounded  w-full px-6 py-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Restaurant Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Enter Restaurant Name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-600 text-sm">
                      Restaurant name is required
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Restaurant Contact
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="number"
                    placeholder="enter restaurant contact number"
                    {...register("contact", { required: true })}
                  />
                  {errors.contact && (
                    <span className="text-red-600 text-sm">
                      Contact Number is required
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Alternate Restaurant Contact
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="number"
                    {...register("alternateContact")}
                    placeholder="enter alternate restaurant contact or landine number"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Restaurant Address
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    {...register("address", { required: true })}
                    cols={30}
                    rows={3}
                    placeholder="enter block number and landmark of restaurant"
                  />
                  {errors.address && (
                    <span className="text-red-600 text-sm">
                      Address is required
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Restaurant City
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    {...register("city", { required: true })}
                    placeholder="enter city name where restaurant is situated"
                  />
                  {errors.city && (
                    <span className="text-red-600 text-sm">
                      City is required
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Restaurant State
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    {...register("state", { required: true })}
                    placeholder="enter city state where restaurant is situated"
                  />
                  {errors.state && (
                    <span className="text-red-600 text-sm">
                      State is required
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Restaurant Country
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    {...register("country", { required: true })}
                    placeholder="enter city state where restaurant is situated"
                    defaultValue={"India"}
                  />
                  {errors.country && (
                    <span className="text-red-600 text-sm">
                      Country is required
                    </span>
                  )}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleSubmit(onsubmit)}
                    className="text-white bg-blue-700 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:focus:ring-blue-800"
                  >
                    {isPending ? "Submitting" : "Submit"}
                  </button>
                </div>
              </form>
            </div>

            <div className="flex justify-end items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white bg-blue-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:focus:ring-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AddrestaurantModal;
