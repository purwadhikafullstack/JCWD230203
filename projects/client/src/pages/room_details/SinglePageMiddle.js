import React , { useEffect, useState} from 'react'
import "../../supports/styles/SinglePageMiddle.css"
import { useParams } from 'react-router-dom'
import { FaStar, FaBath, FaShower,FaSmoking, FaSmokingBan } from "react-icons/fa"
import {GiHeatHaze, GiRobe} from "react-icons/gi"
import { BsPersonCircle , BsBoxSeamFill, BsWifi} from "react-icons/bs"
import {MdRestaurantMenu, MdTv, MdBathtub, MdDry, MdDesk, MdCable} from "react-icons/md"
import {CgSmartHomeRefrigerator} from "react-icons/cg"
import {TbAirConditioning} from "react-icons/tb"
import axios from "axios"
import Review from 'components/review/review'
import TextArea from 'components/textarea/textarea'



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
            `${process.env.REACT_APP_API_BASE_URL}properties/room-connector?room_id=${id}`
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

      console.log(props?.details)

    return (
      <>
        <div className='logo mt-10 md:mt-[-70px]'>
            <img src={`${process.env.REACT_APP_API_BASE_URL}Public/assets/logo.png`} className='w-36' />
        </div>
        <div className='border-b pb-5'>
          <div className='flex flex-col capitalize'>
            <div className="up text-xl font-semibold py-5">
              Benefits
            </div>
            <p className='text-justify'>Every booking includes free protection from Host cancellations,
                listing inaccuracies,{"\n"} 
                and other issues like trouble checking in.</p>
            <div className='text-xl font-semibold py-5'>
              Room Description
            </div>
            <div className='text-justify'>
            {props?.details?.[0]?.description}
            </div>
          </div>
        </div>

        {mappedData.length === 0 ? null : (
          <div className="my-8 border-b pb-10">
            <h2 className="text-2xl font-bold mb-2">
              Accommodation Available in this Room
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {mappedData.map((value, index) => (
                <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
                  <div className="p-3 mr-4 bg-gray-100 rounded-full">
                    {value?.symbol}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{value?.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {props?.details?.length > 0 ?
      <>
        <div className='flex items-center pt-5 md:mt-5 '>
            <span className='pr-5 text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800' >Reviews</span>
            <span className='pr-2 font-semibold leading-7 lg:leading-9 text-xl lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800 '>{props?.details?.[0]?.rating ? props?.details?.[0]?.rating : 5 }</span> 
            <FaStar className='my-rating' /> 
        </div>
        <div className=''>
            <Review className="" details={props?.details} />
        </div>
        <div className=''>
        <TextArea details={props?.details}/>
        </div>
      </>
      :
       null
       }


</>
)

}

export default SinglePageMiddle