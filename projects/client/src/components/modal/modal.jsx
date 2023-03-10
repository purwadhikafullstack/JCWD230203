import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import date from "date-fns/esm/locale/da/index.js";
import Loader from "../loader/loader"

function Modal(props) {
  const { register, handleSubmit, reset } = useForm({
    // defaultValues: {
    //   email: props?.profile?.email, 
    //   first_name: props?.profile?.first_name, 
    //   last_name: props?.profile?.last_name, 
    //   gender: props?.profile?.gender,
    //   phone_number: props?.profile?.phone_number,
    //   status: props?.profile?.status,
    //   address: props?.profile?.address,
    //   birth_date: props?.profile?.birth_date,
    //   picture_path: props?.profile?.picture_path
    // }
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [msg, setMsg] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  const [triggerClose, setTriggerClose ] = useState({
    editProfile: false,
    changePicture: false,
    changePassword: false
  })

  // const editProfileModalRef = useRef()


//  useEffect(() => {
//     return() => {
//       setTriggerClose(false)
//     }
//  }, [])

  // useEffect(() => {
  //   setShowEditProfile(props.showEditProfile);
  // }, [props.showEditProfile]);

  // useEffect(() => {
  //   setShowChangePicture(props.showChangePicture);
  // }, [props.showChangePicture]);

  // useEffect(() => {
  //   setShowChangePassword(props.showChangePassword);
  // }, [props.showChangePassword]);

  let getTokenId = localStorage.getItem("token");

  const onSubmit = async (data) => {
    try {
      if (data.length === 0) throw { message: "Field cannot blank" };
      if (!data.email.includes("@") || data.email.length < 10)
        throw { message: "email must contain @ and contain at least 10 char" };
      if (data.phone_number.length < 9)
        throw { message: "Phone Number not Valid" };
        console.log("masuk1")

      
      if (getTokenId) {
        let res = await axios.patch(
          `http://localhost:5000/users/edit`,
          {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            gender: data.gender,
            phone_number: data.phone_number,
            address: data.address,
            birth_date: data.birth_date,
          },
          {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(true);

        toast.success("Update Profile Success");
      }
    } catch (error) {
      setLoading(false);
      if (
        error.message === "Request failed with status code 400" ||
        error.message === "Request failed with status code 404"
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }finally{
      setLoading(false)
    }
  };



  let onImagesValidation = (e) => {
    try {
      let files = [...e.target.files];

      if (files.length > 2) throw { message: "Select Just 1 Image!" };

      files.forEach((value) => {
        if (value.size > 2000000)
          throw { message: `${value.name} more than 100kb` };
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
  };

  let onSubmitPP = async () => {
    try {
      let fd = new FormData();
      if (!selectedImages) throw { message: "please Upload Your Image" };
      selectedImages.forEach((value) => {
        fd.append("images", value);
      });

      if (getTokenId) {
        let res = await axios.patch(
          `http://localhost:5000/users/profile-picture`,
          fd,
          {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Update Profile Picture Success");

          if (res.status === 200) {
            navigate("/user-profile")
          }

      }
    } catch (error) {
      if (
        error.message === "Request failed with status code 400" ||
        error.message === "Request failed with status code 404"
      ) {
        setLoading(false);
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const validatePassword = (e) => {
    if (e === "") {
      setMsg("Field Cannot Blank ");
    } else if (e.length < 8) {
      setMsg("Password Cannot les than 8 Char");
    } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(e)) {
      setMsg("Password must contains letter and any number");
    } else {
      setMsg("");
    }
  };

  const validateNewPassword = (e) => {
    if (e === "") {
      setMsg("Field Cannot Blank ");
    } else if (e.length < 8) {
      setMsg("Password Cannot les than 8 Char");
    } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(e)) {
      setMsg("Password must contains letter and any number");
    } else {
      setMsg("");
    }
  };

  const changePassword = async (data) => {
    
    try {
      setDisable(true);
      setLoading(true)
      if (getTokenId) {
        let res = await axios.post(`http://localhost:5000/users/change-password`,
        {
          old_password: data.old_password,
          new_password: data.new_password
        },
        {
          headers: {
            auth: getTokenId,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })

        if (res.status === 200) {
          toast.success(res.data.message);
          return <Navigate to="/user-profile" />;
        }
      }
    } catch (error) {
      setLoading(false)
      if(error.message){
        toast.error(error.response.data.message)
      }else{
        console.log(error.message)
        toast.error(error.message)
      }
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    onSubmit();
    // onSubmitPP();

    if (loading) {
      setTimeout(() => {
        reset({
          first_name: "",
          last_name: "",
          email: "",
          gender: "",
          phone_number: "",
          address: "",
          birth_date: "",
          formFile: "",
          old_password: "",
          new_password: ""
        });
        setLoading(false);
      }, 2000);
    }
  }, [loading, reset]);

  return (
    <>
      {/* Change Description Modal */}

          <div
            data-te-modal-init
            className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="editProfile"
            data-te-backdrop="static"
            data-te-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
            // ref={editProfileModalRef}
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
                        defaultValue={props?.profile?.first_name}
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
                        defaultValue={props?.profile?.last_name}
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
                        defaultValue={props?.profile?.email}
                      />
                      {/* gender */}
                      <label
                        className="block mb-3 text-white font-medium"
                        htmlFor="gender"
                      >
                        Gender
                      </label>
                      <select
                        {...register("gender")}
                        className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4"
                        name="gender"
                      >
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
                        defaultValue={props?.profile?.phone_number}
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
                        defaultValue={props?.profile?.address}
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
                        defaultValue={props?.profile?.birth_date}
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
                          {loading ? <Loader /> : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

      {/* Change Profile Picture Modal */}

          <div
            data-te-modal-init
            className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="changePicture"
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
                    Change Picture
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

                <div data-te-modal-body-ref className="relative p-4">
                  <form
                    onSubmit={handleSubmit(onSubmitPP)}
                    className="max-w-2xl mx-auto"
                  >
                    <div className="form bg-gray-900 max-w-md mx-auto p-6 rounded-lg">
                      <div className="flex justify-center">
                        <div className="mb-3 w-96">
                          <label
                            htmlFor="formFile"
                            className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                          >
                            Upload Your Picture
                          </label>
                          <input
                            className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
                            type="file"
                            id="formFile"
                            accept="image/*"
                            multiple
                            onChange={(e) => onImagesValidation(e)}
                          />
                        </div>
                      </div>

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
          </div>


          {/* Change Password */}
          <div
            data-te-modal-init
            className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="changePassword"
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
                    Change Password
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

                <div data-te-modal-body-ref className="relative p-4">
                  <form
                    onSubmit={handleSubmit(changePassword)}
                    className="max-w-2xl mx-auto"
                  >
                    <div className="form grid bg-gray-900 max-w-md mx-auto p-6 rounded-lg">
                      {/* old password */}
                      <label
                        className="block mb-3 text-white font-medium"
                        htmlFor="old_password"
                      >
                        Old Password
                      </label>
                      <div className="relative">
                        <input
                          className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4"
                          type={showPassword ? "text" : "password"}
                          {...register("old_password")}
                          id="old_password"
                          onChange={(e) => validatePassword(e.target.value)}
                          placeholder="Input Your Old Password"
                        />
                        <div className="absolute password-icon text-2xl right-5 top-3.5 my-main">
                        {showPassword ? (
                          <AiFillEye
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          />
                        ) : (
                          <AiFillEyeInvisible
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          />
                        )}
                        </div>
                      </div>

                      {/* New Password */}
                      <label
                        className="block mb-3 text-white font-medium"
                        htmlFor="new_password"
                      >
                        New Password
                      </label>
                      <div className="relative">
                      <input
                        className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4"
                        type={showNewPassword ? "text" : "password"}
                        {...register("new_password")}
                        onChange={(e) => validateNewPassword(e.target.value)}
                        id="new_password"
                        placeholder="Input New Password"
                      />
                      <div className="absolute password-icon my-main text-2xl right-5 top-3.5">
                        {showNewPassword ? (
                          <AiFillEye
                            onClick={() =>
                              setShowNewPassword((showNewPassword) => !showNewPassword)
                            }
                          />
                        ) : (
                          <AiFillEyeInvisible
                            onClick={() =>
                              setShowNewPassword((showNewPassword) => !showNewPassword)
                            }
                          />
                        )}
                      </div>
                      <div className=" text-red-700 text-sm font-semibold ">
                        {msg ? msg : null}
                      </div>
                      </div>

                      <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        <button
                          type="button"
                          className="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                          data-te-modal-dismiss
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          onClick={() =>
                            props.handleClosePassword("changePassword")
                          }
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="ml-1 inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          {loading ? <Loader /> : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Toaster />
    </>
  );
}

export default Modal;
