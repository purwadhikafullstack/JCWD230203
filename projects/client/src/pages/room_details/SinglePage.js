import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../supports/styles/SinglePage.css";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { RiMedal2Fill } from "react-icons/ri";
import CalendarFunc from "./Calendar";
import SinglePageMiddle from "./SinglePageMiddle";
import "../../supports/styles/Tabs.css";
import Calendars from "components/calendar/calendar";


const SinglePage = (props) => {
  const { details } = props;
  const [activeImg, setActiveImg] = useState(false);
  const defaultImg = details?.[0]?.room_images?.[0]?.image_path;
  const [defaultImage, setDefaultImage] = useState(defaultImg);
  const [price, setPrice] = useState(0)
  const params = useParams();
  const { id } = params;
  
  useEffect(() => {
    const _price = {...details};
    const newPrice = _price?.[0]?.price;
    setPrice(newPrice);
  }, [details]);


  const getImageSrcHandler = (e) => {
    setDefaultImage(e.target.src);
    setActiveImg(true);
  };

  const setDefaultImgHandler = () => {
    setDefaultImage(defaultImg);
    setActiveImg(false);
  };

  const [buttonOpen, setButtonOpen] = useState(false);
  const [buttonClose, setButtonClose] = useState(true);

  const buttonOpenHandler = (event) => {
    event.preventDefault();
    setButtonOpen(true);
    setButtonClose(false);
  };

  const buttonCloseHandler = (event) => {
    event.preventDefault();
    setButtonClose(false);
    setButtonOpen(false);
  };

  return (
    <>
    <div>
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

                  <div className="w-full sm:mx-6 md:mx-10 lg:mx-12 px-3 justify-center p-1 md:p-2">
                    {details?.map((value) => {
                      {
                        return value.room_images.map((val) => {
                          return (
                            <div
                              className="absolute grid grid-cols-1 lg:grid-cols-2 single-page-hold"
                              key={val.id}
                            >
                              <img
                                src={`http://localhost:5000/Public/PROPERTY/${val.image_path}`}
                                className="w-40 object-cover rounded-xl cursor-pointer single-page-pic"
                                onMouseOver={getImageSrcHandler}
                                onMouseLeave={setDefaultImgHandler}
                              />
                            </div>
                          );
                        });
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <p className="features-text text-2xl font-semibold uppercase">
        Entire rental unit hosted by Ben{" "}
      </p>

      <p className="actual-features text-xl">
        {Math.floor(Math.random() * 6) + 3} guests .{" "}
        {Math.floor(Math.random() * 6) + 1} . bedrooms{" "}
        {Math.floor(Math.random() * 5) + 3} beds .{" "}
        {Math.floor(Math.random() * 2) + 3} bathrooms
      </p>

      <p className="line1 text-gray-300">
        __________________________________________________________________________________________________________
      </p>
      <p className="line2 text-gray-300">
        __________________________________________________________________________________________________________
      </p>

      <div className="icon-hold">
        <RiMedal2Fill className="text-3xl" />
        <FaKey className="text-3xl" />
        <FaCalendarCheck className="text-3xl" />
      </div>

      <div className="heading-hold">
        <p className="text-xl font-semibold">Ben is a Superhost. </p>
        <p className="text-xl font-semibold">Great check-in experience. </p>
        <p className="text-xl font-semibold">
          Free cancellation for 48 hours.{" "}
        </p>
      </div>

      <div className="description-hold">
        <p>
          {" "}
          highly rated hosts who are committed to providing great stays for
          their guests.
        </p>
        <p>90% of recent guests gave the check-in process a 5-star rating.</p>
        <p>No questions asked.</p>
      </div>

      <div className="side-box-card absolute">
        <p className="single-page-price font-semibold text-2xl">
          {" "}
          ${details.price}/ Night{" "}
        </p>

        <div className="ab">
          <FaStar />
        </div>

        <p className="rev-card absolute">5</p>
        <p className="rev2-card font-semibold">
          {" "}
          <p>
            {Math.floor(Math.random() * (999 - 100 + 1) + 100)} reviews
          </p>{" "}
        </p>
      </div>

      <div className="reserve-date-button-holder">
        <button
          className="reserve-date-button rounded-xl"
          onClick={buttonOpenHandler}
        >
          {" "}
          Reserve
        </button>
      </div>

      <div className="s">
        <CalendarFunc
          placesId={id}
          price={price}
          placesName={details.name}
          placesPic={defaultImg}
          buttonopenState={buttonOpen}
          buttonCloseState={buttonClose}
          closeFunc={buttonCloseHandler}
        />
      </div>

      <div className="expense-title-hold">
        <p>Servicing Fee</p>
        <p>Cleaning Fee</p>
        <p>Processing Fee</p>
      </div>

      <div className="calculated-expense-hold">
        <p className="relative w-40 le">calculated at next step</p>
        <p>180</p>
        <p>230</p>
        <p>450</p>
      </div>
      <div className="line-total text-gray-300">
        _____________________________________________________
      </div>

      <div className="price-total-text absolute font-semibold text-xl uppercase">
        Total
      </div>

      <p className="price-total absolute font-semibold text-xl">
        Calculated At Checkout
      </p>

      <SinglePageMiddle />
    </div>
    
    {/* <Calendars 
        price={price}
        buttonopenState={buttonOpen}
        buttonCloseState={buttonClose}
        closeFunc={buttonCloseHandler}
        /> */}

    </>
  );
};

export default SinglePage;


