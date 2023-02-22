import { useEffect, useState } from "react";


function Activation() {
    const [otp, setOtp] = useState('')
    

    let handleChange = (event) => {
        let inputValue = event.target.value
        if(inputValue.length <= 5)
        setOtp(inputValue)
    }

  return (
    <>
      <div className="wrapper flex justify-center py-[250px]">
        <div class="block max-w-md rounded-lg bg-white p-6 shadow-lg ">
            <div className="p text-4xl flex justify-center mb-5">Activation Form</div>
          <form>
            <div class="grid grid-cols-2 gap-4">
              <div class="relative mb-6" data-te-input-wrapper-init>
                <input
                  type="number"
                  class="peer block min-h-[auto] text-black w-full rounded border-0 mt-5 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="inputOTP"
                  aria-describedby="inputOTP"
                  placeholder="Input correct otp"
                  value={otp}
                  onChange={handleChange}
                />
                <label
                  for="inputOTP"
                  class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[1.50rem] leading-[1.6] text-neutral-200 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-black"
                >
                  Input OTP
                </label>
              </div>
              
              <button
                type="submit"
                class="w-full rounded my-bg-button-dark px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Activation;
