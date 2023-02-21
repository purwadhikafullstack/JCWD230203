
import { Routes,Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Footer from './components/footer/footer';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';

import {GoogleAuthProvider, getAuth,
signInWithPopup,
onAuthStateChanged,
signOut} from 'firebase/auth'

// import {auth} from './firebase'
import { GiConsoleController } from 'react-icons/gi';

 


// const provider = new GoogleAuthProvider();
// const auth = getAuth();

function App() {
  // const [username, setUsername] = useState('')
  // const [redirect, setRedirect] = useState(false)

  // let onLoginWithGoogle = async() => {
  //   try {
  //     let response = await signInWithPopup(auth, provider)
  //     console.log(response)
  //     setUsername(response.user.displayName)
  //     setRedirect(true)
     
  //     localStorage.setItem('tokenUid', `${response.user.uid}` )
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  // onAuthStateChanged(auth, (userFromFireBase) => {
  //   if(userFromFireBase){
  //     setUsername(userFromFireBase.displayName)
  //   }
  // })



  return (
    <>
    <Navbar />
    <Home />
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />}  />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
