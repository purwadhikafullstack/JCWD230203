import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes,Route } from 'react-router-dom';
import Register from "./pages/register/register";
import Activation from "./pages/activation/activation";

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
    <Routes>
      <Route path='/register' element={<Register />} />
      {/* <Route path='/activation/:id' element={<Activation />} /> */}
    </Routes>
    </>
  );
}

export default App;
