import Type from "../../components/type/Type";
import Rentals from "../../components/rental/Rentals";
import Carousel from "../../components/carousel/carousel";

function Home(){
    return(
        <>
         <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3">
            {/* <Carousel /> */}
            <Type />
            <Rentals/>
        </div>
        </>
    )
}

export default Home;