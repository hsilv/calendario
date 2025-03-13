import React from "react";
import styles from "./Calendar.module.scss";

const daysOfWeek = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getStartDayOfWeek = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const getEndDayOfWeek = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDay();
};

const Calendar: React.FC = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
  const startDayOfWeek = getStartDayOfWeek(currentYear, currentMonth);
  const endDayOfWeek = getEndDayOfWeek(currentYear, currentMonth);

  const daysInPreviousMonth = getDaysInMonth(currentYear, currentMonth - 1);
  const daysFromPreviousMonth = startDayOfWeek;
  const daysFromNextMonth = 6 - endDayOfWeek;

  const events = [
    { date: 5, content: <div>Evento 1</div> },
    { date: 5, content: <div>Evento 2</div> },
    { date: 12, content: <div>Evento 3</div> },
    { date: 20, content: <div>Evento 4</div> },
  ];

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
              .filter((event) => event.date === day && currentMonth)
              .map((event, index) => (
                <div key={index} className={styles.Event}>
                  {event.content}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Calendar };
