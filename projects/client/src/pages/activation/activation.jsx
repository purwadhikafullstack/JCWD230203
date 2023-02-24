import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


function Activation() {
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState('')
    const [isActive, setActive] = useState(false)
    const [clickCount, setClickCount] = useState(0)

    let handleChange = async(event) => {
        let inputValue = event.target.value;
        if(inputValue.length <= 5)
        setOtp(inputValue)
    }

    let {id} = useParams()


    let onSend = async(event) => {
      event.preventDefault();
      try {

        let dataSend = {
          id : id,
          otp: otp
        }

        let confirmation = await axios.post(`http://localhost:5000/users/activation/${id}`, dataSend)
        console.log(confirmation)

        toast.success("User Validate Success")
        setActive(true)
        
        
      } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
      }
    }

    
    let onResend = async(event) => {
      event.preventDefault();
      try {
        if (clickCount >= 5) {
          return;
        }

        setLoading(true)
        let resend = await axios.post(`http://localhost:5000/users/resend-otp/${id}`)
        toast.success("Check your Email")
        setClickCount(clickCount + 1)
        setLoading(false)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }

  
  if(isActive){
    <Navigate to="/login" />
  }

  return (
    <>
      <div className="wrapper flex justify-center py-[250px]">
        <div className="block max-w-md rounded-lg bg-white p-6 shadow-lg ">
            <div className="p text-4xl flex justify-center mb-5">Activation Form</div>
          <form>
              <div className="relative mb-10" data-te-input-wrapper-init>
                <input
                  type="number"
                  className="peer block min-h-[auto] text-black w-full rounded border-0 bg-transparent pt-8 px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="inputOTP"
                  aria-describedby="inputOTP"
                  placeholder="Input correct otp"
                  value={otp}
                  onChange={handleChange}
                />
                <label
                  for="inputOTP"
                  className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[1.50rem] leading-[1.6] text-neutral-200 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-black"
                >
                  Input OTP
                </label>
              </div>
              
              {isActive ? <button
              type="submit"
              className="w-full rounded my-bg-button-dark px-6 py-2.5  text-lg font-semibold uppercase leading-tight text-black shadow-md transition duration-150 ease-in-out hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg"
              data-te-ripple-init
              data-te-ripple-color="light" 
              disabled>
                Go to Login Page
              </button>
                : 
              <button
              type="submit"
              className="w-full rounded my-bg-button-dark px-6 py-2.5  text-lg font-semibold uppercase leading-tight text-black shadow-md transition duration-150 ease-in-out hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={(event) => onSend(event)}
              
            >
              Activate
            </button >}

              <div class="flex items-center my-4 before:flex-1 before:border-t before:border-black before:mt-0.5 after:flex-1 after:border-t after:border-black after:mt-0.5">
                Or <a href="" className="pl-1 text-blue-700" onClick={(event) => onSend(event)} > Click here to activate by link</a>
              </div>
              
              <div className="flex justify-center items-center mt-3">
                <span className="pr-3">
                  OTP expired ?
                </span>
                {clickCount < 5 ? <span className="my-main pointer">
                  {loading ? 'Loading..' : <button  onClick={(event) => onResend(event)}>Click here!</button>}
                </span> : <p>Maximum request OTP is 5 Times</p>}
              </div>
          </form>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default Activation;
