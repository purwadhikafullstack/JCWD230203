import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes,Route } from 'react-router-dom';
import Register from "./pages/register/register";
import Activation from "./pages/activation/activation";
import Navbar from "./components/Navbar";
import Type from "./components/Type";
// import Carousel from "./components/carousel";
import Rentals from "./components/Rentals";
import Footer from "./components/Footer"

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // (async () => {
    //   const { data } = await axios.get(
    //     `${process.env.REACT_APP_API_BASE_URL}/greetings`
    //   );
    //   setMessage(data?.message || "");
    // })();
  }, []);

  return (
    <>
    <Navbar />
     {/* <Carousel /> */}
     <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3">
      <Type />
      <Rentals/>
      </div>
      <Footer/>
    <Routes>
      <Route path='/register' element={<Register />} />
      {/* <Route path='/activation/:id' element={<Activation />} /> */}
    </Routes>
    </>
  );
}

export default App;
