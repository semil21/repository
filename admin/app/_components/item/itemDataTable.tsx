"use client";
import React, { useState } from "react";
import AddItemModal from "./addItemModal";
import {
  useAllitemshook,
  useItemStatusUpdateHook,
} from "@/app/_hooks/item/item.hook";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { itemTypes } from "@/app/_types/item.type";

import { useQueryClient } from "@tanstack/react-query";

const ItemDataTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<itemTypes>({});

  const { data, error } = useAllitemshook();

  const updateItemStatus = useItemStatusUpdateHook();

  const queryClient = useQueryClient();
  const handleStatusUpdate = async (_id: string, status: boolean) => {
    const data = { _id: _id, status };

    if (data) {
      updateItemStatus.mutate(data, {
        onSuccess: () => {
          toast.success("Item status updated successfully");
          queryClient.setQueryData(["all-items"], (oldItems: itemTypes[]) => {
            return oldItems.map((item) => {
              if (item._id === _id) {
                return { ...item, status: !status };
              }
              return item;
            });
          });
        },
        onError: () => {
          toast.error("Failed to update item status");
        },
      });
    }
  };

  const closeModal = (status: boolean) => {
    setOpenModal(status);
    setEditData({});
  };

  return (
    <>
      <ToastContainer />

      <div className="w-full  flex flex-col-reverse gap-3 md:flex-row    justify-between items-center mb-3 mt-1 ">
        <div className="w-full max-w-sm min-w-[200px] relative">
          <div className="relative">
            <input
              className="bg-white w-full pr-11 h-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-[2px] border-black rounded transition duration-300 ease focus:outline-none hover:border-blue-600 shadow-sm focus:shadow-md px-2"
              placeholder="Search Category..."
            />
            <button
              className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
                className="w-8 h-8 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <AddItemModal
            openModal={openModal}
            closeModal={closeModal}
            editData={editData}
          />
        </div>
      </div>

      <div className="relative w-full h-full overflow-x-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full  text-left table-auto">
          <thead>
            <tr>
              <th className="w-[400px] p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-medium leading-none text-slate-500">
                  Name
                </p>
              </th>
              <th className="w-[300px] p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-medium  leading-none text-slate-500">
                  Category
                </p>
              </th>
              <th className="w-[300px] p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-medium  leading-none text-slate-500">
                  Restaurant
                </p>
              </th>
              <th className="w-[300px] p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-medium  leading-none text-slate-500">
                  Price
                </p>
              </th>
              <th className="w-[300px] p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-medium  leading-none text-slate-500">
                  Quantity
                </p>
              </th>
              <th className="w-[300px] p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-medium  leading-none text-slate-500">
                  Status
                </p>
              </th>
              <th className="w-[300px] p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-medium  leading-none text-slate-500">
                  Action
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <p>Failed to get All Categories</p>
            ) : (
              data &&
              data?.map((item: itemTypes, index: number) => (
                <tr
                  key={index}
                  className={`hover:bg-green-100
                      ${index % 2 === 0 ? "bg-blue-50" : "bg-white"}
                              `}
                >
                  <td className=" p-4 border-b  py-5   ">
                    <p className=" w-[400px] text-sm font-medium text-slate-3 500 ">
                      {item?.name}
                    </p>
                  </td>
                  <td className=" p-4 border-b  py-5   ">
                    <p className=" w-[300px] text-sm font-medium text-slate-3 500 ">
                      {item?.category?.name}
                    </p>
                  </td>
                  <td className=" p-4 border-b  py-5   ">
                    <p className=" w-[300px] text-sm font-medium text-slate-3 500 ">
                      {item?.restaurant?.name}
                    </p>
                  </td>
                  <td className=" p-4 border-b  py-5   ">
                    <p className=" w-[150px] text-sm font-medium text-slate-3 500 ">
                      {item?.price}
                    </p>
                  </td>
                  <td className=" p-4 border-b  py-5   ">
                    <p className=" w-[150px] text-sm font-medium text-slate-3 500 ">
                      {item?.quantity}
                    </p>
                  </td>
                  <td className="w-[150px] p-4 border-b border-slate-200 py-5">
                    <p className="text-sm font-medium text-slate-3 500">
                      <button
                        className="bg-white border-[1px] w-[80px] rounded-md border-black text-white font-bold py-2 px-4 "
                        onClick={() =>
                          handleStatusUpdate(item?._id, item?.status)
                        }
                      >
                        {item?.status ? (
                          <span className="text-green-600 font-semibold">
                            Active
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            Inactive
                          </span>
                        )}
                      </button>
                    </p>
                  </td>
                  <td className="w-[200px] p-4 border-b border-slate-200 py-5">
                    <p className="text-sm font-medium text-slate-3 500 ">
                      <button
                        className="border-[1px] w-[80px] rounded-md border-black font-bold py-2 px-4 bg-blue-500 text-white hover:bg-blue-700"
                        onClick={() => {
                          setOpenModal(true);
                          setEditData(item);
                        }}
                      >
                        <span>Update</span>
                      </button>
                    </p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemDataTable;
