import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function RoomDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState([]);
    const [img, setImg] = useState([])

      const onGetData = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/properties/room-details?room_id=${id}`
          );
          setImg(res.data.data[0].room_images);
          setDetails(res.data.data)
          console.log(res.data.data[0])
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        onGetData();
      }, []);
    


  return (
    <>
      <section className="overflow-hidden text-neutral-700">
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-5">
          
          <div className="flex justify-center items-center h-full">
                <div className="px-6 py-12 md:px-12 text-white text-center">
                  <h3 className="mt-6 mb-4 text-black text-xl font-light leading-relaxed">
                  Room type:
                  </h3>
                  <u className="text-slate-700"> 
                  {/* disini ada bug, untuk nanti di mentoring */}
                  {details?.[0]?.name || "Loading.."}
                  </u>
                </div>
              </div>

          <div className="-m-1 flex flex-wrap md:-m-2">
                {
                  img ? img.map((value) => {
                    return(
                      <>
                      <div className="flex w-1/3 flex-wrap">
                        <div className="w-full p-1 md:p-2">
                      <img
                      alt="gallery"
                      className="block h-fit w-full rounded-lg object-cover object-center"
                      src={`http://localhost:5000/Public/PROPERTY/${value.image_path}`}
                    />
                      </div>
                    </div>
                      </>

                    )
                  }) : "Loading.."
                }
          </div>
        </div>
        <hr className="h-40 mx-10 mt-3 lg:mt-5" />
        
        {/* description */}
        <div className="desc">
          Description:  Still progress
        </div>
      </section>
      
    </>
  );
}

export default RoomDetails;