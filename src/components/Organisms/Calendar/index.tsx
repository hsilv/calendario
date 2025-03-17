import React from "react";
import styles from "./Calendar.module.scss";
import { Event } from "@components/Molecules/Event";
import { events as defaults } from "./placeholder";
import {
  getEndDayOfWeek,
  getDaysInMonth,
  getStartDayOfWeek,
  daysOfWeek,
} from "./utils";
import { CalendarProps } from "./types";

const Calendar: React.FC<CalendarProps> = ({ events = defaults }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
  const startDayOfWeek = getStartDayOfWeek(currentYear, currentMonth);
  const endDayOfWeek = getEndDayOfWeek(currentYear, currentMonth);

  const daysInPreviousMonth = getDaysInMonth(currentYear, currentMonth - 1);
  const daysFromPreviousMonth = startDayOfWeek;
  const daysFromNextMonth = 6 - endDayOfWeek;

  const days = [
    ...Array.from({ length: daysFromPreviousMonth }, (_, i) => ({
      day: daysInPreviousMonth - daysFromPreviousMonth + i + 1,
      currentMonth: false,
    })),
    ...Array.from({ length: daysInCurrentMonth }, (_, i) => ({
      day: i + 1,
      currentMonth: true,
    })),
    ...Array.from({ length: daysFromNextMonth }, (_, i) => ({
      day: i + 1,
      currentMonth: false,
    })),
  ];

  return (
    <div className={styles.CalendarContainer}>
      <div className={styles.Calendar}>
        <div className={styles.Header}>
          {daysOfWeek.map((day) => (
            <div key={day} className={styles.DayOfWeek}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.Days}>
          {days.map(({ day, currentMonth }, index) => (
            <div
              key={index}
              className={`${styles.Day} ${!currentMonth ? styles.Faded : ""}`}
            >
              <div className={styles.DayNumber}>{day}</div>
              {events
                .filter(
                  (event) => event.init_date.getDate() === day && currentMonth
                )
                .map((event, index) => (
                  <Event
                    key={index}
                    name={event.name}
                    desc={event.desc}
                    place={event.place}
                    init_date={event.init_date}
                    final_date={event.final_date}
                    lat={event.lat}
                    lng={event.lng}
                    parkings={event.parkings}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Calendar };
