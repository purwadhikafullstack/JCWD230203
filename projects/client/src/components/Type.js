import React from "react";
import { GiBrickWall } from "react-icons/gi";
import {
  MdOutlineApartment,
  MdHouseSiding,
  MdOutlineHolidayVillage,
} from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import Filter from "./Filter";

const Type = () => {
  const sorting = [
    { title: "All Property", icon: <GiBrickWall /> },
    { title: "Apartments", icon: <MdOutlineApartment /> },
    { title: "Guest Houses", icon: <MdHouseSiding /> },
    { title: "Hotels", icon: <FaHotel /> },
    { title: "Villas", icon: <MdOutlineHolidayVillage /> },
  ];
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center  gap-3 sm:gap-4 h-8 my-4">
        {sorting.map((obj) => (
          <Filter title={obj.title} icon={obj.icon} />
        ))}
      </div>
    </div>
  );
};

export default Type;
