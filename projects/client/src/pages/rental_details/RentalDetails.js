import React, { useEffect } from "react";
import { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Rental = () => {
  const { id } = useParams();
  const [properties, setProperties] = useState([]);

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

  return (
    <div className="">
      <div className="flex justify-center text-3xl my-3 ">
        <h1>{properties ? properties.name : null}</h1>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2  gap-4 justify-center my-4 mx-10">
        {properties.rooms &&
          properties.rooms.map((room) => {
            return (
              <>
                <div class="flex items-center rounded-lg bg-white shadow-lg bg-transparent md:max-w-xl md:flex-row">
                  <div className="flex justify-center my-4 ">
                    {/* Background */}
                    <img
                      src={`http://localhost:5000/Public/PROPERTY/${room.room_images[0].image_path}`}
                      alt=""
                      className="object-cover sm:h-[17rem] md:h-[13rem] w-full px-5"
                    />
                    {/* Title */}
                    <div className="absolute text-white font-bold bottom-6 left-6 text-[22px] flex items-center gap-2">
                      <span>&#x2022;</span>
                      <p className="text-[18px] text-slate-200"></p>
                    </div>
                  </div>

                  <div class="flex flex-col justify-start p-6">
                    <h5 class="mb-2 text-xl font-medium text-black ">
                      {room.name}
                    </h5>
                    <p class="mb-4 text-base text-black">
                      Rp {room.price.toLocaleString()} - Night
                    </p>
                    <p class="text-xs text-black">
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
