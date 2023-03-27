import React, { useEffect, useState } from "react";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import Navbar from "./../../components/tenant/navbar/navbar";
import Sidebar from "./../../components/tenant/sidebar/sidebar";
import LineChart from "./../../components/tenant/chart/lineChart";
import BarChart from "./../../components/tenant/chart/barChart";
import DashboardTenant from "pages/tenant/dashboardTenant";
import { useLocation } from "react-router-dom";

export default function Dashboard(props) {
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");

  const location = useLocation();

  const dashboard = location.pathname === "/dashboard";
  const reservation = location.pathname === "/dashboard-reservation";
  const profile = location.pathname === "/dashboard-profile";
  const propertylist = location.pathname === "/dashboard-propertylist";
  const createlisting = location.pathname === "/dashboard-createlisting";
  const createroom = location.pathname === "/dashboard-createroom";
  let getTokenId = localStorage.getItem("tokenTid");

  useEffect(() => {
    checkIsLogin();
    getTenantProfile();
  }, []);

  let checkIsLogin = async () => {
    try {
      if (getTokenId) {
        let response = await axios.post(
          `http://localhost:5000/tenant/keep-login`,
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

        if (response.status === 201) {
          setRedirect(true);
        }
      }
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  const getTenantProfile = async () => {
    console.log(getTokenId);
    try {
      if (getTokenId) {
        const res = await axios.post(
          `http://localhost:5000/tenant/tenant-profile`,
          {},
          {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setUsername(res?.data?.data?.first_name);
        setPicture(res?.data?.data?.tenant_detail?.picture_path);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar username={username} picture={picture} />

        {localStorage.getItem("tokenTid") ? (
          <>
            {dashboard && (
              <>
                {/* Header */}
                <div className="relative my-bg-main md:pt-32 pb-32 pt-12">
                  <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                      {/* Card stats */}
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                              <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                    Traffic
                                  </h5>
                                  <span className="font-semibold text-xl text-blueGray-700">
                                    350,897
                                  </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                    <i className="far fa-chart-bar"></i>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-emerald-500 mr-2">
                                  <i className="fas fa-arrow-up"></i> 3.48%
                                </span>
                                <span className="whitespace-nowrap">
                                  Since last month
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                              <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                    New users
                                  </h5>
                                  <span className="font-semibold text-xl text-blueGray-700">
                                    2,356
                                  </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                                    <i className="fas fa-chart-pie"></i>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-red-500 mr-2">
                                  <i className="fas fa-arrow-down"></i> 3.48%
                                </span>
                                <span className="whitespace-nowrap">
                                  Since last week
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                              <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                    Sales
                                  </h5>
                                  <span className="font-semibold text-xl text-blueGray-700">
                                    924
                                  </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                                    <i className="fas fa-users"></i>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-orange-500 mr-2">
                                  <i className="fas fa-arrow-down"></i> 1.10%
                                </span>
                                <span className="whitespace-nowrap">
                                  Since yesterday
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                              <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                    Performance
                                  </h5>
                                  <span className="font-semibold text-xl text-blueGray-700">
                                    49,65%
                                  </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500">
                                    <i className="fas fa-percent"></i>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-emerald-500 mr-2">
                                  <i className="fas fa-arrow-up"></i> 12%
                                </span>
                                <span className="whitespace-nowrap">
                                  Since last month
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Chart */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                  <div className="flex flex-wrap">
                    <LineChart />
                    <BarChart />
                  </div>
                  <div className="flex flex-wrap mt-4">
                    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                          <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                              <h3 className="font-semibold text-base text-blueGray-700">
                                Page visits
                              </h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                              <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                              >
                                See all
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                          {/* Projects table */}
                          <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                              <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Page name
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Visitors
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Unique users
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Bounce rate
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                  /argon/
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  4,569
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  340
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                  46,53%
                                </td>
                              </tr>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                  /argon/index.html
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  3,985
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  319
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
                                  46,53%
                                </td>
                              </tr>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                  /argon/charts.html
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  3,513
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  294
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
                                  36,49%
                                </td>
                              </tr>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                  /argon/tables.html
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  2,050
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  147
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                  50,87%
                                </td>
                              </tr>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                  /argon/profile.html
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  1,795
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  190
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <i className="fas fa-arrow-down text-red-500 mr-4"></i>
                                  46,53%
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="w-full xl:w-4/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                          <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                              <h3 className="font-semibold text-base text-blueGray-700">
                                Social traffic
                              </h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                              <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                              >
                                See all
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                          {/* Projects table */}
                          <table className="items-center w-full bg-transparent border-collapse">
                            <thead className="thead-light">
                              <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Referral
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Visitors
                                </th>
                                <th
                                  className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                                  style={{ minWidth: "140px" }}
                                ></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                  Facebook
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  1,480
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <div className="flex items-center">
                                    <span className="mr-2">60%</span>
                                    <div className="relative w-full">
                                      <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                        <div
                                          style={{ width: "60%" }}
                                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                  Facebook
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  5,480
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <div className="flex items-center">
                                    <span className="mr-2">70%</span>
                                    <div className="relative w-full">
                                      <div className="overflow-hidden h-2 text-xs flex rounded bg-emerald-200">
                                        <div
                                          style={{ width: "70%" }}
                                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                  Google
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  4,807
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <div className="flex items-center">
                                    <span className="mr-2">80%</span>
                                    <div className="relative w-full">
                                      <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
                                        <div
                                          style={{ width: "80%" }}
                                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                  Instagram
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  3,678
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <div className="flex items-center">
                                    <span className="mr-2">75%</span>
                                    <div className="relative w-full">
                                      <div className="overflow-hidden h-2 text-xs flex rounded bg-lightBlue-200">
                                        <div
                                          style={{ width: "75%" }}
                                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lightBlue-500"
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                  twitter
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  2,645
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <div className="flex items-center">
                                    <span className="mr-2">30%</span>
                                    <div className="relative w-full">
                                      <div className="overflow-hidden h-2 text-xs flex rounded bg-orange-200">
                                        <div
                                          style={{ width: "30%" }}
                                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <Navbar />
            <div className="relative my-bg-main md:pt-32 pb-32 pt-12">
              <div className="px-4 md:px-10 mx-auto w-full">
                <div>
                  {/* Card stats */}
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                          <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                Traffic
                              </h5>
                              <span className="font-semibold text-xl text-blueGray-700">
                                350,897
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                <i className="far fa-chart-bar"></i>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-blueGray-400 mt-4">
                            <span className="text-emerald-500 mr-2">
                              <i className="fas fa-arrow-up"></i> 3.48%
                            </span>
                            <span className="whitespace-nowrap">
                              Since last month
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                          <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                New users
                              </h5>
                              <span className="font-semibold text-xl text-blueGray-700">
                                2,356
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                                <i className="fas fa-chart-pie"></i>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-blueGray-400 mt-4">
                            <span className="text-red-500 mr-2">
                              <i className="fas fa-arrow-down"></i> 3.48%
                            </span>
                            <span className="whitespace-nowrap">
                              Since last week
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                          <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                Sales
                              </h5>
                              <span className="font-semibold text-xl text-blueGray-700">
                                924
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                                <i className="fas fa-users"></i>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-blueGray-400 mt-4">
                            <span className="text-orange-500 mr-2">
                              <i className="fas fa-arrow-down"></i> 1.10%
                            </span>
                            <span className="whitespace-nowrap">
                              Since yesterday
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                          <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                Performance
                              </h5>
                              <span className="font-semibold text-xl text-blueGray-700">
                                49,65%
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500">
                                <i className="fas fa-percent"></i>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-blueGray-400 mt-4">
                            <span className="text-emerald-500 mr-2">
                              <i className="fas fa-arrow-up"></i> 12%
                            </span>
                            <span className="whitespace-nowrap">
                              Since last month
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {localStorage.getItem("tokenTid") ? (
          <>
            {reservation && (
              <>
                <div className="relative my-bg-main md:pt-32 pb-32 pt-12">
                  <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                      {/* Card stats */}
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                              <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                    Traffic
                                  </h5>
                                  <span className="font-semibold text-xl text-blueGray-700">
                                    350,897
                                  </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                    <i className="far fa-chart-bar"></i>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-emerald-500 mr-2">
                                  <i className="fas fa-arrow-up"></i> 3.48%
                                </span>
                                <span className="whitespace-nowrap">
                                  Since last month
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                              <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                    New users
                                  </h5>
                                  <span className="font-semibold text-xl text-blueGray-700">
                                    2,356
                                  </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                                    <i className="fas fa-chart-pie"></i>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-red-500 mr-2">
                                  <i className="fas fa-arrow-down"></i> 3.48%
                                </span>
                                <span className="whitespace-nowrap">
                                  Since last week
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                              <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                    Sales
                                  </h5>
                                  <span className="font-semibold text-xl text-blueGray-700">
                                    924
                                  </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                                    <i className="fas fa-users"></i>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-orange-500 mr-2">
                                  <i className="fas fa-arrow-down"></i> 1.10%
                                </span>
                                <span className="whitespace-nowrap">
                                  Since yesterday
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                              <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                    Performance
                                  </h5>
                                  <span className="font-semibold text-xl text-blueGray-700">
                                    49,65%
                                  </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500">
                                    <i className="fas fa-percent"></i>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-emerald-500 mr-2">
                                  <i className="fas fa-arrow-up"></i> 12%
                                </span>
                                <span className="whitespace-nowrap">
                                  Since last month
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DashboardTenant />
              </>
            )}
          </>
        ) : null}
        {localStorage.getItem("tokenTid") ? (
          <>
            {profile && (
              <>
                <div className="relative my-bg-light pt-12 md:pt-32 pb-32  mt-5 shadow-lg rounded-lg">
                  <div className="px-4 md:px-10 mx-auto w-full">
                    {/* <!-- Right Side --> */}
                    <div className="w-full mx-2 md:w-9/12  md:ml-[200px] h-64 relative md:top-[-100px]">
                      {/* <!-- Profile tab --> */}
                      {/* <!-- About Section --> */}
                      <div className="bg-white p-3 shadow-sm rounded-sm">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                          <span className="text-[#c9403e]">
                            <svg
                              className="h-5"
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
                          <span className="tracking-wide">About</span>
                        </div>
                        <div className="text-gray-700">
                          <div className="grid md:grid-cols-2 text-sm">
                            <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">
                                First Name
                              </div>
                              {/* <div className="px-4 py-2">{profile?.first_name}</div> */}
                            </div>
                            <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">
                                Last Name
                              </div>
                              {/* <div className="px-4 py-2">{profile?.last_name}</div> */}
                            </div>
                            <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">
                                Email
                              </div>
                              <div className="px-4 py-2">
                                <a
                                  className="text-blue-800"
                                  // href={`mailto:${profile?.email}`}
                                >
                                  {/* {profile?.email} */}
                                </a>
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">
                                Gender
                              </div>
                              {/* <div className="px-4 py-2">{profile?.gender}</div> */}
                            </div>
                            <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">
                                Birthday
                              </div>
                              <div className="px-4 py-2">
                                {/* {dateToString ? <>{`${day} ${month} ${year}`}</> : ""} */}
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">
                                Contact No
                              </div>
                              {/* <div className="px-4 py-2">+62 {profile?.phone_number}</div> */}
                            </div>
                            <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">
                                Current Address
                              </div>
                              {/* <div className="px-4 py-2">{profile?.address}</div> */}
                            </div>
                            {/* <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Permanant Address
                    </div>
                    <div className="px-4 py-2">
                      New Karawaci, Tangerang, Banten
                    </div>
                  </div> */}
                          </div>
                        </div>
                        {/* 
              <Modal
                showEditProfile={show.editProfile}
                // handleCloseProfile={() => handleCloseProfile("editProfile")}
                profile={profile}
              />
              <Modal
                showChangePicture={show.changePicture}
                // handleClosePicture={() => handleClosePicture("changePicture")}
              />
              <Modal
                showChangePassword={show.changePassword}
                // handleClosePassword={() =>
                //   handleClosePassword("changePassword")
                // }
              /> */}
                        {/* </button> */}
                      </div>
                      {/* <!-- End of about section --> */}

                      <div className="my-4"></div>

                      {/* <!-- Experience and education --> */}
                      <div className="bg-white pb-24 md:p-3 md:pb-0 shadow-sm rounded-sm ">
                        <div className="grid grid-cols-2">
                          <div>
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                              <span className="text-[#c9403e]">
                                <svg
                                  className="h-5"
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
                              <span className="tracking-wide">My Booking</span>
                            </div>
                            <ul className="list-inside space-y-2">
                              {/* {orderList &&
                      orderList.map((value, index) => {
                        return (
                          <li>
                            <div className="text-[#df6e6c]">
                              {value?.room?.property?.name}, {value?.room?.name} Room
                            </div>
                            <div className="text-gray-500 text-xs">
                              {value?.createdAt.split("T")[0]}
                            </div>
                          </li>
                        );
                      })} */}
                              <div className="">
                                <li>
                                  <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                                    Show More
                                  </button>
                                </li>
                              </div>
                            </ul>
                          </div>
                          <div className="">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                              <span className="text-[#c9403e]">
                                <svg
                                  className="h-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    fill="#fff"
                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                  />
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
                              <span className="tracking-wide">History</span>
                            </div>

                            <div className="">
                              <ul className="list-inside space-y-2">
                                <li>
                                  <div className="text-[#df6e6c]">
                                    Villa Bumi Andung Bandung
                                  </div>
                                  <div className="text-gray-500 text-xs">
                                    Mar 15, 2023
                                  </div>
                                </li>
                                <li>
                                  <div className="text-[#df6e6c]">
                                    Villa Bumi Andung Bandung
                                  </div>
                                  <div className="text-gray-500 text-xs">
                                    Mar 15, 2023
                                  </div>
                                </li>
                                <li>
                                  <div className="text-[#df6e6c]">
                                    Villa Bumi Andung Bandung
                                  </div>
                                  <div className="text-gray-500 text-xs">
                                    Mar 15, 2023
                                  </div>
                                </li>
                                <li>
                                  <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
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
            )}
          </>
        ) : null}

        {/* property list */}

        {localStorage.getItem("tokenTid") ? (
          <>
            {propertylist && (
              <>
                <div className="relative my-bg-light pt-12 md:pt-32 pb-32  mt-5 shadow-lg rounded-lg">
                  <div className="px-4 md:px-10 mx-auto w-full">
                    INI PROPERTY LIST
                  </div>
                </div>
              </>
            )}
          </>
        ) : null}

        {/* create listing */}

        {localStorage.getItem("tokenTid") ? (
          <>
            {createlisting && (
              <>
                <div className="relative my-bg-light md:pt-20 pb-32 mt-5 shadow-lg rounded-lg">
                  <div className="px-4 md:px-10 mx-auto w-full">
                    <div class="w-full h-14 pt-2 text-center  bg-gray-700  shadow overflow-hidden sm:rounded-t-lg font-bold text-3xl text-white ">
                      Create a new listing
                    </div>

                    <div class="border rounded-b-lg border-gray-300 mx-auto">
                      <div class="w-full uppercase h-10 mt-14  text-center overflow-hidden sm:rounded-t-lg font-bold text-xl  text-black ">
                        Property Category
                      </div>

                      <div class="mt-10 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                          <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-2 py-2 bg-white sm:p-6">
                              <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-10 sm:col-span-10">
                                  <label
                                    for="location"
                                    class="block text-xl font-medium text-gray-700"
                                  >
                                    Which of these best describes your place?
                                  </label>
                                  <select
                                    id="location"
                                    name="location"
                                    autocomplete="location"
                                    class="mt-1 block w-full py-4 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                                  >
                                    <option>Apartment</option>
                                    <option>Guest House</option>
                                    <option>Hotel</option>
                                    <option>Villa</option>
                                  </select>
                                </div>
                              </div>
                              <div class="w-full uppercase h-10 mt-20 text-center overflow-hidden sm:rounded-t-lg font-bold text-xl text-black ">
                                Property Details
                              </div>

                              <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-10 sm:col-span-10">
                                  <label
                                    for="location"
                                    class="block text-xl font-medium text-gray-700"
                                  >
                                    Where's your place located?
                                  </label>
                                  <select
                                    id="location"
                                    name="location"
                                    autocomplete="location"
                                    class="mt-1 block w-full py-4 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                                  >
                                    <option>Bali</option>
                                    <option>Bandung</option>
                                    <option>Jakarta</option>
                                    <option>Surabaya</option>
                                    <option>Yogyakarta</option>
                                  </select>
                                </div>
                                <div class="col-span-10 sm:col-span-10">
                                  <label
                                    for="last-name"
                                    class="block text-xl font-medium text-gray-700"
                                  >
                                    Subdistrict
                                  </label>
                                  <input
                                    type="text"
                                    name="last-name"
                                    placeholder="type your subdistrict.."
                                    id="last-name"
                                    autocomplete="family-name"
                                    class="py-4 px-4 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                                  />
                                </div>

                                <div class="col-span-10 sm:col-span-10">
                                  <label
                                    for="last-name"
                                    class="block text-xl font-medium text-gray-700"
                                  >
                                    Street address
                                  </label>
                                  <input
                                    type="text"
                                    name="last-name"
                                    placeholder="type your address.."
                                    id="last-name"
                                    autocomplete="family-name"
                                    class="py-4 px-4 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                                  />
                                </div>
                                <div class="col-span-10 sm:col-span-10">
                                  <label
                                    for="last-name"
                                    class="block text-xl font-medium text-gray-700"
                                  >
                                    Give a title to your property
                                  </label>
                                  <label
                                    for="last-name"
                                    class="block text-md font-medium text-gray-400"
                                  >
                                    Short titles work best, you can always
                                    change it later
                                  </label>

                                  <input
                                    type="text"
                                    name="last-name"
                                    placeholder="type your property title.."
                                    id="last-name"
                                    autocomplete="family-name"
                                    class="py-4 px-4 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                                  />
                                </div>

                                <div class="col-span-10 sm:col-span-10">
                                  <label
                                    for="last-name"
                                    class="block text-xl font-medium text-gray-700"
                                  >
                                    Create your description
                                  </label>
                                  <label
                                    for="last-name"
                                    class="block text-md font-medium text-gray-400"
                                  >
                                    Share what makes your place special
                                  </label>
                                  <input
                                    type="text"
                                    name="last-name"
                                    placeholder="type your description.."
                                    id="last-name"
                                    autocomplete="family-name"
                                    class="py-10 px-4 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* legend */}
                              <fieldset class="mt-8">
                                <legend class=" text-base  text-1.5xl font-medium text-gray-900">
                                  Property Accommodation
                                </legend>
                                <div class="grid grid-cols-4 mt-2 space-y-2">
                                  <div class="flex place-items-center">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Parking Area
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Elevator
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Restaurant
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Breakfast Restaurant
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Dinner Restaurant
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Safety Deposit Box
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        WIFI in public area
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Ballroom
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Sport Center
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Swimming Pool
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Spa
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Laundry Service
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        ATM/Banking
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Supermarket
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Smoking area public
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="pt-8">
                                    <h7 className="font-medium text-s">
                                      Choose at least 4 photos
                                    </h7>
                                  </div>
                                  <input
                                    className="w-full px-3 py-2 mb-1 border bg-white border-gray-200 rounded-lg focus:outline-none focus:border-[#c9403e] transition-colors"
                                    type="file"
                                    id="formFileMultiple"
                                    accept="image/*"
                                    multiple
                                    // onChange={(e) => onImagesValidation(e)}
                                  />
                                  <label className="text-gray-600 font-normal text-md mb-2 ml-1">
                                    * Multiple file max 4MB (.jpg or .png only)
                                  </label>
                                </div>
                              </fieldset>
                            </div>

                            <div class="mx-4 my-4 py-3 bg-white text-right sm:px-6">
                              <button
                                type="button"
                                class="inline-block mr-6 rounded bg-[#c9403e] px-10 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-danger-700 "
                              >
                                EDIT
                              </button>
                              <button
                                type="button"
                                class="inline-block rounded bg-success px-10 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-success-600"
                              >
                                SAVE
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : null}

        {/* create room */}

        {localStorage.getItem("tokenTid") ? (
          <>
            {createroom && (
              <>
                <div className="relative my-bg-light md:pt-20 pb-32 mt-5 shadow-lg rounded-lg">
                  <div className="px-4 md:px-10 mx-auto w-full">
                    <div class="w-full h-14 pt-2 text-center  bg-gray-700  shadow overflow-hidden sm:rounded-t-lg font-bold text-3xl text-white ">
                      Create a new room
                    </div>
                    <div class="border rounded-b-lg border-gray-300 mx-auto">
                      <div class="mt-10 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                          <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-2 py-2 bg-white sm:p-6">
                              <div class="w-full uppercase h-10 mt-8 text-center overflow-hidden sm:rounded-t-lg font-bold text-xl text-black ">
                                Room Details
                              </div>
                              <div class="col-span-10 sm:col-span-10">
                                <label
                                  for="last-name"
                                  class="block text-xl font-medium text-gray-700"
                                >
                                  Give a title to the room in your property
                                </label>
                                <input
                                  type="text"
                                  name="last-name"
                                  placeholder="type your room title.."
                                  id="last-name"
                                  autocomplete="family-name"
                                  class="py-4 px-4 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                                />
                              </div>


                              <div class="col-span-10 mt-6 sm:col-span-10">
                                <label
                                  for="last-name"
                                  class="block text-xl font-medium text-gray-700"
                                >
                                  Now, set your price
                                </label>
                                <label
                                    for="last-name"
                                    class="block text-md font-medium text-gray-400"
                                  >
                                    You can change it anytime.
                                  </label>
                                <div class="flex flex-wrap items-stretch w-full mb-4 relative">
			<div class="flex -mr-px">
				<span class="flex items-center leading-normal rounded rounded-r-none border border-r-0 font-regular text-gray-700 border-gray-300 px-4 whitespace-no-wrap text-md">Rp</span>
			</div>				
			<input type="text" placeholder="280000" class="flex-shrink flex-grow flex-auto leading-normal w-px border h-14 border-gray-300 px-3 relative" />
      <div class="flex -mr-px">
				<span class="flex items-center leading-normal rounded rounded-l-none border border-l-0 font-regular text-gray-700 border-gray-300 px-4 whitespace-no-wrap text-md">per night</span>
			</div>
			
		</div>
    <div class="col-span-10 sm:col-span-10 mt-6">
                                  <label
                                    for="last-name"
                                    class="block text-xl font-medium text-gray-700"
                                  >
                                    Create your description
                                  </label>
                                  <label
                                    for="last-name"
                                    class="block text-md font-medium text-gray-400"
                                  >
                                    Share what makes your place special
                                  </label>
                                  <input
                                    type="text"
                                    name="last-name"
                                    placeholder="type your description.."
                                    id="last-name"
                                    autocomplete="family-name"
                                    class="py-10 px-4 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                                  />
                                </div>

                                
                              </div>





                              
                              <fieldset class="mt-8">
                                <legend class=" text-base  text-1.5xl font-medium text-gray-900">
                                  Room Accommodation
                                </legend>
                                <div class="grid grid-cols-4 mt-2 space-y-2">
                                  <div class="flex place-items-center">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Free Breakfast
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Refrigerator
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Air Conditioning
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Cable TV
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Bathtub
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Shower
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Heater
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Jacuzzi
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Hair Dryer
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        In-Room Safe
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Bathrobe
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Desk
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Free WIFI
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        LAN Internet
                                      </label>
                                    </div>
                                  </div>
                                  <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        class="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div class="ml-3 text-md">
                                      <label
                                        for="comments"
                                        class="font-regular text-gray-700"
                                      >
                                        Smoking Room
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </fieldset>
                            </div>

                            <div class="mx-4 my-4 py-3 bg-white text-right sm:px-6">
                              <button
                                type="button"
                                class="inline-block mr-6 rounded bg-[#c9403e] px-10 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-danger-700 "
                              >
                                EDIT
                              </button>
                              <button
                                type="button"
                                class="inline-block rounded bg-success px-10 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-success-600"
                              >
                                SAVE
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : null}

        <Toaster />
      </div>
    </>
  );
}
