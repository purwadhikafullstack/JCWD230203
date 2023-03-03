import axios from "axios";
import React, { useEffect, useState } from "react";

const Profiling = () => {
  const getProfile = async () => {
    try {
      let getTokenId = localStorage.getItem("token");
      if (getTokenId) {
        let response = await axios.post(
          `http://localhost:5000/users/user-profile`,
          {},
          {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
      }
      console.log(getTokenId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">
          {/* <!-- Left Side --> */}
          <div class="w-full md:w-3/12 md:mx-2">
            {/* <!-- Profile Card --> */}

            <div class="bg-white p-3 border-t-4 border-[#c9403e]">
              <div class="image overflow-hidden">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                  class="w-24 rounded-full shadow-lg"
                  alt="Avatar"
                />
              </div>
              <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
                Gigi
              </h1>
              <h3 class="text-gray-600 font-lg text-semibold leading-6">
                gigi.hartono@gmail.com
              </h3>

              {/* <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
                non deserunt
              </p> */}
              <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li class="flex items-center py-3">
                  <span>Status</span>
                  <span class="ml-auto">
                    <span class="bg-[#c9403e] py-1 px-2 rounded text-white text-sm">
                      Active
                    </span>
                  </span>
                </li>
                <li class="flex items-center py-3">
                  <span>Member since</span>
                  <span class="ml-auto">Jan 01, 2023</span>
                </li>
              </ul>
            </div>
            {/* <!-- End of profile card --> */}
            <div class="my-4"></div>
            {/* <!-- Friends card --> */}
            <div class="bg-white p-3 hover:shadow">
              <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                <span class="text-[#c9403e]">
                  <svg
                    class="h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <span>Gigi Confirmed</span>
              </div>
              <div class="grid grid-cols-3">
                <div id="tasks" class="my-5">
                  <div
                    id="task"
                    class="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150"
                  >
                    <div class="inline-flex items-center space-x-2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>Identity</div>
                    </div>
                  </div>
                  <div
                    id="task"
                    class="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150"
                  >
                    <div class="inline-flex items-center space-x-2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>Email address</div>
                    </div>
                  </div>
                  <div
                    id="task"
                    class="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150"
                  >
                    <div class="inline-flex items-center space-x-2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>Phone number</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End of friends card --> */}
          </div>
          {/* <!-- Right Side --> */}
          <div class="w-full md:w-9/12 mx-2 h-64">
            {/* <!-- Profile tab --> */}
            {/* <!-- About Section --> */}
            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span class="text-[#c9403e]">
                  <svg
                    class="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span class="tracking-wide">About</span>
              </div>
              <div class="text-gray-700">
                <div class="grid md:grid-cols-2 text-sm">
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">First Name</div>
                    <div class="px-4 py-2">Gigi</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Last Name</div>
                    <div class="px-4 py-2">Hartono</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Email</div>
                    <div class="px-4 py-2">
                      <a class="text-blue-800" href="mailto:jane@example.com">
                        gigi.hartono@gmail.com
                      </a>
                    </div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Gender</div>
                    <div class="px-4 py-2">Male</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Birthday</div>
                    <div class="px-4 py-2">Jan 01, 1990</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Contact No</div>
                    <div class="px-4 py-2">+62 877777777</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Current Address</div>
                    <div class="px-4 py-2">Rempoa, South Tangerang, Banten</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Permanant Address</div>
                    <div class="px-4 py-2">New Karawaci, Tangerang, Banten</div>
                  </div>
                </div>
              </div>
              <button class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                Edit Your Profile
              </button>
            </div>
            {/* <!-- End of about section --> */}

            <div class="my-4"></div>

            {/* <!-- Experience and education --> */}
            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div class="grid grid-cols-2">
                <div>
                  <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span class="text-[#c9403e]">
                      <svg
                        class="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span class="tracking-wide">My Booking</span>
                  </div>
                  <ul class="list-inside space-y-2">
                    <li>
                      <div class="text-[#df6e6c]">
                        Apartment Gandaria Heights Jakarta
                      </div>
                      <div class="text-gray-500 text-xs">Mar 10, 2023</div>
                    </li>
                    <li>
                      <div class="text-[#df6e6c]">
                        Apartment Gandaria Heights Jakarta
                      </div>
                      <div class="text-gray-500 text-xs">Mar 10, 2023</div>
                    </li>
                    <li>
                      <div class="text-[#df6e6c]">
                        Apartment Gandaria Heights Jakarta
                      </div>
                      <div class="text-gray-500 text-xs">Mar 10, 2023</div>
                    </li>
                    <div className="">
                      <li>
                        <button class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                          Show More
                        </button>
                      </li>
                    </div>
                  </ul>
                </div>
                <div className="">
                  <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span class="text-[#c9403e]">
                      <svg
                        class="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path
                          fill="#fff"
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    </span>
                    <span class="tracking-wide">History</span>
                  </div>

                  <div className="">
                    <ul class="list-inside space-y-2">
                      <li>
                        <div class="text-[#df6e6c]">
                          Villa Bumi Andung Bandung
                        </div>
                        <div class="text-gray-500 text-xs">Mar 15, 2023</div>
                      </li>
                      <li>
                        <div class="text-[#df6e6c]">
                          Villa Bumi Andung Bandung
                        </div>
                        <div class="text-gray-500 text-xs">Mar 15, 2023</div>
                      </li>
                      <li>
                        <div class="text-[#df6e6c]">
                          Villa Bumi Andung Bandung
                        </div>
                        <div class="text-gray-500 text-xs">Mar 15, 2023</div>
                      </li>
                      <li>
                        <button class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                          Show More
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <!-- End of Experience and education grid --> */}
            </div>
            {/* <!-- End of profile tab --> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profiling;
