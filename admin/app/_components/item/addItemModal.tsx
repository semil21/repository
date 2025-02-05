"use client";
import { useGetAllCategoriesHook } from "@/app/_hooks/category/category.hook";
import { useAddItemHook } from "@/app/_hooks/item/item.hook";
import { useGetAllRestaurantHooke } from "@/app/_hooks/restaurant/restaurant.hook";
import { categoryType } from "@/app/_types/category.type";
import { itemType, itemTypes } from "@/app/_types/item.type";
import { restaurantType } from "@/app/_types/restaurant.type";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQueryClient } from "@tanstack/react-query";

type addItemModalType = {
  openModal?: boolean;
  closeModal?: (value: boolean) => void;
  editData?: itemTypes;
};

const AddItemModal = (props: addItemModalType) => {
  const [showModal, setShowModal] = useState(false);

  const { openModal, closeModal, editData } = props;

  const { data: categories } = useGetAllCategoriesHook();
  const { data: restaurants } = useGetAllRestaurantHooke();

  const addItemMutation = useAddItemHook();
  const queryCLient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: itemType) => {
    addItemMutation.mutate(data, {
      onSuccess: (newItemData) => {
        toast.success("Item added successfully");
        queryCLient.setQueryData(["all-items"], (oldItems: itemType[]) => {
          return [...oldItems, newItemData];
        });
        reset();
        setShowModal(false);
      },

      onError: () => {
        toast.error("Failed to add new item");
      },
    });
  };

  const onUpdate = () => {};

  return (
    <>
      <ToastContainer />

      <div className="flex justify-center ">
        <button
          onClick={() => setShowModal(true)}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Restaurant
        </button>
      </div>

      {(showModal || openModal) && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 text-center ">
                Add New Category
              </h3>
              <button
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  setShowModal(false);
                  reset();
                  closeModal(false);
                }}
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
                    Select Restaurant
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="category"
                    {...register("restaurant", { required: true })}
                  >
                    {restaurants &&
                      restaurants
                        ?.filter(
                          (item: restaurantType) => item?.status === true,
                        )
                        .map((item: restaurantType, index: number) => (
                          <option value={item?._id} key={index}>
                            {item?.name}
                          </option>
                        ))}
                  </select>
                  {errors.restaurant && (
                    <span className="text-red-600 text-sm">
                      Select a restaurant
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Select Category
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="category"
                    {...register("category", { required: true })}
                  >
                    {categories &&
                      categories
                        .filter((item: categoryType) => item.status === true)
                        .map((item: categoryType, index: number) => (
                          <option value={item._id} key={index}>
                            {item.name}
                          </option>
                        ))}
                  </select>
                  {errors.category && (
                    <span className="text-red-600 text-sm">
                      Select a category
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Item Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Enter Item Name"
                    {...register("name", { required: true })}
                    defaultValue={openModal ? editData?.name : ""}
                  />
                  {errors.name && (
                    <span className="text-red-600 text-sm">
                      Item name is required.
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Item Price
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="number"
                    placeholder="Enter Item Price"
                    {...register("price", { required: true })}
                    defaultValue={openModal ? editData?.price : ""}
                  />
                  {errors.price && (
                    <span className="text-red-600 text-sm">
                      Item price is required.
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Item Quantity
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Enter item quantity i.e 400 g , 1 litre etc"
                    {...register("quantity", { required: true })}
                    defaultValue={openModal ? editData?.quantity : ""}
                  />
                  {errors.quantity && (
                    <span className="text-red-600 text-sm">
                      Item quantity is required.
                    </span>
                  )}
                </div>

                <div className="flex justify-center">
                  {openModal ? (
                    <button
                      className="text-white bg-blue-700 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:focus:ring-blue-800"
                      onClick={handleSubmit(onUpdate)}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="text-white bg-blue-700 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:focus:ring-blue-800"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="flex justify-end items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                className="text-white bg-blue-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:focus:ring-blue-800"
                onClick={() => {
                  setShowModal(false);
                  reset();
                  closeModal(false);
                }}
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

export default AddItemModal;
