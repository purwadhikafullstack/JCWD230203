import React, { useState, createContext }  from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { differenceInDays,  toDate, format } from "date-fns";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "./../../components/modal/modal";
import Calendars from "components/calendar/calendar";

export const DateContext = createContext(null);

const CalendarFunc = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dates, setDates] = useState({ startDate: null, endDate: null });
  const [rates, setRates] = useState([]);
  const [newPrice, setNewPrice] = useState(0);
  const [days, setDays] = useState(0)
  // const [selectedDate, setSelectedDate] = useState(null);

  const room_id = props?.placesId;
  const base_price = props?.details?.[0]?.price;

  
  // console.log(startDate?.date)
  // console.log(endDate?.date)

  // const startDateObj = startDate
  // const newStartDate = toDate(new Date(startDateObj?.year, startDateObj?.month - 1, startDateObj?.date))
  // const _newStartDate = format(newStartDate, "yyyy-MM-dd");
  // const newEndDate = format(parseISO(endDate), "yyyy-MM-dd");
  // console.log(_newStartDate)
  // console.log(newEndDate)

  var daysCheck = (dates?.endDate?.date - dates?.startDate?.date);
  console.log(dates?.endDate?.discount)



  
  // const data = daysCheck;

  const handleSelect = async (startDate, endDate) => {
    setDates({ startDate, endDate });
    // try {
    //   // setStartDate(ranges.selection.startDate);
    //   setStartDate(startDate);
    //   // setEndDate(ranges.selection.endDate);
    //   setEndDate(endDate);
    //   // checking the rates or discount
    //   const _rates = await axios.get(
    //     `http://localhost:5000/transaction/rates?room_id=${props.placesId}`
    //   );
    //   setRates(_rates?.data?.data);

    //   let new_price = base_price;
    //   console.log(new_price)
    //   // fo teh itteration to find each rates
    //   for (const rate of rates) {
    //     const rateStartDate = new Date(rate.start_date);
    //     rateStartDate.setHours(0, 0, 0, 0); // set time to midnight

    //     const rateEndDate = new Date(rate.end_date);
    //     rateEndDate.setHours(0, 0, 0, 0); // set time to midnight

    //     const selectionStartDate = new Date(ranges.selection.startDate);
    //     selectionStartDate.setHours(0, 0, 0, 0); // set time to midnight

    //     const selectionEndDate = new Date(ranges.selection.endDate);
    //     selectionEndDate.setHours(0, 0, 0, 0); // set time to midnight

    //     //  checking the match or date and
    //     if (
    //       ranges.selection.startDate >= rateStartDate &&
    //       ranges.selection.endDate <= rateEndDate
    //     ) {
    //       if (rate.event_rate.discount) {
    //         new_price = new_price - (base_price * rate.event_rate.discount / 100);
    //       } else if (rate.event_rate.markup) {
    //         new_price += base_price * rate.event_rate.markup;
    //       }
    //     }
    //   }

    //   var daysCheck = differenceInDays(endDate, startDate);
    //   setNewPrice(new_price);
    //   setDays(daysCheck)
    //   props.onSelectedDate(newPrice, daysCheck, rates)


    // } catch (error) {
    //   console.log(error);
    // }
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <DateContext.Provider value={{ dates, setDates }}>
    <div className="calendarHolder calendarHolder2">
      {props.buttonopenState && (
        // <DateRangePicker
        //   rates={props}
        //   ranges={[selectionRange]}
        //   minDate={new Date()}
        //   rangeColors={["#c9403e"]}
        //   onChange={handleSelect}
        //   details={props}
        // />
        <Calendars 
        rates={props}
        onChange={handleSelect}
        details={props}/>
      )}


      {props.buttonopenState && (
        <button className="close-cal rounded-xl" onClick={props.closeFunc}>
          Close calendar
        </button>
      )}

      {isNaN(daysCheck) || daysCheck === 0 ? (
        ""
      ) : (
        <>
        <button
          data-te-target="#transaction"
          data-te-toggle="modal"
          className={
            props.buttonCloseState === false
              ? "checkout-btn-after"
              : "checkout-btn"
          }
        >
          <Modal
            daysCheck={daysCheck}
            placeId={room_id}
            details={props?.details}
            discount={dates?.endDate?.discount}
            markup={dates?.endDate?.markup}
            startDate={dates?.startDate}
            endDate={dates?.endDate}
            totalGuest={props.totalGuest}
          />{" "}
          Proceed To checkout
        </button>{" "}
      </>
      )}

      
    </div>
    </DateContext.Provider>
  );
};

export default CalendarFunc;