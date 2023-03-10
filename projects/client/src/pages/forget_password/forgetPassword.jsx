import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "components/loader/loader";

const ForgotPassword = () => {
    const [msg, setMsg] = useState("")
    const [email, setEMail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        const value = event.target.value
        console.log(value)
        if(value === ""){
            setMsg("Field Cannot Blank")
        }else if(!value.includes("@") || value.length < 10){
            setMsg("Input valid Email")
        }else{
            setMsg("")
        }
        setEMail(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        inputEmail(email)
    }

    const inputEmail = async(email) => {
        setLoading(true)
        try {
            const res = await axios.post('http://localhost:5000/users/forget-password',{email})

            toast.success(res.data.message)
        } catch (error) {
            setLoading(false)
            if(error.message){
                toast.error(error.response.data.message)
            }else{
                toast.error(error.message)
            }
            
        }finally{
            setLoading(false)
        }
    }


  return (
    <body className="font-mono my-bg-light">
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen px-6">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto my-bg-light hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage: `url('http://localhost:5000/Public/assets/receptionist-receiving-visitor-at-desk.png')`,
              }}
            ></div>

            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                <p className="mb-4 text-sm text-gray-700">
                  We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your
                  password!
                </p>
              </div>
              <form 
              onSubmit={handleSubmit}
              className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter Email Address..."
                    value={email}
                    onChange={handleChange}
                  />
                    <div className=" text-red-700 text-sm font-semibold ">
                        {msg ? msg : null}
                    </div>
                </div>
                <div className="mb-6 text-center">
                  <button className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline" type="submit">
                    {loading ? <Loader /> : "Reset Password"}
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="/register">
                    Create an Account!
                  </a>
                </div>
                <div className="text-center">
                  <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="/login">
                    Already have an account? Login!
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </body>
  );
};

export default ForgotPassword;
