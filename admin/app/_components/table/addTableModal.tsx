"use client";
import { useAddNewTableHook } from "@/app/_hooks/table/table.hook";
import { addNewTable } from "@/app/_types/table.type";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

type addTableProps = {
  restaurantId?: string;
};

const AddTableModal = (props: addTableProps) => {
  const { restaurantId } = props;
  const [modalVisible, setModalVisible] = useState(false);

  console.log("restaurantId", restaurantId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutateNewTable = useAddNewTableHook();

  const onSubmit = (data: addNewTable) => {
    data.restaurant = restaurantId;

    mutateNewTable.mutate(data, {
      onSuccess: () => {
        reset();
        toast.success("Table added successfully");
        setModalVisible(false);
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
        });
      },
    });
  };
  return (
    <>
      <ToastContainer />
      <div className="flex  justify-center md:justify-end lg:justify-end">
        <button
          className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          type="button"
          onClick={() => setModalVisible(!modalVisible)}
        >
          Add New
        </button>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 text-center ">
                Add New Table
              </h3>
              <button
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setModalVisible(false)}
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
                    Table Number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="number"
                    placeholder="Enter table number"
                    {...register("number", { required: true })}
                  />
                  {errors.number && (
                    <p className="text-red-500 text-xs mt-1">
                      Table number is required
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Table Capacity
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="number"
                    placeholder="Enter table capacity"
                    {...register("capacity", { required: true })}
                  />
                  {errors.capacity && (
                    <p className="text-red-500 text-xs mt-1">
                      Table Capacity is required
                    </p>
                  )}
                </div>

                <div className="flex justify-center">
                  <button
                    className="text-white bg-blue-700 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:focus:ring-blue-800"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            <div className="flex justify-end items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                className="text-white bg-blue-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:focus:ring-blue-800"
                onClick={() => setModalVisible(false)}
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

export default AddTableModal;
