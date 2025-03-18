import React, { useContext } from "react";
import classNames from "classnames";
import styles from "./Calendar.module.scss";
import { Event } from "@components/Molecules/Event";
import { events as defaults } from "./placeholder";
import {
  getEndDayOfWeek,
  getDaysInMonth,
  getStartDayOfWeek,
  daysOfWeek,
  transformEvents,
} from "./utils";
import { CalendarProps } from "./types";
import { CalendarContext } from "@/context/Calendar/context";

const Calendar: React.FC<CalendarProps> = ({ events = defaults }) => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("CalendarHeader must be used within a CalendarProvider");
  }

  const { currentDate } = context;

  const transformedEvents = transformEvents(events);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const today = new Date();

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
          {days.map(({ day, currentMonth: isCurrentMonth }, index) => {
            const isToday =
              isCurrentMonth &&
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();

            return (
              <div
                key={index}
                className={classNames(styles.Day, {
                  [styles.Faded]: !isCurrentMonth,
                  [styles.Today]: isToday,
                })}
              >
                <div className={styles.DayNumber}>{day}</div>
                {transformedEvents
                  .filter(
                    (event) =>
                      event.fechai.getFullYear() === currentYear &&
                      event.fechai.getMonth() === currentMonth &&
                      event.fechai.getDate() === day &&
                      isCurrentMonth
                  )
                  .map((event, index) => {
                    const lat = parseFloat(event.extendedProps.latitud);
                    const lng = parseFloat(event.extendedProps.longitud);
                    return (
                      <Event
                        key={index}
                        name={event.title}
                        desc={event.extendedProps.descripcion}
                        place={event.extendedProps.lugar}
                        init_date={event.fechai}
                        final_date={event.fechaf}
                        lat={isNaN(lat) ? 0 : lat}
                        lng={isNaN(lng) ? 0 : lng}
                        parkings={0}
                      />
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { Calendar };
