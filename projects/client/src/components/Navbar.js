import React from "react";
import logo from "../assets/logo.png";
import { FiMenu, FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineHomeWork } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="border-b sticky top-0 z-50 bg-white/[95%]">
      <div className="flex justify-between items-center sm:mx-6 md:mx-10 lg:mx-12">
        {/* Left */}
        <div className="flex h-10 my-5 pl-3">
          <img src={logo} className="object-cover my-1" />
        </div>

        {/* Middle */}
        <div className="hidden lg:flex justify-center items-center relative shadow-sm shadow-gray-400 border rounded-full ">
          <input
            type="Search"
            placeholder=""
            className="py-2.5 w-[20rem] rounded-full outline-0 "
          />
          <div className="flex justify-between absolute w-full pr-16 pl-6 font-semibold text-gray-600">
            <button className="w-full">Place</button>
            <button className="border-l border-x px-6">Time</button>
            <button className="w-full text-gray-400/80 pl-2">Group Size</button>
          </div>
          <div className="rounded-full mr-2 p-2 bg-[#c9403e]">
            <FiSearch className="text-white w-full" />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center pr-3 font-semibold text-gray-600">
          <div className="flex rounded-full px-4 py-2 hover:bg-[#c7c7c743] duration-100 ease-out">
            <p className="flex items-center mx-1 gap-1 text-[14px] font-semibold">Vcation your</p>
            <MdOutlineHomeWork className="text-[22px]" />
          </div>

          <div className="flex items-center border px-3 py-2 rounded-full gap-1 bg-[#c9403e] text-white font-bold shadow-sm shadow-gray-300 hover:bg-[#e58786] duration-100 ease-out">
            <AiOutlineUser className="text-[22px]" />
            <FiMenu className="text-[22px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
