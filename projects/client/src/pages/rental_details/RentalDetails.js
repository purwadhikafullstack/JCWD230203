import React, { useEffect } from "react";
import { useState } from "react";
import {
  BsStarFill,
  BsPersonCircle,
  BsBoxSeamFill,
  BsWifi,
  BsBuildingFill,
} from "react-icons/bs";
import {
  MdLocationOn,
  MdOtherHouses,
  MdHotel,
  MdElevator,
  MdRestaurant,
  MdTableRestaurant,
  MdRestaurantMenu,
  MdSportsGymnastics,
  MdOutlineSpa,
  MdLocalLaundryService,
  MdOutlineAtm,
  MdStore,
} from "react-icons/md";
import { RxDimensions } from "react-icons/rx";
import { FaParking, FaSwimmer, FaSmoking } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { set } from "date-fns/esm";

const Rental = () => {
  const { id } = useParams();
  const [properties, setProperties] = useState([]);
  const [activeImg, setActiveImg] = useState(false);
  const [accommodation, setAccommodation] = useState([]);
  const defaultImg = properties?.property_images?.[0]?.image_path;
  const [defaultImage, setDefaultImage] = useState(defaultImg);

  useEffect(() => {
    onGetData();
    propertyConnector();
  }, []);

  const onGetData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/properties/details?property_id=${id}`
      );
      setProperties(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(accommodation);

  const symbolReact = [
    <RxDimensions />,
    <BsPersonCircle />,
    <FaParking />,
    <MdElevator />,
    <MdRestaurant />,
    <MdTableRestaurant />,
    <MdRestaurantMenu />,
    <BsBoxSeamFill />,
    <BsWifi />,
    <BsBuildingFill />,
    <MdSportsGymnastics />,
    <FaSwimmer />,
    <MdOutlineSpa />,
    <MdLocalLaundryService />,
    <MdOutlineAtm />,
    <MdStore />,
    <FaSmoking />,
  ];

  const mappedData = accommodation.map((data) => {
    const symbolIndex = data?.id - 1;
    const symbol = symbolReact[symbolIndex];
    return { ...data, symbol };
  });

  console.log(mappedData);

  const propertyConnector = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/properties/property-connector?property_id=${id}`
      );
      setAccommodation(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getImageSrcHandler = (e) => {
    setDefaultImage(e.target.src);
    setActiveImg(true);
  };

  const setDefaultImgHandler = () => {
    setDefaultImage(defaultImg);
    setActiveImg(false);
  };

  return (
    <div className="">
      {/* title */}
      <div className="flex justify-center text-3xl mt-5 h-10">
        {properties?.name || "Loading.."}
      </div>
      <div className="flex justify-center text-3xl mb-3 ">
        <div className="wrapper flex justify-center items-center">
          {/* Carousel */}
          <section className="overflow-hidden text-neutral-700">
            <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
              <div className="-m-1 flex flex-wrap md:-m-2">
                <div className="flex w-fit flex-wrap">
                  {activeImg ? (
                    <img
                      src={
                        defaultImage ||
                        `http://localhost:5000/Public/PROPERTY/${defaultImage}`
                      }
                      className="single-page-main-pic cursor-pointer"
                    />
                  ) : (
                    <img
                      src={`http://localhost:5000/Public/PROPERTY/${
                        defaultImg || { defaultImg }
                      }`}
                      className="single-page-main-pic cursor-pointer"
                    />
                  )}
                  {/* {properties?.property_images?.length > 0 ? (
                    <img
                      src={
                        activeImg
                          ? defaultImage ||
                            `http://localhost:5000/Public/PROPERTY/${defaultImage}`
                          : `http://localhost:5000/Public/PROPERTY/${properties?.property_images?.[0]?.image_path}`
                      }
                      className="single-page-main-pic cursor-pointer"
                    />
                  ) : null} */}

                  <div className="w-full sm:mx-6 md:mx-10 lg:mx-12 px-3 justify-center p-1 md:p-2 mx-10 grid grid-cols-2 lg:grid-cols-2 single-page-hold ">
                    {properties?.property_images?.map((value) => {
                      return (
                        <div className="" key={value.id}>
                          <img
                            src={`http://localhost:5000/Public/PROPERTY/${value?.image_path}`}
                            className="w-40 rounded-xl cursor-pointer single-page-pic"
                            onMouseOver={getImageSrcHandler}
                            onMouseLeave={setDefaultImgHandler}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Description */}
      <div className="container  px-6 lg:mt-[500px] mx-auto">
        <section className="mb-5 text-gray-800 text-center px-6 mx-auto">
          <h2 className="text-3xl font-bold py-5">
            Property Descriptions{" "}
            <u className="my-main">at {properties?.name || "Loading.."}</u>
          </h2>
          <div className="grid lg:gap-x-12 grid-cols-1">

            <div className="flex items-center mb-12 md:mb-0">
              <div className="p-4 bg-transparent rounded-md shadow-md w-14 h-14 flex items-center justify-center inline-block mb-6">
                <MdLocationOn className="my-main" />
              </div>
              <div className="flex flex-col mx-10">
                <div className="text-2xl font-bold mb-4 flex shrink-0 pt-4">Address</div>
                <div className="text-lg font-medium text-gray-500">
                  {properties?.locations?.[0]?.name || "Loading.."}
                </div>
              </div>
            </div>

            <div className="flex items-center mb-12 md:mb-0">
              <div className="p-4 bg-transparent rounded-md shadow-md w-14 h-14 flex items-center justify-center inline-block mb-6 mr-2">
                <MdOtherHouses className="my-main" />
              </div>
              <div className="flex flex-col mx-10">
                <div className="text-2xl font-bold mb-4 flex shrink-0 pt-4">About</div>
                <div className="text-lg font-medium text-left text-gray-500 ">
                {properties?.description || "Loading.."}
                </div>
              </div>
            </div>

            <div className="flex items-center mb-12 md:mb-0">
              <div className="p-4 bg-transparent rounded-md shadow-md w-14 h-14 flex items-center justify-center inline-block mb-6 ">
              <MdHotel className="my-main" />
              </div>
              <div className="flex flex-col mx-10">
                <div className="text-2xl font-bold mb-4 flex shrink-0 pt-4">Available Room</div>
                <div className="text-lg font-medium text-left text-gray-500 ">
                {properties?.rooms?.length || "Loading.."} Room Types avail in
                this Property
                </div>
              </div>
            </div>
          </div>
        </section>

       {mappedData.length === 0 ? null : <div className="container my-14 px-6 mx-auto">
          <div className="text-2xl font-bold mb-4 flex shrink-0 pt-4">Accommodation Available in this Property</div>
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mappedData &&
              mappedData.map((value, index) => {
                console.log(value);
                return (
                  <>
                    <div className="flex items-center">
                      <div className="p-4 text-2xl bg-transparent rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                        {value?.symbol}
                      </div>
                      <div className="grow ml-6">
                        <p className="font-bold mb-1">{value?.name}</p>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>}
      </div>

      {/* Property-rooms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center my-4 mx-20">
        {properties?.rooms &&
          properties?.rooms?.map((room) => {
            return (
              <>
                <div className="flex items-center rounded-lg bg-white shadow-lg mx-10 bg-transparent md:max-w-xl md:flex-row">
                  <div className="flex justify-center my-4 ">
                    {/* Background */}
                    <img
                      src={`http://localhost:5000/Public/PROPERTY/${room?.room_images?.[0]?.image_path}`}
                      alt=""
                      className="object-cover sm:h-[17rem] md:h-[13rem] w-full px-5"
                    />
                  </div>

                  <div className="flex flex-col justify-start p-6">
                    <h5 className="mb-2 text-xl font-medium text-black ">
                      {room?.name}
                    </h5>
                    <p className="mb-1 text-base text-black">Start From</p>
                    <p className="mb-4 text-base text-black">
                      Rp {room?.price.toLocaleString()} - Night
                    </p>
                    <p className="text-xs text-black">
                      {room?.available_room} Rooms Left
                    </p>
                    <div className="flex items-center space-x-1 mt-2">
                      <BsStarFill className="my-rating" />
                      <p className="text-[15px] pr-5">5.0</p>
                    </div>
                    <Link to={`/room-details/${room?.id}`} className="mt-2">
                      <button
                        type="button"
                        className="inline-block rounded-full border-2 border-success px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 focus:border-success-600 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        data-te-ripple-init
                      >
                        Book now !
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Rental;
