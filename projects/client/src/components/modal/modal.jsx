import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import { Navigate } from "react-router-dom";

function Modal() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false)




  const onSubmit = async(data) => {
    try {

      let getTokenId = localStorage.getItem('token')

      if(data.length === 0) throw {message: "Field cannot blank"}
      if(!data.email.includes("@") || data.email.length < 10 ) throw {message: 'email must contain @ and contain at least 10 char'}
      if(data.phone_number.length < 9) throw {message: 'Phone Number not Valid'}

      if(getTokenId){
        let res = await axios.patch(`http://localhost:5000/users/edit`, 
        {first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        gender: data.gender,
        phone_number: data.phone_number,
        address: data.address,
        birth_date: data.birth_date},
        {
          headers: {
            auth: getTokenId,
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        })
        if(res.status === 200){
        toast.success("Update Profile Success")
        return <Navigate to='/user-profile' />
        }
        setLoading(true)
      }
    } catch (error) {
      if(error.message ===  "Request failed with status code 400" || error.message ===  "Request failed with status code 404"){
        setLoading(false)
        toast.error(error.response.data.message)
      }else{
        toast.error(error.message)
    }
    }
  };

  useEffect(() => {
    
    if(loading){
      setTimeout(() => {
        reset({
          first_name: '',
          last_name: '',
          email: '',
          gender: '',
          phone_number: '',
          address: '',
          birth_date: '',
        });
        setLoading(false)
      }, 2000);
    }
  }, [loading, reset]);



  return (
    <>
      <button
        type="button"
        className="block w-full my-main text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline  hover:shadow-xs "
        data-te-toggle="modal"
        data-te-target="#staticBackdrop"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        Edit Profile
      </button>

      <div
        data-te-modal-init
        className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="staticBackdrop"
        data-te-backdrop="static"
        data-te-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
        >
          <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5
                className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="editProfile"
              >
                Edit Profile
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* <h1 className="text-white font-thin text-center pb-4 border-b border-solid border-gray-500">
                  Async Set Form Values
                </h1> */}
            {/* modal */}
            <div data-te-modal-body-ref className="relative p-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-2xl mx-auto"
              >
                <div className="form bg-gray-900 max-w-md mx-auto p-6 rounded-lg">
                  {/* first_name */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="first_name"
                  >
                    First name
                  </label>
                  <input
                    className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4"
                    type="text"
                    {...register("first_name")}
                    id="first_name"
                  />
                  {/* last_name */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="last_name"
                  >
                    Last name
                  </label>
                  <input
                    className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4"
                    type="text"
                    {...register("last_name")}
                    id="last_name"
                  />
                  {/* email */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4"
                    type="text"
                    {...register("email")}
                    id="email"
                  />
                  {/* gender */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <select {...register("gender")} className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4">
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                  {/* Phone Number */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="phone_number"
                  >
                    Phone Number
                  </label>
                  <input
                    className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4"
                    type="number"
                    {...register("phone_number")}
                    id="phone_number"
                  />
                  {/* address */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4"
                    type="text"
                    {...register("address")}
                    id="address"
                  />

                  {/* birthdate */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="birth_date"
                  >
                    Birth date
                  </label>
                  <input
                    className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4"
                    type="date"
                    {...register("birth_date")}
                    id="birth_date"
                  />

                  <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <button
                      type="button"
                      className="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                      data-te-modal-dismiss
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-1 inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default Modal;
