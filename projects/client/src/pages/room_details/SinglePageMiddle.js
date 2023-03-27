import React , { useEffect, useState} from 'react'
import "../../supports/styles/SinglePageMiddle.css"
import section3 from "../../supports/styles/av.png"
import { useParams } from 'react-router-dom'
import { FaStar, FaBath, FaShower,FaSmoking, FaSmokingBan } from "react-icons/fa"
// import { placesStore } from './../../supports/assets/Store'
import rev1 from "../../supports/styles/stars1.png"
import rev2 from "../../supports/styles/stars2.png"
import reviews from "../../supports/styles/rev.png";
import modalPic from "../../supports/styles/pic.png"
import {GiHeatHaze, GiRobe} from "react-icons/gi"
import { BsPersonCircle , BsBoxSeamFill, BsWifi} from "react-icons/bs"
import {MdRestaurantMenu, MdTv, MdBathtub, MdDry, MdDesk, MdCable} from "react-icons/md"
import {CgSmartHomeRefrigerator} from "react-icons/cg"
import {TbAirConditioning} from "react-icons/tb"
import axios from "axios"
import Review from 'components/review/review'



const SinglePageMiddle = (props) => {
    const params = useParams();
    const { id } = params;
    const [accommodation, setAccommodation] = useState([])

    useEffect(() => {
        roomConnector();
    }, [])

    const roomConnector = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/properties/room-connector?room_id=${id}`
          );
          setAccommodation(res.data.data);
        } catch (error) {
          console.log(error);
        }
      };


      const symbolReact = [
          <BsPersonCircle />,
          <MdRestaurantMenu />,
          <CgSmartHomeRefrigerator />,
          <TbAirConditioning />,
          <MdTv />,
          <FaBath />,
          <FaShower />,
          <GiHeatHaze />,
          <MdBathtub />,
          <MdDry />,
          <BsBoxSeamFill />,
          <GiRobe />,
          <MdDesk />,
          <BsWifi />,
          <MdCable />,
          <FaSmoking />,
          <FaSmokingBan />
      ]

      const mappedData = accommodation.map((data) => {
          const symbolIndex = data.id - 1;
          const symbol = symbolReact[symbolIndex]
          return {...data, symbol}
      })



    // const placeClicked = placesStore.find((item) => item.id === id)

    // const { stars } = placeClicked || {}

    console.log(props?.details.length > 0)

    return (<div>

        <p className='spmLine text-gray-300'>__________________________________________________________________________________________________________</p>

        <div className='section1-hold'>
            <img src='http://localhost:5000/Public/assets/logo.png' className='w-36' />

            <p>Every booking includes free protection from Host cancellations,
                listing inaccuracies, and other issues like trouble checking in.</p>

            <p className='font-bold text-xl underline'>Learn more</p>
        </div>

        <p className='spmLine2 text-gray-300'>__________________________________________________________________________________________________________</p>

        <div className='section2-hold capitalize mb-2'>
            {props?.details?.[0]?.description}
        </div>

        <div className='section3'>
            {/* <img src={section3} className="c" /> */}
            {mappedData.length === 0 ? null : <div className="container my-14 px-6 mx-auto">
          <div className="text-2xl font-bold mb-4 flex shrink-0 pt-4">Accommodation Available in this Room</div>
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mappedData &&
              mappedData.map((value, index) => {
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

        <p className='spmLine3 text-gray-300'>__________________________________________________________________________________________________________</p>


      {localStorage.getItem("token")  && props?.details.length > 0 ?
      <>
        <div className='spm-star flex '>
            <span className='text-3xl pr-2 font-semibold leading-7 lg:leading-9 text-gray-800'>{props?.details?.[0]?.rating ? props?.details?.[0]?.rating : 5 }</span> <FaStar className='text-2xl mt-1 my-rating' /> 
        </div>

        {/* <p className='spm-rev text-2xl'>{stars}</p> */}

        {/* <div className='star-calc-hold'>

            <img src={rev1} className="spm-pic" />
            <img src={rev2} className="spm-pic" />

        </div> */}

        <div className='review-hold'>
            <Review className="spm-review" details={props?.details} />
        </div>
      </>
      :
       null
       }

        <button className='' onClick={(e) => e.preventDefault()}></button>

    </div>)

}

export default SinglePageMiddle