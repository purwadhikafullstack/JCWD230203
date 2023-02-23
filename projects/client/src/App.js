import Navbar from "./components/Navbar";
import Type from "./components/Type";
// import Carousel from "./components/carousel";
import Rentals from "./components/Rentals";
import Footer from "./components/Footer"

function App() {
  return (
    <div className="">
      {/* Navbar */}
      <Navbar />
      {/* Carousel */}
      {/* <Carousel /> */}
      <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3">
      {/* Type */}
      <Type />
      {/* Rentals */}
      <Rentals/>
      </div>
      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default App;
