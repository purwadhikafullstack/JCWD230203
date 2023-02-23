import React from "react";
import house1 from "../assets/apartment-jakarta-gandaria-gandariaheights-1-1.webp";
import house2 from "../assets/apartment-jakarta-kbybaru-botanica-1-2.webp";
import house3 from "../assets/guesthouse-jakarta-rempoa-rumahbumi-1-2.jpg";
import house4 from "../assets/hotel-bali-nusadua-theapurva-1-1.webp";
import house5 from "../assets/villa-bandung-dago-bumiandung-1-1.webp";
import Rental from "../components/Rental";

const Rentals = () => {
  const rentals = [
    { title: "Nusa Dua, Bali", image: house4, price: "4.500.000" },
    { title: "Dago, Bandung", image: house5, price: "2.000.000" },
    { title: "Gandaria, Jakarta", image: house1, price: "1.600.000" },
    { title: "Kebayoran Baru, Jakarta", image: house2, price: "2.700.000" },
    { title: "Rempoa, Jakarta", image: house3, price: "100.000" },
    { title: "Nusa Dua, Bali", image: house4, price: "4.500.000" },
    { title: "Dago, Bandung", image: house5, price: "2.000.000" },
    { title: "Gandaria, Jakarta", image: house1, price: "1.600.000" },
    { title: "Kebayoran Baru, Jakarta", image: house2, price: "2.700.000" },
    { title: "Rempoa, Jakarta", image: house3, price: "100.000" },
    { title: "Nusa Dua, Bali", image: house4, price: "4.500.000" },
    { title: "Dago, Bandung", image: house5, price: "2.000.000" },
    { title: "Gandaria, Jakarta", image: house1, price: "1.600.000" },
    { title: "Kebayoran Baru, Jakarta", image: house2, price: "2.700.000" },
    { title: "Rempoa, Jakarta", image: house3, price: "100.000" },
    { title: "Nusa Dua, Bali", image: house4, price: "4.500.000" },
    { title: "Dago, Bandung", image: house5, price: "2.000.000" },
    { title: "Gandaria, Jakarta", image: house1, price: "1.600.000" },
    { title: "Kebayoran Baru, Jakarta", image: house2, price: "2.700.000" },
    { title: "Rempoa, Jakarta", image: house3, price: "100.000" },
    { title: "Nusa Dua, Bali", image: house4, price: "4.500.000" },
    { title: "Dago, Bandung", image: house5, price: "2.000.000" },
    { title: "Gandaria, Jakarta", image: house1, price: "1.600.000" },
    { title: "Kebayoran Baru, Jakarta", image: house2, price: "2.700.000" },
    { title: "Rempoa, Jakarta", image: house3, price: "100.000" },


  ];
  return (
    <div className="py-3 sm:py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {rentals.map((rental) => (
          <Rental
            title={rental.title}
            image={rental.image}
            price={rental.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Rentals;
