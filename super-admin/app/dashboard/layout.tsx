"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { HiOutlineHome } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaHotel } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineLogin } from "react-icons/md";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const router = useRouter();
  const handleLogOut = async () => {
    sessionStorage.removeItem("session_id");
    router.push("/");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`fixed z-30 inset-y-0 left-0 transform bg-[#f9f7f7] border-r-[.3rem] border-black text-black w-64 p-4 transition-transform duration-300 ease-in-out
  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}
      >
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        {/* Add flex-grow here to push the logout button down */}
        <nav className="space-y-4 flex-grow">
          <ul>
            <Link href="/dashboard">
              <li className="flex items-center gap-3 text-black hover:bg-blue-600 hover:text-white p-2">
                <HiOutlineHome className="text-2xl" />
                <span className="block text-xl font-bold">Home</span>
              </li>
            </Link>
            <Link href="/dashboard/admin">
              <li className="flex items-center gap-3 text-black hover:bg-blue-600 hover:text-white p-2">
                <GrUserAdmin className="text-2xl" />
                <span className="block text-xl font-bold">Admin</span>
              </li>
            </Link>
            <Link href="/dashboard/restaurant">
              <li className="flex items-center gap-3 text-black hover:bg-blue-600 hover:text-white p-2">
                <FaHotel className="text-2xl" />
                <span className="block text-xl font-bold">Restaurant</span>
              </li>
            </Link>
            <Link href="/dashboard/category">
              <li className="flex items-center gap-3 text-black hover:bg-blue-600 hover:text-white p-2">
                <BiCategory className="text-2xl" />
                <span className="block text-xl font-bold">Category</span>
              </li>
            </Link>
            <Link href="/dashboard/item">
              <li className="flex items-center gap-3 text-black hover:bg-blue-600 hover:text-white p-2">
                <IoFastFoodOutline className="text-2xl" />
                <span className="block text-xl font-bold">Item</span>
              </li>
            </Link>
          </ul>
        </nav>

        <div className="flex gap-3 mt-auto" onClick={() => handleLogOut()}>
          <div className="text-red-500 font-medium">Log out</div>
          <MdOutlineLogin className="text-2xl text-red-500 font-medium" />
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <main className="flex-1 lg:ml-2 bg-gray-100 p-6 overflow-y-auto">
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-600 bg-gray-200 rounded-md lg:hidden"
        >
          {isSidebarOpen ? "Close" : "Menu"}
        </button>
        {children}
      </main>
    </div>
  );
}
