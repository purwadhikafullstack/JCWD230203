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

  const isSearchPage =
  loc.pathname === "/search-result" &&
  propertyName &&
  priceMin &&
  priceMax &&
  sortOrder;

  console.log(propertyName)



  const [room, setRoom] = useState([]);
  const [property, setProperty] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      if (propertyName && priceMin && priceMax && sortOrder) {
        const res = await axios.get(
          `http://localhost:5000/properties/search-rooms?property_name=${propertyName}&price_min=${priceMin}&price_max=${priceMax}&sort_order=${sortOrder}`
        );
        console.log(res.data)
        setRoom(res.data.data);

      } else {
        const response = await axios.get(
          `http://localhost:5000/properties/search-date?check_in=${startDate}&check_out=${endDate}&city=${location}&page=${currentPage}`
        );
        setProperty(response.data.data);
        // console.log(response.data)
      }
    };
    getData();
  }, []);


  return (
    <>

        {room.length === 0 ? null :
         <div className="flex justify-center items-center my-10">
         <div className="text-2xl ">
           Room List Available ..
         </div>
       </div>
        }
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 justify-center my-4 mx-10">
          {room &&
            room.map((room) => {
              console.log(room)
              return (
                <>
                  <div className="flex items-center justify-between rounded-lg bg-white shadow-lg bg-transparent md:max-w-xl md:flex-row">
                    <div className="wrap">
                      {/* Title */}
                      <div className="flex mt-5 ml-5 text-white font-bold text-[22px] flex items-center gap-2">
                        <p className="text-[18px] text-black border-b-2 ">
                          {room?.property?.name}, {room.name}
                        </p>
                      </div>
                      <div className="flex justify-center my-4 ">
                        {/* Background */}
                        <img
                          src={`http://localhost:5000/Public/PROPERTY/${room?.room_images?.[0 ]?.image_path}`}
                          alt=""
                          className="object-cover sm:h-[17rem] md:h-[13rem] w-full px-5"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-end mr-5 pt-20">
                      <p className="mb-4 text-base text-black">
                       Rp {room?.price?.toLocaleString()} - Night
                      </p>
                      <p className="text-xs text-black">
                        {room?.available_room} Available Room
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

         
        {property.length === 0 ? null :
          <div className="flex justify-center items-center my-10">
          <div className="text-2xl ">
            Property List Available ..
          </div>
        </div>}
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 justify-center my-4 mx-10">
          {property &&
            property.map((value) => {

              return (
                <>
                  <div className="flex items-center justify-evenly rounded-lg bg-white shadow-xl bg-transparent md:max-w-xl md:flex-row">
                    <div className="wrap">
                      {/* Title */}
                      <div className="flex mt-5 ml-5 text-white font-bold text-[22px] flex items-center gap-2">
                        <p className="text-[18px] text-black ">
                        {value?.property?.name}, {value?.name}
                        </p>
                      </div>
                      <div className="flex justify-center my-4 ">
                              <img
                                src={`http://localhost:5000/Public/PROPERTY/${value?.property?.property_images?.[0]?.image_path}`}
                                alt=""
                                className="object-cover sm:h-[17rem] md:h-[13rem] w-full px-5"
                              />
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-end mr-5 pt-20">
                    <div className="mb-2 text-xl font-medium text-black ">
                      Start From 
                      </div>
                      <p className="mb-4 text-base text-black ">
                       Rp {value?.property?.rooms?.[1]?.price?.toLocaleString()} - Night
                      </p>
                      <p className="text-xs text-black">
                        {value?.property?.rooms?.length} Type Of Rooms
                      </p>
                      <div className="flex items-center space-x-1 mt-2">
                        <BsStarFill className="my-rating" />
                        <p className="text-[15px] pr-5">5.0</p>
                      </div>
                      <Link to={`/details/${value?.property_id}`} className="mt-2">
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
