import React, {useState, useRef} from "react";
import { createPopper } from "@popperjs/core";
import { useLocation, useNavigate } from "react-router-dom";

const UserDropdown = (props) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState();
  const btnDropdownRef = useRef();
  const popoverDropdownRef = useRef();

  console.log(props)

  const location = useLocation()
  const navigate = useNavigate()


  const dashboard = location.pathname === '/dashboard' 
  const reservation = location.pathname === '/dashboard-reservation'
  const profile = location.pathname === '/dashboard-profile'
  

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  let onLogout = () => {
    localStorage.removeItem("tokenTid");
    return navigate('/tenant-login')
  }

  // if(!localStorage.getItem("tokenTid")){
  //   navigate("/tenant-login")
  // }

  return (
    <>
    {/* Dashboard */}
    {dashboard &&
    <>
    <a
        className="text-blueGray-500 block"
        href="#"
        ref={btnDropdownRef}
        onClick={e => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={!props?.picture ? `https://tecdn.b-cdn.net/img/new/avatars/2.webp` : 
              `http://localhost:5000/${props?.picture}`
            }
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
        }
        style={{ minWidth: "12rem" }}
      >
        <a
          href="#"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={e => e.preventDefault()}
        >
          Action
        </a>
        <a
          href="#"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={e => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={e => e.preventDefault()}
        >
          Something else here
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <button
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => onLogout()}
        >
          Sign Out
        </button>
      </div>
    </> }
      

      {/* reservation */}
      {reservation &&
      <>
      <a
          className="text-blueGray-500 block"
          href="#"
          ref={btnDropdownRef}
          onClick={e => {
            e.preventDefault();
            dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
          }}
        >
          <div className="items-center flex">
            <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
              <img
                alt="..."
                className="w-full rounded-full align-middle border-none shadow-lg"
                src={!props?.picture ? `https://tecdn.b-cdn.net/img/new/avatars/2.webp` : 
                `http://localhost:5000/${props?.picture}`
              }
              />
            </span>
          </div>
        </a>
        <div
          ref={popoverDropdownRef}
          className={
            (dropdownPopoverShow ? "block " : "hidden ") +
            "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
          }
          style={{ minWidth: "12rem" }}
        >
          <a
            href="/dashboard-profile"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
            onClick={e => e.preventDefault()}
          >
            profile
          </a>
          <a
            href="#"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
            onClick={e => e.preventDefault()}
          >
            Another action
          </a>
          <a
            href="#"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
            onClick={e => e.preventDefault()}
          >
            Something else here
          </a>
          <div className="h-0 my-2 border border-solid border-blueGray-100" />
          <button
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
            onClick={() => props?.myFunc?.onLogout()}
          >
            Sign Out
          </button>
        </div>
      </>  }

      {/* Profile */}
      {profile && 
      <>
      <a
        className="text-blueGray-500 block"
        href="#"
        ref={btnDropdownRef}
        onClick={e => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={!props?.picture ? `https://tecdn.b-cdn.net/img/new/avatars/2.webp` : 
              `http://localhost:5000/${props?.picture}`
            }
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
        }
        style={{ minWidth: "12rem" }}
      >
        <a
          href="#"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          // onClick={e => e.preventDefault()}
          data-te-target="#changePictureTenant"
          data-te-toggle="modal"
          role="button"
        >
          Change Picture
        </a>
        <a
          href="#"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          // onClick={e => e.preventDefault()}
          data-te-target="#editProfileTenant"
          data-te-toggle="modal"
          role="button"
        >
          Edit Profile
        </a>
        <a
          href="#"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          // onClick={e => e.preventDefault()}
          data-te-target="#changePasswordTenant"
          data-te-toggle="modal"
          role="button"
        >
          Change Password
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <button
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => props.myFunc.onLogout()}
        >
          Sign Out
        </button>
      </div>
      </>}
    </>
  );
};

export default UserDropdown;