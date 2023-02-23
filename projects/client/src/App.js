import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes,Route } from 'react-router-dom';
import Register from "./pages/register/register";
import Activation from "./pages/activation/activation";
import Login from "./pages/login/login";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [message, setMessage] = useState("");

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
        
        console.log(inputEmailOrPhoneNumber)
        console.log(inputPassword)

        if(inputEmailOrPhoneNumber.length === 0 || inputPassword.length === 0) throw {message: "Field Cannot Blank"}

        // insert props into object
        let dataToSend = {username: inputEmailOrPhoneNumber, password: inputPassword}
        let response = await axios.post('http://localhost:5000/users/login/', dataToSend)
        // console.log(response.data.data.findUsernameAndPassword.username)
        // ini mendapatkan inputan dari front-end tanpa validasi backend
        // let response = await axios.post('http://localhost:2023/users/login', {username: inputUsername, password: inputPassword}) 
        // if(response.data.length === 0) throw{message: "Account not found"}
        // ini validasi menggunakan backend
        
        // if(response.data.length === 0) throw{message: "Account not found"} // ini digunakan jika menggunakan validasi front end
        // let dataToSave = {
        //   id: response.data.data.token,
        //   username: response.data.data.username // [0] arrray 0 karena data yang diberikan dari server hanya 1 index
        // } //jika menggunakan username, mmaka harus dimasukkan kedalam variable
        // localStorage.setItem('token', `${response.data.data.token}` ) // JSON.stringify(dataToSave) stringify untuk merubha object menjadi string 
        // setUsername(response.data.data.findUsernameAndPassword.username)
        // toast.success("Login Success!")
        // setTimeout(() => {
        //   setRedirect(true)
        // }, 2000)

    } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
    }
}

 



  return (
    <>
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/activation/:id' element={<Activation />} />
      <Route path='/login' element={<Login myFunc={{onLogin}}/>} />
    </Routes>
    </>

  );
}

export default App;
