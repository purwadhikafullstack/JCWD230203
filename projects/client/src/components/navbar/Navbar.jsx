import React, { useState } from "react";
import logo from "../../supports/assets/logo.png";
import { FiMenu, FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineHomeWork } from "react-icons/md";
import { Link } from "react-router-dom";




const Navbar = (props) => {
  

  return (
    <div className="flex justify-between items-center ml-2 mr-2 border-b">
      {/* Left */}
      <Link to="/">
        <div className="my-5 h-10 flex pl-3">
          <img src={logo} className="object-cover my-1" alt="" />
        </div>
      </Link>

      {/* Middle */}
      <div className="flex justify-center items-center relative shadow-sm shadow-gray-300 border rounded-full ">
        <input
          type="Search"
          placeholder=""
          className="py-2.5 w-[20rem] rounded-full outline-0 "
        />
        <div className="flex justify-between absolute w-full pr-16 pl-6 font-semibold text-gray-600">
          <button className="w-full">Place</button>
          <button className="border-x px-6">
              Time  
          </button>
          <button className="w-full text-gray-400/80 pl-2">Group Size</button>
        </div>
        <div className="flex bg-[#c9403e] p-2 rounded-full mr-2 hover:bg-[#e58786] duration-100 ease-out">
          <FiSearch className="text-white" />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center pr-3 font-semibold text-gray-600">
        <div className="flex rounded-full px-4 py-2 hover:bg-[#c7c7c743] duration-100 ease-out">
          <p className="flex items-center mx-1 gap-1 text-[14px] font-semibold">
            Vcation your
          </p>
          <MdOutlineHomeWork className="text-[22px]" />
        </div>

        {/* button */}
        <button
          class="mr-1.5 bg-[#c9403e] inline-block rounded-full shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  "
          type="button"
          data-te-offcanvas-toggle
          data-te-target="#Menu"
          aria-controls="offcanvasRight"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <div className="flex items-center border px-4 py-2 rounded-full gap-3 bg-[#c9403e] text-white font-bold shadow-sm shadow-gray-300 hover:bg-[#e58786] duration-100 ease-out">
            {props.data.username ? (
              <div className="font-bold">{props.data.username}</div>
            ) : (
              <AiOutlineUser className="text-[22px]" />
            )}
            <FiMenu className="text-[22px]" />
          </div>
        </button>

        <div
          class="invisible fixed bottom-0 top-0 right-0 z-[1045] flex w-96 max-w-full translate-x-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out lg:dark:bg-neutral-800 lg:dark:text-neutral-200 [&[data-te-offcanvas-show]]:transform-none"
          tabindex="-1"
          id="Menu"
          aria-labelledby="offcanvasRightLabel"
          data-te-offcanvas-init
        >
          <div class="flex items-center justify-between p-4">
            <h5
              class="mb-0 font-semibold leading-normal"
              id="offcanvasRightLabel"
            >
              Menu
            </h5>
            <button
              type="button"
              class="box-content rounded-none border-none opacity-50 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-te-offcanvas-dismiss
            >
              <span class="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>
          </div>
          <div class="offcanvas-body flex-grow overflow-y-auto p-4">
            <div className="login mb-5 hover:shadow-lg pointer">
              <Link to="/login"> Login </Link>
            </div>
            <div className="signup hover:shadow-lg">
              <div className="login mb-3 hover:shadow-lg pointer">
                <Link to="/register"> Sign Up </Link>
              </div>
            </div>

            {/* bottom */}
            <div
              className="signout"
              style={{ position: "absolute", bottom: 0 }}
            >
              <button
                className="hover:shadow-lg pointer"
                onClick={props.myFunc.onLogout}
              >
                {localStorage.getItem("token") ||
                localStorage.getItem("tokenUid")
                  ? "Sign Out"
                  : null}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
