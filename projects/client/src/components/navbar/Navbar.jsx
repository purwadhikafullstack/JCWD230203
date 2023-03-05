import React, { useEffect, useState } from "react";
import logo from "../../supports/assets/logo.png";
import Location from "./location";
import Date from "./date";
import { FiMenu, FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineHomeWork } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";

const Navbar = (props) => {
  const location = useLocation();
  const { id } = useParams();

  return (
    <>
      {location.pathname === "/dashboard" ||
      location.pathname === "/dashboard-register" ||
      location.pathname === `/tenant-activation/${id}` ? null : (
        <div className="flex justify-between items-center ml-2 mr-2 border-b ">
          {/* Left */}
          <Link to="/" className="hidden md:flex ">
            <div className=" my-5 h-10 md:flex pl-3">
              <img src={logo} className="object-cover my-1" alt="" />
            </div>
          </Link>

          {/* Middle */}
          

          {/* Right */}
          <div className="flex items-center pr-3 font-semibold text-gray-600">
            <div className="flex rounded-full px-4 py-2 hover:bg-[#c7c7c743] duration-100 ease-out">
            <Link to="/dashboard" className="hidden md:flex ">
              <p className="items-center mx-1 gap-1 text-[14px] font-semibold">
                Vcation your
              </p>
              <MdOutlineHomeWork className="text-[22px]" />
              </Link>
            </div>

            {/* button */}
            <button
              className="mr-1.5 bg-[#c9403e] inline-block rounded-full shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  "
              type="button"
              data-te-offcanvas-toggle
              data-te-target="#Menu"
              aria-controls="offcanvasRight"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <div className="flex items-center border px-4 py-2 rounded-full gap-3 bg-[#c9403e] text-white font-bold shadow-sm shadow-gray-300 hover:bg-[#e58786] duration-100 ease-out">
                {props.data.username ? (
                  <div className="font-bold">
                    {localStorage.getItem("token") ||
                    localStorage.getItem("tokenUid")
                      ? props.data.username
                      : null}
                  </div>
                ) : (
                  <AiOutlineUser className="text-[22px]" />
                )}
                <FiMenu className="text-[22px]" />
              </div>
            </button>

            <div
              className="invisible fixed bottom-0 top-0 right-0 z-[1045] flex w-96 max-w-full translate-x-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out lg:dark:bg-neutral-800 lg:dark:text-neutral-200 [&[data-te-offcanvas-show]]:transform-none"
              tabindex="-1"
              id="Menu"
              aria-labelledby="offcanvasRightLabel"
              data-te-offcanvas-init
            >
              <div className="flex items-center justify-between p-4">
                <h5
                  className="mb-0 font-semibold leading-normal"
                  id="offcanvasRightLabel"
                >
                  Menu
                </h5>
                <button
                  type="button"
                  className="box-content rounded-none border-none opacity-50 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-offcanvas-dismiss
                >
                  <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
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
              <div className="offcanvas-body flex-grow overflow-y-auto p-4">
                {localStorage.getItem('token') ? 
                <>
                <div className="login mb-5 hover:shadow-lg pointer">
                  <Link to="/user-profile"> Profile </Link>
                </div>
                </>
                :
                <>
                <div className="login mb-5 hover:shadow-lg pointer">
                  <Link to="/login"> Login </Link>
                </div>
                <div className="signup hover:shadow-lg">
                  <div className="login mb-3 hover:shadow-lg pointer">
                    <Link to="/register"> Sign Up </Link>
                  </div>
                </div>
                </>}

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
      )}
    </>
  );
};

export default Navbar;
