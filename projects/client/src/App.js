import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes,Route } from 'react-router-dom';
import Register from "./pages/register/register";
import Activation from "./pages/activation/activation";
import Login from "./pages/login/login";
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar";

function App() {
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false)

  // useEffect(() => {
  //   // (async () => {
  //   //   const { data } = await axios.get(
  //   //     `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //   //   );
  //   //   setMessage(data?.message || "");
  //   // })();
  // }, []);

  let onLogin = async(inputEmailOrPhoneNumber, inputPassword) => {
    try {
        

        if(inputEmailOrPhoneNumber.length === 0 || inputPassword.length === 0) throw {message: "Field Cannot Blank"}

        // insert props into object
        let dataToSend = {emailOrPhone: inputEmailOrPhoneNumber, password: inputPassword}
        let response = await axios.post('http://localhost:5000/users/login/', dataToSend)
        console.log(response)
        
      
        localStorage.setItem('token', `${response.data.data.token}` ) // JSON.stringify(dataToSave) stringify untuk merubha object menjadi string 
        toast.success("Login Success!")
        setTimeout(() => {
          setRedirect(true)
        }, 2000)

    } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
    }
}



  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/activation/:id' element={<Activation />} />
      <Route path='/login' element={<Login myFunc={{onLogin}} isRedirect={{redirect}}/>} />
    </Routes>
    </>

  );
}

export default App;
