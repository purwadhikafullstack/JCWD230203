import React, { useEffect, useState } from "react";
import AptJktKbyBrBtnMtr from "../../supports/assets/apartment-jakarta-kbybaru-botanica-master-2-1.webp";
import Bca from "../../supports/assets/bcavector.png";
import Bri from "../../supports/assets/bankbri.png";
import { format } from "date-fns";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster }from "react-hot-toast";
import Loader from "components/loader/loader";

const Transaction = () => {
  const getTokenId = localStorage.getItem("token");
  const [details, setDetails] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false)
  const [payment, setPayment] = useState(false)
  const data = useParams();

  const startDate = details?.[0]?.check_in?.split("T")[0]?.split("-")[2];
  const endDate = details?.[0]?.check_out?.split("T")[0]?.split("-")[2];
  // const format1 = details?.[0]?.check_in?.split("T")[0]
  // const newStartDate = format(new Date(format1), 'MMM dd, yyyy')
  // const format2 = details?.[0]?.check_out?.split("T")[0]
  // const newEndDate = format(new Date(format2), 'MMM dd, yyyy')

  var daysCheck = endDate - startDate;


  useEffect(() => {
    transaction();
  }, []);

  const transaction = async () => {
    try {
      if (getTokenId) {
        const res = await axios.post(
          `http://localhost:5000/transaction/data`,
          {
            room_id: data?.id,
            order_id1: data?.order_id1,
            order_id2: data?.order_id2,
          },
          {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        setDetails(res?.data?.data);
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  let onImagesValidation = (e) => {
    try {
      let files = [...e.target.files]
      if(files.length > 2) throw {message: "Select Just 1 Image"};

      files.forEach((value) => {
        if(value.size > 2000000) throw {message: `${value.name} more than 2Mb`}
      });

      setSelectedImages(files);
      toast.success("Upload success!");
    } catch (error) {
      if (
        error.message === "Request failed with status code 400" ||
        error.message === "Request failed with status code 404"
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  }

  const uploadPayment = async() => {
    try {
      setLoading(true)
      let fd = new FormData();
      if(!selectedImages) throw {message: "Please Upload Your Payment Proof"}
      selectedImages.forEach((value) => {
        fd.append("images", value);
      })

      fd.append('room_id', data?.id)
      fd.append('order_id1', data?.order_id1)
      fd.append('order_id2', data?.order_id2)

        const res = await axios.patch(`http://localhost:5000/transaction/payment-proof`, fd)

        console.log(res)
        if(res.status === 200) {
          setPayment(true)
          toast.success(res.data.message)
        }
    } catch (error) {
      if(error.message ===  "Request failed with status code 400" || error.message ===  "Request failed with status code 404"){
        toast.error(error.response.data.message)
      }else{
        toast.error(error.message)
      }
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
      <div className="px-32 pt-5">
        <div className="mb-5 text-gray-400">
          <a
            href="#"
            className="focus:outline-none hover:underline text-gray-500"
          >
            Homepage
          </a>{" "}
          /{" "}
          <a
            href="#"
            className="focus:outline-none hover:underline text-gray-500"
          >
            Property Details
          </a>{" "}
          /{" "}
          <a
            href="#"
            className="focus:outline-none hover:underline text-gray-500"
          >
            Room Details
          </a>{" "}
          / <span className="text-gray-600">Transaction</span>
        </div>
        <div className="mb-2">
          <h1 className="text-xl md:text-4xl font-bold text-gray-600">
            Please Review Your Booking
          </h1>
          <h3 className="text-s md:text-xl border-b font-medium text-gray-600 pb-4">
            Please review your booking details before continuing to payment
          </h3>
        </div>
      </div>
      <div className="w-full mb-24 bg-white border-gray-200 text-gray-800">
        <div className="w-full px-44">
          <div className="md:flex items-start pt-10">
            <div className="px-3 md:w-7/12 lg:pr-10">
              {details?.length > 1 ? (
                <>
                  <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                    <div className="pb-3">
                      <h7 className="font-extrabold uppercase text-xl">
                        Hotel & Room Details
                      </h7>
                    </div>
                    <div className="w-full mx-auto flex items-center rounded-lg p-3 bg-white border border-gray-200">
                      <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                        <img
                          src={`http://localhost:5000/Public/PROPERTY/${details?.[0].room?.room_images?.[0]?.image_path}`}
                        />
                      </div>
                      <div className="flex-grow pl-3">
                        <h7 className="font-bold uppercase">
                          {details?.[0].room?.property?.name}
                        </h7>
                        <div>
                          <h7 className="font-bold uppercase">
                            {details?.[0].room?.name}
                          </h7>
                        </div>
                        <p className="text-gray-500 font-medium">
                          {daysCheck}x{" "}
                        </p>
                        <p className="text-gray-500 font-medium">Night </p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">
                          Rp
                        </span>{" "}
                        <span className="font-semibold text-md">
                          {details?.[1].room?.price?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                    <div className="pb-3"></div>
                    <div className="w-full mx-auto flex items-center rounded-lg p-3 bg-white border border-gray-200">
                      <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                        <img
                          src={`http://localhost:5000/Public/PROPERTY/${details?.[1].room?.room_images?.[0]?.image_path}`}
                        />
                      </div>
                      <div className="flex-grow pl-3">
                        <h7 className="font-bold uppercase">
                          {details?.[1].room?.property?.name}
                        </h7>
                        <div>
                          <h7 className="font-bold uppercase">
                            {details?.[1].room?.name}
                          </h7>
                        </div>
                        <p className="text-gray-500 font-medium">
                          {daysCheck}x{" "}
                        </p>
                        <p className="text-gray-500 font-medium">Night </p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">
                          Rp
                        </span>{" "}
                        <span className="font-semibold text-md">
                          {details?.[1].room?.price?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                    <div className="pb-3">
                      <h7 className="font-extrabold uppercase text-xl">
                        Hotel & Room Details
                      </h7>
                    </div>
                    <div className="w-full mx-auto flex items-center rounded-lg p-3 bg-white border border-gray-200">
                      <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                        <img
                          src={`http://localhost:5000/Public/PROPERTY/${details?.[0]?.room?.room_images?.[0]?.image_path}`}
                        />
                      </div>
                      <div className="flex-grow pl-3">
                        <h7 className="font-bold uppercase">
                          {details?.[0]?.room?.property?.name}
                        </h7>
                        <div>
                          <h7 className="font-bold uppercase">
                            {details?.[0]?.room?.name}
                          </h7>
                        </div>
                        <p className="text-gray-500 font-medium">1x </p>
                        <p className="text-gray-500 font-medium">Night </p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">
                          Rp
                        </span>{" "}
                        <span className="font-semibold text-md">
                          {details?.[0]?.room?.price?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                    <div className="pb-3"></div>
                    <div className="w-full mx-auto flex items-center rounded-lg p-3 bg-white border border-gray-200">
                      <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                        <img
                          src={`http://localhost:5000/Public/PROPERTY/${details?.[1]?.room?.room_images?.[0]?.image_path}`}
                        />
                      </div>
                      <div className="flex-grow pl-3">
                        <h7 className="font-bold uppercase">
                          {details?.[1]?.room?.property?.name}
                        </h7>
                        <div>
                          <h7 className="font-bold uppercase">
                            {details?.[1]?.room?.name}
                          </h7>
                        </div>
                        <p className="text-gray-500 font-medium">
                          {daysCheck}x{" "}
                        </p>
                        <p className="text-gray-500 font-medium">Night </p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">
                          Rp
                        </span>{" "}
                        <span className="font-semibold text-md">
                          {details?.[1]?.room?.price?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="w-full mx-auto rounded-lg bg-gray-100 border text-gray-800  font-light mb-6 border-b border-gray-200 pb-6 p-3 ">
                <div className="w-full border-gray-200">
                  <div className="pb-3">
                    <h7 className="font-extrabold uppercase text-xl">
                      User Details
                    </h7>
                  </div>
                  <div className="w-full mx-auto flex-grow items-center rounded-lg p-3 bg-white border border-gray-200">
                    <div className="w-full justify-between flex mb-3 items-center">
                      <div className="flex">
                        <span className="text-gray-600">Username </span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold capitalize">
                          {details?.[0]?.user?.first_name}{" "}
                          {details?.[0]?.user?.last_name}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex justify-between mb-3 items-center">
                      <div className="flex">
                        <span className="text-gray-600">User Contact</span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold">
                          +62{details?.[0]?.user?.phone_number}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full justify-between items-center rounded-lg p-3 mb-6 bg-white border border-gray-200">
                <div className="mb-6 mt-6 border-gray-200 text-gray-800">
                  <div className="w-full flex items-center">
                    <div className="w-full flex justify-between pl-4 rounded-lg">
                      <span className="text-gray-600 font-semibold text-md">
                        Add Coupon
                      </span>
                    </div>
                    <div className="-mx-2 flex items-end justify-end">
                      <div className="flex-grow lg:max-w-xs">
                        <div>
                          <input
                            className="w-full px-10 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#c9403e] transition-colors"
                            placeholder="********"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="px-2">
                        <button className="block w-full max-w-xs mx-auto border border-transparent bg-[#c9403e] hover:bg-[#e58786] focus:bg-green-600 text-white rounded-md px-5 py-2 font-semibold">
                          APPLY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mx-auto rounded-lg bg-gray-100 border text-gray-800  font-light mb-6 border-gray-200 pb-6 p-3 ">
                <div className="w-full border-gray-200">
                  <div className="pb-3">
                    <h7 className="font-extrabold uppercase text-xl">
                      Pricing Details
                    </h7>
                  </div>
                  <div className="w-full mx-auto flex-grow items-center rounded-lg p-3 bg-white border border-gray-200">
                    <div className="w-full justify-between flex mb-3 items-center">
                      <div className="flex-grow">
                        <span className="text-gray-600">Subtotal </span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold text-gray-400 text-sm">
                          {daysCheck} Nights x Rp
                        </span>{" "}
                        <span className="font-semibold">700.000</span>
                      </div>
                    </div>
                    <div className="w-full flex justify-between mb-3 items-center">
                      <div className="flex">
                        <span className="text-gray-600">Total Room</span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold">{details?.length}</span>
                      </div>
                    </div>
                    <div className="w-full flex justify-between mb-3 border-b pb-3 items-center">
                      <div className="flex">
                        <span className="text-gray-600">Taxes</span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold">10%</span>
                      </div>
                    </div>
                    <div className="w-full flex border-gray-200 md:border-none text-gray-800 text-xl">
                      <div className="w-full flex items-center">
                        <div className="flex-grow">
                          <span className="text-gray-600">Total</span>
                        </div>
                        <div className="pl-3">
                          <span className="font-semibold text-gray-400 text-sm">
                            Rp
                          </span>{" "}
                          <span className="font-semibold">
                            {`${(
                              details?.[0]?.total_price * details?.length +
                              details?.[0]?.total_price * details?.length * 0.1
                            ).toLocaleString()}`}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 md:w-5/12">
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                <div className="pb-3">
                  <h7 className="font-extrabold uppercase text-xl">
                    Order Details
                  </h7>
                </div>
                <div className="w-full flex mb-3 items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-medium">No. Order</span>
                  </div>
                  <div className="flex-grow font-bold">
                    {details?.length > 1
                      ? 
                      <div className="flex truncate">
                      <p>
                       { details?.[0]?.order_id } &
                      </p>
                      <p className="pl-1">
                      {details?.[1]?.order_id}
                      </p>
                      </div>
                      
                      : details?.[0]?.order_id}
                  </div>
                </div>
                <div className="w-full flex mb-3 items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-medium">Check-in</span>
                  </div>
                  <div className="flex-grow font-bold">
                    {/* <span>{newStartDate ? newStartDate : null }</span> */}
                  </div>
                  <div className="w-32">
                    <span className="text-gray-600 font-medium pl-6">From</span>
                  </div>
                  <div className="flex-grow font-bold pl-6">
                    <span>14:00 WIB</span>
                  </div>
                </div>
                <div className="w-full flex mb-3 items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-medium">Check-out</span>
                  </div>
                  <div className="flex-grow font-bold">
                    {/* <span>{newEndDate ? newEndDate : null}</span> */}
                  </div>
                  <div className="w-32">
                    <span className="text-gray-600 font-medium pl-5">
                      Before
                    </span>
                  </div>
                  <div className="flex-grow font-bold pl-6">
                    <span>12:00 WIB</span>
                  </div>
                </div>
              </div>
              <div className="w-full mx-auto rounded-lg bg-gray-100 border border-gray-200 text-gray-800 font-light mb-6">
                <div className="w-full p-3 border-gray-200">
                  <div className="pb-3">
                    <h7 className="font-extrabold uppercase text-xl">
                      Select Destination Account
                    </h7>
                  </div>
                  <div className="w-full p-3">
                    <label
                      for="type2"
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-indigo-500"
                        name="type"
                        id="type2"
                      />
                      <img src={Bca} width="80" className="ml-3" />
                    </label>
                  </div>
                  <div className="grid">
                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                      Bank Central Asia
                    </label>
                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                      A/N PT. VCATION INDONESIA KREASI BANGSA
                    </label>
                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                      4971485218
                    </label>
                  </div>
                  <div className="w-full p-3">
                    <label
                      for="type2"
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-indigo-500"
                        name="type"
                        id="type2"
                      />
                      <img src={Bri} width="80" className="ml-3" />
                    </label>
                  </div>
                  <div className="grid">
                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                      Bank Rakyat Indonesia
                    </label>
                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                      A/N PT. VCATION INDONESIA KREASI BANGSA
                    </label>
                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                      039601000914569
                    </label>
                  </div>
                  <div>
                    <div className="pt-4">
                      <h7 className="font-bold text-s">Upload Payment Proof</h7>
                    </div>
                    <input
                      className="w-full px-3 py-2 mb-1 border bg-white border-gray-200 rounded-lg focus:outline-none focus:border-[#c9403e] transition-colors"
                      type="file"
                      id="formFile"
                      accept="image/*"
                      onChange={(e) => onImagesValidation(e)}
                    />
                    <label className="text-gray-600 font-normal text-sm mb-2 ml-1">
                      * Multiple file max 2MB (.jpg or .png only)
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <button className="block w-full max-w-xs mx-auto bg-[#c9403e] hover:bg-[#e58786] focus:bg-green-600 text-white rounded-lg px-3 py-2 font-semibold"
                onClick={() => uploadPayment()}
                disabled={payment}>
                  <i className="mdi mdi-lock-outline mr-1"></i> {loading? (<Loader />) : (payment ? "PAID" : "PAY NOW") }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Transaction;
