import React, { useState, useEffect } from 'react';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Kalenteri luotu kirjaston React-big-calendar avulla: https://www.npmjs.com/package/react-big-calendar

dayjs.extend(utc);

export default function TrainingCalendar() {
    const [trainings, setTrainings] = useState([]);
    const localizer = dayjsLocalizer(dayjs);

    const fetchTrainings = async () => {
        try {
          const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings");
          const data = await response.json();
          setTrainings(data);
        } catch (error) {
          console.error("Failed to fetch trainings:", error);
        }
      };

      const events = trainings.map(training => ({
        title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
        start: dayjs(training.date).toDate(),
        end: dayjs(training.date).add(training.duration, "minutes").toDate(),
        description: training.activity,
      }));

      useEffect(() => {
        fetchTrainings();
      }, []);

      return (
        <div className="TrainingCalendar">
            <h1>Training Calendar</h1>
            <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500}}
            />
        </div>
      )
}