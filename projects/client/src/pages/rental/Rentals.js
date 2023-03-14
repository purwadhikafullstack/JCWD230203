import React, { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import axios from "axios";
import Slider from "./../../components/slider/slider"
import { Link, useLocation, useParams } from "react-router-dom";
import Type from "components/type/Type";

const Rentals = () => {
  const {id} = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState([]);
  const [type, setType] = useState([])
  const [pagination, setPagination] = useState("");
  const [typePagination, setTypePagination] = useState("")
  const [disabled, setDisabled] = useState(false)

  const location = useLocation();


  let onChange = (value) => {
    setCurrentPage(value)
  }

  useEffect(() => {
    onGetData();
    getType();
  }, [currentPage, id]);

  let onGetData = async () => {
    try {
      let res = await axios.get(
        `http://localhost:5000/properties/getAll?page=${currentPage}`
      );
      setProperties(res.data.data);
      setPagination(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  let getType = async() => {
    try {
        let res = await axios.get(`http://localhost:5000/properties/getType?type=${id}&page=${currentPage}`)
        setType(res.data.data)
        setTypePagination(res.data)
        // console.log(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <>
    <div className="py-3 sm:py-5">
      <Type />
      {location.pathname === `/category/${id}` ? 
      
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 gap-6 px-10">
        {type
          ? type.map((value) => { 
              return (
                <div className="">
                    <Link to={`/details/${value.id}`}>
                    <div className="relative">
                      <div className="grad absolute w-full h-full rounded-b-[1.3rem]"></div>
                      <div className="flex  ">
                      {/* Background */}
                        <img
                          src={`http://localhost:5000/Public/PROPERTY/${value.property_images[0].image_path}`}
                          alt=""
                          className="object-cover rounded-[1.3rem] sm:h-[17rem]  md:h-[13rem] w-full pointer"
                        />
                      {/* Title */}
                      <div className="absolute text-white font-bold bottom-6 left-6 text-[22px] flex items-center gap-2 pointer">
                        {/* {value.name} */}
                        <span>&#x2022;</span>
                        <p className="text-[18px] text-slate-200"></p>
                      </div>
                    </div>
                      
                    </div>
                  {/* Description */}
                  <div className="pt-3 flex justify-between items-start mx-10">
                    {/* Left */}
                    <div className="max-w-[17rem]">
                      <p className=" font-semibold text-[17px]">
                        {/* {title} */}
                        {value.name}
                      </p>
                      <p className="text-[16px]-mt-1">
                      <span className="text-gray-500">Start from </span> <span className="font-black"> Rp. {value.rooms[1].price.toLocaleString()}</span>
                      </p>
                      <p className="font-semibold text-[17px]">
                        {/* Click For See the Room */}
                      </p>
                    </div>
                    
                    {/* Right */}
                    <div className="flex items-center space-x-1">
                      <BsStarFill className="my-rating" />
                      <p className="text-[15px]">5.0</p>
                    </div>
                  </div>
                  </Link>
                </div>
              );
            })
          : "Loading.."}
      </div> 
      :
      

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties
          ? properties.map((value) => {
              return (
                <div className="">
                  <Link to={`/details/${value.id}`}>
                  <div className="relative">
                    <div className="grad absolute w-full h-full rounded-b-[1.3rem]"></div>
                    <div className="flex  ">
                      {/* Background */}
                        <img
                          src={`http://localhost:5000/Public/PROPERTY/${value.property_images[0].image_path}`}
                          alt=""
                          className="object-cover rounded-[1.3rem] sm:h-[17rem]  md:h-[13rem] w-full pointer"
                        />
                      {/* Title */}
                      <div className="absolute text-white font-bold bottom-6 left-6 text-[22px] flex items-center gap-2 pointer">
                        {/* {value.name} */}
                        <span>&#x2022;</span>
                        <p className="text-[18px] text-slate-200"></p>
                      </div>
                    </div>
                    
                  </div>
                  {/* Description */}
                  <div className="pt-3 flex justify-between items-start mx-10">
                    {/* Left */}
                    <div className="">
                      <p className="max-w-[17rem] font-bold text-[17px]">
                        {/* {title} */}
                        {value.name}
                      </p>
                      <p className="max-w-[17rem]  text-[16px]-mt-1">
                      <span className="text-gray-500">Start from </span> <span className="font-black"> Rp. {value.rooms[1].price.toLocaleString()}</span>
                      </p>
                      <p className="max-w-[17rem] font-semibold text-[17px]">
                        {/* Click For See the Room */}
                      </p>
                    </div>
                    
                    {/* Right */}
                    <div className="flex items-center space-x-1">
                      <BsStarFill className="my-rating"/>
                      <p className="text-[15px]">5.0</p>
                    </div>
                  </div>
                  </Link>
                </div>
              );
            })
          : "Loading.."}
      </div> 

      }


      {/*  PAGINATION */}
      <hr className="h-10 mt-4" />
      {location.pathname === `/category/${id}` ?  
      <>
      <div className="flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : null}`}>
              <button
                onClick={() => {
                    if(currentPage > 1){
                        setCurrentPage(currentPage - 1)
                        console.log(currentPage)
                    }
                }}
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none pointer"
              >
                Previous
              </button>
            </li>
            <li className="page-item active"
            >
              <a
                className="page-link relative block py-1.5 px-3 rounded border-0 my-bg-main outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                href="#"
                onClick={() => onChange(currentPage)}
              >
                Page {currentPage} <span className="visually-hidden"></span>
              </a>
            </li>

            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href=""
              > 
               <span className="mr-3" disabled={disabled}>Of</span> {typePagination && typePagination.total_pages}
              </a>
            </li>
            <li className="page-item">
              <button
                onClick={() => {
                  if (currentPage < typePagination.total_pages) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none pointer"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      </>
      : 
      <>
      <div className="flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : null}`}>
              <button
                onClick={() => {
                    if(currentPage > 1){
                        setCurrentPage(currentPage - 1)
                        console.log(currentPage)
                    }
                }}
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none pointer"
              >
                Previous
              </button>
            </li>
            <li className="page-item active"
            >
              <a
                className="page-link relative block py-1.5 px-3 rounded border-0 my-bg-main outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                href="#"
                onClick={() => onChange(currentPage)}
              >
                Page {currentPage} <span className="visually-hidden"></span>
              </a>
            </li>

            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href=""
              > 
               <span className="mr-3" disabled={disabled}>Of</span> {pagination && pagination.total_pages}
              </a>
            </li>
            <li className="page-item">
              <button
                onClick={() => {
                  if (currentPage < pagination.total_pages) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none pointer"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      </>}
      
    </div>
    </>
  );
};

export default Rentals;