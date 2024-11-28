import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './EventCalendar.css';

const EventCalendar = () => {
  const [date, setDate] = useState(new Date());
  const events = [
    { date: "2024-12-01", title: "AI Workshop" },
    { date: "2024-12-05", title: "Football Match" },
  ];

  const getEventsForDate = (selectedDate) => {
    return events.filter(
      (event) => event.date === selectedDate.toISOString().split("T")[0]
    );
  };

  return (
    <div className="calendar-container">
      <h2>Event Calendar</h2>
      <Calendar onChange={setDate} value={date} />
      <div className="event-list">
        <h3>Events on {date.toDateString()}</h3>
        {getEventsForDate(date).length > 0 ? (
          getEventsForDate(date).map((event, index) => (
            <div key={index} className="event-item">
              <strong>{event.title}</strong>
            </div>
          ))
        ) : (
          <p>No events for this date.</p>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
