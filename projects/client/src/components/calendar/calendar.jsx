// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// // import "@fullcalendar/core/main.css";
// // import "@fullcalendar/daygrid/main.css";
// // import "@fullcalendar/timegrid/main.css";


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Calendars(props){
  // console.log(props??rates?..details?.details?.[0]?.price)
  const params = useParams();
  const { id } = params;

  // const price = [
  //   {"date": "2023-03-10", "price": 100000}
  // ]
  
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


  let onCreateCalendar = async(btn, year1 = new Date().getUTCFullYear(), month1 = new Date().getMonth() + 1) => {
    try {
      const rates = await axios.get(`http://localhost:5000/transaction/rates?room_id=${id}`)

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
          rates?.data?.data?.forEach(value => {

            if((new Date(`${year1}-${month1.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })}-${i.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })}`).getTime() >= new Date(value?.start_date).getTime()) && (new Date(`${year1}-${month1.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })}-${i.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })}`).getTime() <= new Date(value?.end_date).getTime()) ){
              dates.push({date: i, discount: value?.event_rate?.discount, markup: value?.event_rate?.markup})
          }else{
              dates.push({date: i, discount: 0, markup: 0 })
          }
          })
      }
        setYear(year1)
        setMonth(month1)
        setDays(dates)
    }
    } catch (error) {
      console.log(error)
    }
}



useEffect(() => {
    onCreateCalendar()
}, [])

  return (
    <div className="container py-5 mx-6">
      <h1 className="text-3xl font-bold mb-3">Calendar</h1>
      <h5 className="text-lg font-medium mb-3">
        {year} - {listMonth[month]}
      </h5>
      <div>
        <div className="grid grid-cols-7 gap-2">
          {days
            ? days.map((value) => {
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
                              `${props?.rates?.startDate?.year}-${props?.rates?.startDate?.month}-${props?.rates?.startDate?.date}`
                            ).getTime() /
                              86400000 &&
                          new Date(`${year}-${month}-${value}`).getTime() /
                            86400000 <=
                            new Date(
                              `${props?.rates?.endDate?.year}-${props?.rates?.endDate?.month}-${props?.rates?.endDate?.date}`
                            ).getTime() /
                              86400000
                            ? "rounded-full bg-blue-500 text-white cursor-pointer"
                            : value < props?.rates?.startDate?.date &&
                              month <= props?.rates?.startDate?.month &&
                              year <= props?.rates?.startDate?.year
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
                          (value < props?.rates?.startDate?.date &&
                          month <= props?.rates?.startDate?.month &&
                          year <= props?.rates?.startDate?.year ) && (props?.rates?.endDate === null)
                            ? null
                            : () => props?.rates?.onSelectedDate(value, month, year, value.discount)
                        }
                      >
                        {value?.discount ? value?.discount : value?.date}
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
