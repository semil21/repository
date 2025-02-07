"use client";
import { useFetchAllTablesHook } from "@/app/_hooks/table/table.hook";
import { tableType } from "@/app/_types/table.type";
import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTableModal from "./addTableModal";
const TableDataTable = () => {
  const { data, error } = useFetchAllTablesHook();

  return (
    <>
      <ToastContainer />

      {error && <p>Failed to get tables</p>}

      {data &&
        data.map((item: tableType, index: number) => (
          <div key={index} className="my-5 border-2 p-4 mx-5 ">
            <h1 className="font-bold text-center text-xl">
              {item?.name?.toUpperCase()}
            </h1>

            <h1 className="text-center my-1">
              {item?.address}, {item?.city}
            </h1>

            <AddTableModal />
            <table className="w-full border-collapse border-2 border-black mt-4">
              <thead>
                <tr className="border-b-2 border-black bg-gray-200">
                  <th className="border-r-2 border-black px-4 py-2">
                    Table Number
                  </th>
                  <th className="px-4 py-2">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {item?.tables?.map((table, idx) => (
                  <tr key={idx} className="border-b border-black">
                    <td className="border-r-2 border-black px-4 py-2 text-center">
                      {table?.number}
                    </td>
                    <td className="px-4 py-2 text-center">{table?.capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </>
  );
};

export default TableDataTable;
