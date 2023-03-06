import React, {useRef, useState, useEffect} from "react";
import Date from "./../date/date";
import Location from "./../location/location";
import { useLocation } from "react-router-dom";
import axios from "axios";


function Carousel() {
  const location = useLocation();

  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    location: '',
  })

  const [city, setCity] = useState([])


  let getCity = async() => {
    try {
       const cities = await axios.get(`http://localhost:5000/properties/city`)
       setCity(cities.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  let getDate = async() => {
    try {
       const details = await axios.get(`http://localhost:5000/properties/search-date?check_in=${form.startDate}&check_out=${form.endDate}&city=${form.location}&page=1`)
       console.log(details)
       const searchData = details.data;
       const searchParams = new URLSearchParams({
         startDate: form.startDate,
         endDate: form.endDate,
         location: form.location,
         ...searchData
       });
       const redirectUrl = `/search-results?${searchParams.toString()}`;
       window.location.href = redirectUrl;
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCity();
  },[])

  // const [error, setError] = useState({
  //   startDate: '',
  //   endDate: '',
  //   location: ''
  // })
  
  const handleChange = (event) => {
    const {name, value} = event.target 
    const _form = {
      ...form,
      [name]: value
    }

    setForm(_form)

    // let _error = {...error}

    // for(const key in _form){
    //   if(!_form[key]){
    //     _error = {
    //       ..._error,
    //       [key]: "gaboleh kosong"
    //     }
    //   }
    // }
    // setError(_error)
  }


let handleSubmit = async(event) => {
  event.preventDefault();
  getDate();
}
  return (
    <>
    {location.pathname !== '/' ? null :
    <div className="container my-10 px-6 mx-auto">
    <section className="mb-10 text-gray-800">
      <div
        className="relative overflow-hidden bg-no-repeat bg-cover"
        style={{
          backgroundPosition: "50%",
          backgroundImage:
            "url('http://localhost:5000/Public/PROPERTY/logo.png')",
          height: "300px"
        }}
      ></div>
      <div className="container text-gray-800 px-4 md:px-12">
        <div
          className="block rounded-lg shadow-lg py-10 md:py-12 px-4 md:px-6"
          style={{
            marginTop: "-100px",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(30px)"
          }}
        >

          <div className="flex flex-wrap justify-center text-center lg:text-left">
            <div className="grow-0 shrink-0 basis-auto w-full xl:w-10/12 px-6">
              <div className="grid lg:grid-cols-4 gap-x-6 items-center">
                <div className="mb-10 lg:mb-0">
                  <div className="text-xl font-bold">
                    Start Date
                    <br />
                    <span className="text-blue-600">
                      <Date 
                      onChange={handleChange}
                      value={form.startDate}
                      name='startDate'/>
                    </span>
                    {/* <p className="text-lg my-main">{error.startDate}</p> */}
                  </div>
                </div>
                <div className="mb-10 lg:mb-0">
                  <div className="text-xl font-bold">
                    End Date
                    <br />
                    <span className="text-blue-600">
                    <Date 
                    onChange={handleChange}
                    value={form.endDate}
                    name='endDate'
                    />
                    </span>
                    {/* <p className="text-lg my-main">{error.endDate}</p> */}
                  </div>
                </div>
                <div className="mb-10 lg:mb-0">
                  <div className="text-xl font-bold">
                    Select Location
                    <br />
                    <span className="my-main">
                    <Location 
                    onChange={handleChange}
                    city={city}
                    value={form.location}
                    name="location" />
                    </span>
                    {/* <p className="text-lg my-main">{error.location}</p> */}
                  </div>
                </div>

                <div className="mb-6 md:mb-0">
                  <div className="md:flex flex-row">
                    {/* <input
                      type="text"
                      className="form-control block w-full px-4 py-2 mb-2 md:mb-0 md:mr-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Enter your email"
                    /> */}
                    <button
                      type="submit"
                      className="inline-block px-7 py-3 my-bg-main text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      onClick={handleSubmit}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
    }
    </>
  );
}

export default Carousel;