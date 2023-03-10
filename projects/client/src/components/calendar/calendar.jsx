import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

import { useState, useEffect } from "react";

export default function Calendars(props) {
  // const { price } = props;

  const price = [
    {"date": "2023-03-10", "price": 100000}
  ]
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [listMonth, setListMonth] = useState([
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [days, setDays] = useState(0);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  let onCreateCalendar = (btn, year1 = new Date().getUTCFullYear(), month1 = new Date().getMonth() + 1) => {
    if(btn === '+'){
        let curMonth = month 
        curMonth++
        let curYear = year

        if(curMonth === 13){
            curMonth = 1
            curYear++
        }

        let dates = [];

        for(let i=1; i<=new Date(curYear, curMonth, 0).getDate(); i++){
            dates.push(i)
        }
        console.log(dates)
        setYear(curYear)
        setMonth(curMonth)
        setDays(dates)
    }else if(btn === '-'){
        let curMonth = month 
        curMonth--
        let curYear = year

        if(curMonth === 0){
            curMonth = 12
            curYear--
        }

        let dates = [];

        for(let i=1; i<=new Date(curYear, curMonth, 0).getDate(); i++){
            dates.push(i)
        }
        setYear(curYear)
        setMonth(curMonth)
        setDays(dates)
    }else{
        console.log('>>>')
        let dates = [];

        for(let i=1; i<=new Date(year1, month1, 0).getDate(); i++){
            dates.push(i)
        }
        setYear(year1)
        setMonth(month1)
        setDays(dates)
    }
}

let onSelectedDate = (value, month, year) => {
    if(startDate === null){
        console.log('Masuk1')
        setStartDate({ date: value, month: month, year: year })
    }else if(startDate !== null && endDate === null){
        console.log('Masuk2')
        setEndDate({ date: value, month: month, year: year })
    }else if(startDate !== null && endDate !== null){
        console.log('Masuk3')
        setStartDate({ date: value, month: month, year: year })
        setEndDate(null)
    }
}

useEffect(() => {
    onCreateCalendar()
}, [])

  return (
    <div className="container py-5">
      <h1 className="text-3xl font-bold mb-3">Calendar</h1>
      <h5 className="text-lg font-medium mb-3">
        {year} - {listMonth[month]}
      </h5>
      <div>
        <div className="grid grid-cols-7 gap-2">
          {days
            ? days.map((value, price) => {
                console.log(value);
                return (
                  <>
                    <div
                      className="flex justify-center items-center py-2 h-12 bg-gray-100 cursor-pointer"
                      style={{ height: "50px" }}
                    >
                      <span
                        className={
                          new Date(`${year}-${month}-${value}`).getTime() /
                            86400000 >=
                            new Date(
                              `${startDate?.year}-${startDate?.month}-${startDate?.date}`
                            ).getTime() /
                              86400000 &&
                          new Date(`${year}-${month}-${value}`).getTime() /
                            86400000 <=
                            new Date(
                              `${endDate?.year}-${endDate?.month}-${endDate?.date}`
                            ).getTime() /
                              86400000
                            ? "rounded-full bg-blue-500 text-white cursor-pointer"
                            : value < startDate?.date &&
                              month <= startDate?.month &&
                              year <= startDate?.year
                            ? "text-gray-400 cursor-pointer"
                            : null
                        }
                        style={{
                          padding:
                            value.toString().length === 2
                              ? "9px 12px"
                              : "8px 16px",
                        }}
                        onClick={
                          (value < startDate?.date &&
                          month <= startDate?.month &&
                          year <= startDate?.year ) && (endDate === null)
                            ? null
                            : () => onSelectedDate(value, month, year)
                        }
                      >
                        {value}
                      </span>
                    </div>
                  </>
                );
              })
            : null}
        </div>
        <div className="py-3">
          <button
            onClick={() => onCreateCalendar("-")}
            className="btn btn-primary mr-1"
          >
            Prev
          </button>
          <button
            onClick={() => onCreateCalendar("+")}
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
