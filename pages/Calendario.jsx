import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import "../styles/Calendar.css";

function Calendario() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  }

  return (
    <div>
        <Header />
        <div className="calendar-page">
        <div className="calendar-container">
            <Calendar
            onChange={onChange}
            value={date}
            className="custom-calendar"
            />
        </div>
        </div>
        <Footer />
    </div>
  );
}

export default Calendario;
