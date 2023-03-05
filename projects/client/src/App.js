import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes,Route, useLocation } from 'react-router-dom';
import Register from "./pages/register/register";
import Activation from "./pages/activation/activation";
import TenantActivation from "./pages/activation/tenantActivation"
import Login from "./pages/login/login";
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import {GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut} from 'firebase/auth'
import {auth} from './firebase'
import Dashboard from "./pages/dashboard/dashboard";
import Profiling from "./pages/profiling/userProfiling";
import Carousel from "components/carousel/carousel";
import Rentals from "./pages/rental/Rentals";
import Details from './pages/rental_details/RentalDetails'
import RoomDetails from "pages/room_details/roomDetails";
import EditProfile from "components/edit_profile/editProfile";


const provider = new GoogleAuthProvider();

function App() {
  const [username, setUsername] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [tenantRedirect, setTenantRedirect] = useState(false);


  const location = useLocation();

  useEffect(() => {
   checkIsLogin();
  }, []);
  
  let checkIsLogin = async() => {
    try {
      let getTokenId = localStorage.getItem('token') 
        if(getTokenId){
      let response = await axios.post(`http://localhost:5000/users/keep-login`, {},
      {headers: {
        'auth': getTokenId,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})

      if(response){
        setUsername(response.data.data.first_name)
      }else{
        setUsername('')
      }

      if(response.status === 201){
        setRedirect(true)
      }
    }
    } catch (error) {
      if(error.message ===  "Request failed with status code 400" || error.message ===  "Request failed with status code 404"){
        toast.error(error.response.data.message)
      }else{
        toast.error(error.message)
    }
    }
  }

  let onLogin = async(inputEmailOrPhoneNumber, inputPassword, checkbox) => {
    try {
        

        if(inputEmailOrPhoneNumber.length === 0 || inputPassword.length === 0) throw {message: "Field Cannot Blank"}

        // insert props into object
        let dataToSend = {emailOrPhone: inputEmailOrPhoneNumber, password: inputPassword}
        let response = await axios.post('http://localhost:5000/users/login/', dataToSend)
        console.log(response)
        
        if(checkbox){
          localStorage.setItem('token', `${response.data.data.token}` )
        }
        setUsername(response.data.data.findEmailAndPhoneNumber.first_name)
    
        toast.success("Login Success!")
        setTimeout(() => {
          setRedirect(true)
        }, 2000)

    } catch (error) {
      if(error.message ===  "Request failed with status code 400" || error.message ===  "Request failed with status code 404"){
        toast.error(error.response.data.message)
      }else{
        toast.error(error.message)
    }
    }
}

let tenantLogin = async(inputEmailOrPhoneNumber, inputPassword, checkbox) => {
  try {
      

      if(inputEmailOrPhoneNumber.length === 0 || inputPassword.length === 0) throw {message: "Field Cannot Blank"}

      // insert props into object
      let dataToSend = {emailOrPhone: inputEmailOrPhoneNumber, password: inputPassword}
      let response = await axios.post('http://localhost:5000/tenant/login/', dataToSend)
      console.log(response)
      
      if(checkbox){
        localStorage.setItem('tokenTid', `${response.data.data.token}` )
      }
      setTenantName(response.data.data.findEmailAndPhoneNumber.first_name)
  
      toast.success("Login Success!")
      setTimeout(() => {
        setTenantRedirect(true)
      }, 2000)

  } catch (error) {
    if(error.message ===  "Request failed with status code 400" || error.message ===  "Request failed with status code 404"){
      toast.error(error.response.data.message)
    }else{
      toast.error(error.message)
  }
  }
}

let onLoginWithGoogle = async() => {
  try {
    let response = await signInWithPopup(auth, provider)
    setUsername(response.user.displayName)
    setRedirect(true)
   
    localStorage.setItem('tokenUid', `${response.user.uid}` )
  } catch (error) {
    if(error.message ===  "Request failed with status code 400" || error.message ===  "Request failed with status code 404"){
      toast.error(error.response.data.message)
    }else{
      toast.error(error.message)
  }
  }
}

onAuthStateChanged(auth, (userFromFireBase) => {
  if(userFromFireBase){
    setUsername(userFromFireBase.displayName)
  }
})

let onLogout = async() => {
  try {
      localStorage.removeItem('token')
      setUsername('') // dan merubah username menjadi string kosong
      setRedirect(false)
      localStorage.removeItem('tokenTid')
      setUsername('')
      setRedirect(false)
      await signOut(auth)
      localStorage.removeItem('tokenUid')
      setUsername('')
      setRedirect(false) // jadi ketika ke trigger clik button logout maka redirect akan false
  } catch (error) {
    if(error.message ===  "Request failed with status code 400" || error.message ===  "Request failed with status code 404"){
      toast.error(error.response.data.message)
    }else{
      toast.error(error.message)
  }}
}



  return (
    <>
    <Navbar data={{username}} myFunc={{onLogout}} />
    <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3">
            <Carousel />
            {location.pathname !== '/' ? null :
            <>
            {/* <Type /> */}
            <Rentals />
            </>
            }
    </div>
    <Routes>
      <Route path='/register' element={<Register myGoogle={{onLoginWithGoogle}} />} />
      <Route path='/activation/:id' element={<Activation />} />
      <Route path='/login' element={<Login myFunc={{onLogin}} isRedirect={{redirect}} myGoogle={{onLoginWithGoogle}}/>}  />
      <Route path='/dashboard' element={<Dashboard name={{tenantName}} />} />
      <Route path='/tenant-register' element={<Register />} />
      <Route path='/tenant-activation/:id' element={<TenantActivation />} />
      <Route path='/tenant-login' element={<Login myFunc={{tenantLogin}} isRedirect={{tenantRedirect}} />} />
      <Route path='/user-profile' element={<Profiling />}/>
      <Route path='/details/:id' element={<Details />} />
      <Route path='/category/:id' element={<Rentals />} />
      <Route path='/room-details/:id' element={<RoomDetails />} />
      <Route path='/edit-profile' element={<EditProfile />} />
    </Routes>
    <Footer/>
    </>
  );
}
export default App;
