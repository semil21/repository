import React from "react";
import AddrestaurantModal from "../restaurant/addRestaurantModal";
import AddCategoryModal from "./addCategoryModal";

const CategoryDataTable = () => {
  return (
    <>
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
          <AddCategoryModal />
        </div>
      </div>

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
                  Status
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              className={`hover:bg-green-100
                          bg-blue-50
                        `}
            >
              <td className="w-[200px] p-4 border-b border-slate-200 py-5">
                <p className="text-sm font-medium text-slate-3 500 ">Name</p>
              </td>
              <td className="w-[150px] p-4 border-b border-slate-200 py-5">
                <p className="text-sm font-medium text-slate-3 500">
                  Active : Inactive
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoryDataTable;
