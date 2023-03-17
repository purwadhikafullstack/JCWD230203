import React, { useEffect, useState } from "react";
import axios from "axios";

import toast, { Toaster } from 'react-hot-toast';
import Navbar from "./../../components/tenant/navbar/navbar";
import Sidebar from "./../../components/tenant/sidebar/sidebar";
import LineChart from "./../../components/tenant/chart/lineChart";
import BarChart from "./../../components/tenant/chart/barChart";
import DashboardTenant from "pages/tenant/dashboardTenant";
import { useLocation } from "react-router-dom";




export default function Dashboard(props) {
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("")
  const [picture, setPicture] = useState("")

  const location = useLocation()

  const dashboard = location.pathname === '/dashboard'
  const reservation = location.pathname === '/dashboard-reservation'
  const profile = location.pathname === '/dashboard-profile'
  let getTokenId = localStorage.getItem('tokenTid')

  useEffect(() => {
    checkIsLogin();
    getTenantProfile();
   }, []);
 
   let checkIsLogin = async() => {
     try {
         if(getTokenId){
       let response = await axios.post(`http://localhost:5000/tenant/keep-login`, {},
       {
        headers: {
          auth: getTokenId,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

       console.log(response)
 
       if(response.status === 201){
         setRedirect(true)
       }
     }
     } catch (error) {
       console.log(error)
       toast(error.message)
     }
   }

   const getTenantProfile = async() => {
     console.log(getTokenId)
      try {
        if(getTokenId){
          const res = await axios.post(`http://localhost:5000/tenant/tenant-profile`,
          {},
         {
          headers: {
            auth: getTokenId,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          setUsername(res?.data?.data?.first_name)
          setPicture(res?.data?.data?.tenant_detail?.picture_path)
        }
      } catch (error) {
        console.log(error)
      }
   }
   
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
      <Navbar username={username} picture={picture}/>
        
        {localStorage.getItem('tokenTid') ? 
        <>
        {dashboard && 

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
        
      }
      </>
      : 
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
      </>}

      { localStorage.getItem("tokenTid") ? 
      <>
      {reservation && 
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
      </>}
      </> : null }

      {profile && 
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
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    {/* <div className="px-4 py-2">{profile?.first_name}</div> */}
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Last Name</div>
                    {/* <div className="px-4 py-2">{profile?.last_name}</div> */}
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email</div>
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
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    {/* <div className="px-4 py-2">{profile?.gender}</div> */}
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Birthday</div>
                    <div className="px-4 py-2">
                      {/* {dateToString ? <>{`${day} ${month} ${year}`}</> : ""} */}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No</div>
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
      </>}
      
      <Toaster />
      </div>

      
    </>
  );
}