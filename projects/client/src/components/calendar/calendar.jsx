import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

export default function Calendars() {
  return (
    <div className="calendar-container">

            <FullCalendar
              defaultView="dayGridMonth"
              themeSystem="Simplex"
              header={{
                left: "prev,next",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              plugins={[dayGridPlugin, timeGridPlugin]}
              events={[
                { title: "All Day Event", start: new Date("2023-03-05") },
              ]}
              displayEventEnd="true"
              eventColor={
                "#" + Math.floor(Math.random() * 16777215).toString(16)
              }
            />
    </div>
  );
}
