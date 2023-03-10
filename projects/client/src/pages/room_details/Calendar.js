import React from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useState } from "react";
import { differenceInDays, addDays, eachDayOfInterval, format } from "date-fns";
import { Link } from "react-router-dom";

const CalendarFunc = (props) => {
  // console.log(props);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [prices, setPrices] = useState([]);

  const data = daysCheck;

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);

    const dates = eachDayOfInterval({ start: startDate, end: endDate });
    const newPrices = dates.map((date) => {
      const price = props.price;
      return {
        date: date,
        price: price,
      };
    });
    // update the price state
    setPrices(newPrices);
    // Update the start and end dates
    setStartDate(startDate);
    setEndDate(endDate);
  };

  // Generate an array of dates for selected Month
  const today = new Date();
  const year = startDate.getFullYear();
  const month = startDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [...Array(daysInMonth).keys()].map((i) => i + 1);

  const monthPrices = [...Array(daysInMonth)].map((_, i) => {
    const date = new Date(year, month, i + 1);
    const price = prices.find(
      (p) => format(p.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    return {
      date: date,
      price: price?.price || 0,
    };
  });

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const storeId = props.placesId;

  var daysCheck = differenceInDays(endDate, startDate);

  return (
    <div className="calendarHolder calendarHolder2">
      {props.buttonopenState && (
        <div className="absolute z-50 mt-12 right-0">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#c9403e"]}
            onChange={handleSelect}
          />
          {monthPrices.map((item) => {
            return (
              <div
                className="flex items-center justify-center py-2"
                style={{ height: "50px" }}
              >
                <span
                  className={`rounded-full h-6 w-6 flex items-center justify-center mr-2 ${
                    item.price > 0
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {item.price > 0 ? `$${item.price}` : item.date.getDate()}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {props.buttonopenState && (
        <button className="close-cal rounded-xl" onClick={props.closeFunc}>
          Close calendar
        </button>
      )}

      {daysCheck == 0 ? (
        <p className={daysCheck == 0 ? "days-0" : "days-updated"}>
          days selected = 0
        </p>
      ) : (
        <p className="days-updated">{daysCheck} days selected</p>
      )}

      {daysCheck == 0 ? (
        ""
      ) : (
        <Link
          to={`/checkout/${props.placesId}/${daysCheck}`}
          state={{ data: data }}
        >
          {" "}
          <button
            className={
              props.buttonCloseState === false
                ? "checkout-btn-after"
                : "checkout-btn"
            }
          >
            Proceed To checkout
          </button>{" "}
        </Link>
      )}
    </div>
  );
};

export default CalendarFunc;
