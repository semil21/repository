"use client";
import {
  useAddCategryHook,
  useUpdateCategoryHoook,
} from "@/app/_hooks/category/category.hook";
import { categoryType } from "@/app/_types/category.type";
import React, { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type categoryModalType = {
  isEditModalOpen?: boolean;
  closeEditModal?: (value: boolean) => void;
  editData?: categoryType;
};
const AddCategoryModal = (props: categoryModalType) => {
  const { isEditModalOpen, closeEditModal, editData } = props;

  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const queryClient = useQueryClient();
  const { mutate } = useAddCategryHook();
  const updateMutation = useUpdateCategoryHoook();

  const onSubmit = async (data: categoryType) => {
    mutate(data, {
      onSuccess: (newCateogoryData) => {
        toast.success("Category added successfully.", {
          position: "top-center",
        });
        reset();
        setIsOpen(false);
        queryClient.setQueryData(
          ["all-categories"],
          (oldCategoryData: categoryType[]) => {
            return [...oldCategoryData, newCateogoryData];
          },
        );
      },
      onError: () => {
        toast.error("Failed to add new category");
      },
    });
  };

  const onUpdate = (data: categoryType) => {
    data._id = editData?._id;
    updateMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Category Upated successfully");
        closeEditModal?.(false);
        reset();
        queryClient.setQueryData(
          ["all-categories"],
          (oldCategoryData: categoryType[]) => {
            return oldCategoryData.map((category) => {
              if (category?._id === data?._id) {
                return data;
              }
              return category;
            });
          },
        );
      },
      onError: () => {
        toast.error("Failed to update category record");
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

      {(isOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 text-center ">
                Add New Category
              </h3>
              <button
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  setIsOpen(false);
                  closeEditModal?.(false);
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
                    Category Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Enter Category Name"
                    {...register("name", { required: true })}
                    defaultValue={isEditModalOpen ? editData?.name : ""}
                  />
                  {errors.name && (
                    <span className="text-red-600 text-sm">
                      Category name is required
                    </span>
                  )}
                </div>

                <div className="flex justify-center">
                  {!isEditModalOpen ? (
                    <button
                      className="text-white bg-blue-700 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:focus:ring-blue-800"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      className="text-white bg-blue-700 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:focus:ring-blue-800"
                      onClick={handleSubmit(onUpdate)}
                    >
                      Update
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="flex justify-end items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                className="text-white bg-blue-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:focus:ring-blue-800"
                onClick={() => {
                  setIsOpen(false);
                  closeEditModal?.(false);
                  reset();
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

export default AddCategoryModal;
