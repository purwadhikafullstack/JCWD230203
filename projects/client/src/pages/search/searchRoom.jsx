import { useEffect, useState } from "react";
import axios from "axios";
import { BsStarFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

function SearchRoom() {
  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const propertyName = searchParams.get("property_name");
  const priceMin = searchParams.get("price_min");
  const priceMax = searchParams.get("price_max");
  const sortOrder = searchParams.get("sort_order");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const location = searchParams.get("location");
  const searchData = searchParams.getAll("data");

  const [room, setRoom] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      if (propertyName && priceMin && priceMax && sortOrder) {
        const res = await axios.get(
          `http://localhost:5000/properties/search-rooms?property_name=${propertyName}&price_min=${priceMin}&price_max=${priceMax}&sort_order=${sortOrder}`
        );
        setRoom(res.data.data);
      } else {
        const response = await axios.get(
          `http://localhost:5000/properties/search-date?check_in=${startDate}&check_out=${endDate}&city=${location}&page=${currentPage}`
        );
        console.log(response.data.data);
        setRoom(response.data.data);
      }
    };
    getData();
  }, []);

  return (
    <>
      {loc.pathname ===
      `http://localhost:5000/properties/search-rooms?property_name=${propertyName}&price_min=${priceMin}&price_max=${priceMax}&sort_order=${sortOrder}` ? (
        <div class="grid grid-cols-1 lg:grid-cols-2  gap-4 justify-center my-4 mx-10">
          {room &&
            room.map((room) => {
              return (
                <>
                  <div class="flex items-center rounded-lg bg-white shadow-lg bg-transparent md:max-w-xl md:flex-row">
                    <div className="wrap">
                      {/* Title */}
                      <div className="flex mt-5 ml-5 text-white font-bold text-[22px] flex items-center gap-2">
                        <p className="text-[18px] text-black ">
                          {room.property.name}
                        </p>
                      </div>
                      <div className="flex justify-center my-4 ">
                        {/* Background */}
                        <img
                          src={`http://localhost:5000/Public/PROPERTY/${room.room_images[0].image_path}`}
                          alt=""
                          className="object-cover sm:h-[17rem] md:h-[13rem] w-full px-5"
                        />
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
      ) : (
        <div class="grid grid-cols-1 lg:grid-cols-2  gap-4 justify-center my-4 mx-10">
          {room &&
            room.map((room) => {
              console.log(room.property);
              return (
                <>
                  <div class="flex items-center rounded-lg bg-white shadow-lg bg-transparent md:max-w-xl md:flex-row">
                    <div className="wrap">
                      {/* Title */}
                      <div className="flex mt-5 ml-5 text-white font-bold text-[22px] flex items-center gap-2">
                        <p className="text-[18px] text-black ">
                          {room.property.name}
                        </p>
                      </div>
                      <div className="flex justify-center my-4 ">
                        {/* Background */}
                        {room?.property?.rooms?.map((value) => {
                          console.log(value);
                          return (
                            <>
                              <img
                                src={`http://localhost:5000/Public/PROPERTY/${value.room_images?.image_path}`}
                                alt=""
                                className="object-cover sm:h-[17rem] md:h-[13rem] w-full px-5"
                              />
                            </>
                          );
                        })}
                      </div>
                    </div>

                    <div class="flex flex-col justify-start p-6">
                      <h5 class="mb-2 text-xl font-medium text-black ">
                        {room.name}
                      </h5>
                      <p class="mb-4 text-base text-black">
                        Rp{" "}
                        {room?.property?.rooms?.price?.toLocaleString() ||
                          "Free"}{" "}
                        - Night
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
      )}
    </>
  );
}

export default SearchRoom;

// const onGetData = async () => {
//   try {
//     const res = await axios.get(
//       `http://localhost:5000/properties/search-rooms?property_name=${propertyName}&price_min=${priceMin}&price_max=${priceMax}&sort_order=${sortOrder}`
//     );
//     console.log(res.data);

//     setRoom(res.data.data);
//     //   const searchData = res.data;
//     //   const searchParams = new URLSearchParams({
//     //     property_name: form.property_name,
//     //     price_min: form.price_min,
//     //     price_max: form.price_max,
//     //     sort_order: form.ascending ? form.ascending : form.descending,
//     //     ...searchData
//     //   });
//     //   const redirectUrl = `/search-results?${searchParams.toString()}`;
//     //   window.location.href = redirectUrl;
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   onGetData();
// }, []);
