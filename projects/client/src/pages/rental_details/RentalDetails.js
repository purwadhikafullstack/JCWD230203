import React, { useEffect } from "react";
import { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { MdLocationOn, MdOtherHouses, MdHotel } from "react-icons/md";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Rental = () => {
  const { id } = useParams();
  const [properties, setProperties] = useState([]);
  const [activeImg, setActiveImg] = useState(false);
  const defaultImg = properties?.property_images?.[0]?.image_path;
  const [defaultImage, setDefaultImage] = useState(defaultImg);

  useEffect(() => {
    onGetData();
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
                        defaultImg || {defaultImg}
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
                        <div
                          className=""
                          key={value.id}
                        >
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
      <div class="container  px-6 lg:mt-[500px] mx-auto">
        <section class="mb-32 text-gray-800 text-center">
          <h2 class="text-3xl font-bold mb-12">
            Property Descriptions{" "}
            <u class="my-main">at {properties?.name || "Loading.."}</u>
          </h2>
          <div class="grid lg:gap-x-12 md:grid-cols-3">
            <div class="mb-12 md:mb-0">
              <div class="p-4 my-bg-secondary rounded-md shadow-lg inline-block mb-6">
                {/* <svg
                  class="w-5 h-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 144c23.8 0 52.7 29.3 56 71.4.7 8.6-10.8 11.9-14.9 4.5l-9.5-17c-7.7-13.7-19.2-21.6-31.5-21.6s-23.8 7.9-31.5 21.6l-9.5 17c-4.1 7.3-15.6 4-14.9-4.5 3.1-42.1 32-71.4 55.8-71.4zm-160 0c23.8 0 52.7 29.3 56 71.4.7 8.6-10.8 11.9-14.9 4.5l-9.5-17c-7.7-13.7-19.2-21.6-31.5-21.6s-23.8 7.9-31.5 21.6l-9.5 17c-4.2 7.4-15.6 4-14.9-4.5 3.1-42.1 32-71.4 55.8-71.4zm80 280c-60.6 0-134.5-38.3-143.8-93.3-2-11.9 9.4-21.6 20.7-17.9C155.1 330.5 200 336 248 336s92.9-5.5 123.1-15.2c11.4-3.7 22.6 6.1 20.7 17.9-9.3 55-83.2 93.3-143.8 93.3z"
                  />
                </svg> */}
                <MdLocationOn />
              </div>
              <h3 class="text-2xl font-bold mb-4">Address</h3>
              <h5 class="text-lg font-medium text-gray-500">
                {properties?.locations?.[0]?.name || "Loading.."}
              </h5>
            </div>

            <div class="mb-12 md:mb-0">
              <div class="p-4 my-bg-secondary rounded-md shadow-lg inline-block mb-6">
                {/* <svg
                  class="w-5 h-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"
                  ></path>
                </svg> */}
                <MdOtherHouses />
              </div>
              <h3 class="text-2xl font-bold mb-4">About</h3>
              <h5 class="text-lg font-medium text-gray-500">
                {properties?.description || "Loading.."}
              </h5>
            </div>

            <div class="mb-12 md:mb-0">
              <div class="p-4 my-bg-secondary rounded-md shadow-lg inline-block mb-6">
                {/* <svg
                  class="w-5 h-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M512.1 191l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0L552 6.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zm-10.5-58.8c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.7-82.4 14.3-52.8 52.8zM386.3 286.1l33.7 16.8c10.1 5.8 14.5 18.1 10.5 29.1-8.9 24.2-26.4 46.4-42.6 65.8-7.4 8.9-20.2 11.1-30.3 5.3l-29.1-16.8c-16 13.7-34.6 24.6-54.9 31.7v33.6c0 11.6-8.3 21.6-19.7 23.6-24.6 4.2-50.4 4.4-75.9 0-11.5-2-20-11.9-20-23.6V418c-20.3-7.2-38.9-18-54.9-31.7L74 403c-10 5.8-22.9 3.6-30.3-5.3-16.2-19.4-33.3-41.6-42.2-65.7-4-10.9.4-23.2 10.5-29.1l33.3-16.8c-3.9-20.9-3.9-42.4 0-63.4L12 205.8c-10.1-5.8-14.6-18.1-10.5-29 8.9-24.2 26-46.4 42.2-65.8 7.4-8.9 20.2-11.1 30.3-5.3l29.1 16.8c16-13.7 34.6-24.6 54.9-31.7V57.1c0-11.5 8.2-21.5 19.6-23.5 24.6-4.2 50.5-4.4 76-.1 11.5 2 20 11.9 20 23.6v33.6c20.3 7.2 38.9 18 54.9 31.7l29.1-16.8c10-5.8 22.9-3.6 30.3 5.3 16.2 19.4 33.2 41.6 42.1 65.8 4 10.9.1 23.2-10 29.1l-33.7 16.8c3.9 21 3.9 42.5 0 63.5zm-117.6 21.1c59.2-77-28.7-164.9-105.7-105.7-59.2 77 28.7 164.9 105.7 105.7zm243.4 182.7l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0l8.2-14.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zM501.6 431c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.6-82.4 14.3-52.8 52.8z"
                  />
                </svg> */}
                <MdHotel />
              </div>
              <h3 class="text-2xl font-bold mb-4">Available Room</h3>
              <h5 class="text-lg font-medium text-gray-500">
                {properties?.rooms?.length || "Loading.."} Room Types avail in
                this Property
              </h5>
            </div>
          </div>
        </section>
      </div>

      {/* Property-rooms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center my-4 mx-20">
        {properties.rooms &&
          properties.rooms.map((room) => {
            return (
              <>
                <div className="flex items-center rounded-lg bg-white shadow-lg mx-10 bg-transparent md:max-w-xl md:flex-row">
                  <div className="flex justify-center my-4 ">
                    {/* Background */}
                    <img
                      src={`http://localhost:5000/Public/PROPERTY/${room.room_images[0].image_path}`}
                      alt=""
                      className="object-cover sm:h-[17rem] md:h-[13rem] w-full px-5"
                    />
                  </div>

                  <div className="flex flex-col justify-start p-6">
                    <h5 className="mb-2 text-xl font-medium text-black ">
                      {room.name}
                    </h5>
                    <p className="mb-1 text-base text-black">Start From</p>
                    <p className="mb-4 text-base text-black">
                      Rp {room.price.toLocaleString()} - Night
                    </p>
                    <p className="text-xs text-black">
                      {room.available_room} Rooms Left
                    </p>
                    <div className="flex items-center space-x-1 mt-2">
                      <BsStarFill className="my-rating" />
                      <p className="text-[15px] pr-5">5.0</p>
                    </div>
                    <Link to={`/room-details/${room.id}`} className="mt-2">
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
