"use client";
import React, { useState } from "react";
import AddrestaurantModal from "./addRestaurantModal";
import {
  useGetAllRestaurantHooke,
  useUpdateRestaurantStatusHook,
} from "@/app/_hooks/restaurant/restaurant.hook";
import { restaurantType } from "@/app/_types/restaurant.type";
import { FaEdit } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

const RestaurantDataTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editRestaurantData, setEditRestaurantData] = useState({});

  const { data, isLoading } = useGetAllRestaurantHooke();

  const queryCLient = useQueryClient();

  const filteredData = data?.filter(
    (item: restaurantType) =>
      item?.name
        ?.toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()) ||
      item?.address
        ?.toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()) ||
      item?.city
        ?.toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()) ||
      item?.email
        ?.toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()) ||
      item?.state
        ?.toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()),
  );

  const closeModal = () => {
    setShowModal(false);
  };

  const { mutate } = useUpdateRestaurantStatusHook();

  const handleStatusUpdate = async (_id?: string, status?: boolean) => {
    const data = { _id, status };
    mutate(data, {
      onSuccess: () => {
        console.log("status updated successfully");

        queryCLient.setQueryData(
          ["all-restaurants"],
          (oldRestaurantData: restaurantType[]) => {
            return oldRestaurantData?.map((restaurant) =>
              restaurant._id === _id
                ? { ...restaurant, status: !status }
                : restaurant,
            );
          },
        );
      },
    });
  };

  return (
    <>
      <div className="w-full  flex flex-col-reverse gap-3 md:flex-row    justify-between items-center mb-3 mt-1 ">
        <div className="w-full max-w-sm min-w-[200px] relative">
          <div className="relative">
            <input
              className="bg-white w-full pr-11 h-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-[2px] border-black rounded transition duration-300 ease focus:outline-none hover:border-blue-600 shadow-sm focus:shadow-md px-2"
              placeholder="Search Restaurant..."
              onChange={(e) => setSearchQuery(e.target.value)}
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
          <AddrestaurantModal
            openModal={showModal}
            editRestaurantData={editRestaurantData}
            closeModal={closeModal}
          />
        </div>
      </div>

      {!isLoading ? (
        <div className="relative w-full h-full overflow-x-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full  text-left table-auto">
            <thead>
              <tr>
                <th className="w-[800px] p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-medium leading-none text-slate-500">
                    Name
                  </p>
                </th>
                <th className="w-[300px] p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-medium  leading-none text-slate-500">
                    Contact
                  </p>
                </th>
                <th className="w-[300px] p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-medium leading-none text-slate-500">
                    Alternate Contact
                  </p>
                </th>
                <th className="w-[800px] p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-medium leading-none text-slate-500">
                    Email
                  </p>
                </th>
                <th className="w-[800px] p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-medium leading-none text-slate-500">
                    Address
                  </p>
                </th>
                <th className="w-[600px] p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-medium leading-none text-slate-500">
                    City
                  </p>
                </th>
                <th className="w-[600px] p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-medium leading-none text-slate-500">
                    State
                  </p>
                </th>
                <th className="w-[800px] p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-medium leading-none text-slate-500">
                    Status
                  </p>
                </th>
                <th className="w-[800px] p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-medium leading-none text-slate-500">
                    Approval Status
                  </p>
                </th>
                <th className="w-[800px] p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-medium leading-none text-slate-500">
                    Edit
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData?.map((item: restaurantType, index: number) => (
                  <tr
                    className={`hover:bg-green-100   ${
                      index % 2 === 0 ? "bg-blue-50" : "bg-white"
                    }  `}
                    key={index}
                  >
                    <td className="w-[200px] p-4 border-b border-slate-200 py-5">
                      <p className="text-sm font-medium text-slate-3 500 ">
                        {item?.name}
                      </p>
                    </td>
                    <td className="w-[150px] p-4 border-b border-slate-200 py-5">
                      <p className="text-sm font-medium text-slate-3 500">
                        {item?.contact}
                      </p>
                    </td>
                    <td className="w-[180px] p-4 border-b border-slate-200 py-5">
                      <p className="text-sm font-medium text-slate-3 500">
                        {item?.alternateContact}
                      </p>
                    </td>
                    <td className="w-[250px] p-4 border-b border-slate-200 py-5">
                      <p className="text-sm font-medium text-slate-3 500">
                        {item?.email}
                      </p>
                    </td>
                    <td className="w-[300px] p-4 border-b border-slate-200 py-5">
                      <p className="text-sm font-medium text-slate-3 500">
                        {item?.address}
                      </p>
                    </td>
                    <td className="w-[180px] p-4 border-b border-slate-200 py-5">
                      <p className="text-sm font-medium text-slate-3 500">
                        {item?.city}
                      </p>
                    </td>
                    <td className="w-[180px] p-4 border-b border-slate-200 py-5">
                      <p className="text-sm font-medium text-slate-3 500">
                        {item?.state}
                      </p>
                    </td>
                    <td className="w-[120px] p-4 border-b border-slate-200 py-5">
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
                    <td className="w-[180px] p-4 border-b border-slate-200 py-5">
                      <p className="text-sm font-medium text-slate-3 500">
                        {item?.isApproved ? (
                          <span className="text-green-600 font-semibold">
                            Active
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            Inactive
                          </span>
                        )}
                      </p>
                    </td>
                    <td className="w-[180px] p-4 border-b border-slate-200 py-5">
                      <p className="text-sm font-medium text-slate-3 500  ">
                        <FaEdit
                          className="h-5 w-5 "
                          onClick={() => {
                            setShowModal(true);
                            setEditRestaurantData(item);
                          }}
                        />
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div role="status" className="flex justify-center items-center h-full">
          <svg
            aria-hidden="true"
            className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
};

export default RestaurantDataTable;
