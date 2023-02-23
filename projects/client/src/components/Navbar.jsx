import React from "react";
import logo from "../assets/logo.png";
import { FiMenu, FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineHomeWork } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center ml-2 mr-2 border-b">
      {/* Left */}
      <div className="my-5 h-10 flex pl-3">
        <img src={logo} className="object-cover my-1" />
      </div>
      {/* Middle */}
      <div className="flex justify-center items-center relative shadow-sm shadow-gray-300 border rounded-full ">
        <input
          type="Search"
          placeholder=""
          className="py-2.5 w-[20rem] rounded-full outline-0 "
        />
        <div className="flex justify-between absolute w-full pr-16 pl-6 font-semibold text-gray-600">
          <button className="w-full">Place</button>
          <button className="border-x px-6">Time</button>
          <button className="w-full text-gray-400/80 pl-2">Group Size</button>
        </div>
        <div className="flex bg-[#c9403e] p-2 rounded-full mr-2 hover:bg-[#e58786] duration-100 ease-out">
          <FiSearch className="text-white" />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center pr-3 font-semibold text-gray-600">
        <div className="">
          <p className="text-[14px] pr-3">Vcation your</p>
          <MdOutlineHomeWork className="text-[22px]"/>
        </div>

        <div className="flex items-center border px-4 py-2 rounded-full gap-3 bg-[#c9403e] text-white font-bold shadow-sm shadow-gray-300 hover:bg-[#e58786] duration-100 ease-out">
          <AiOutlineUser className="text-[22px]" />
          <FiMenu className="text-[22px]" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
