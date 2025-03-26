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

  const { currentDate, viewMode } = context;

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

  const combineDateAndTime = (date: Date, time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const combinedDate = new Date(date);
    combinedDate.setHours(hours, minutes);
    return combinedDate;
  };

  const renderMonthView = () => (
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

          const dayOfWeek = (startDayOfWeek + index) % 7;
          const placement =
            dayOfWeek === 4 || dayOfWeek === 5 ? "left" : "right";

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
                  const lat = event.extendedProps.latitud;
                  const lng = event.extendedProps.longitud;
                  const initDate = combineDateAndTime(
                    event.fechai,
                    event.horai
                  );
                  const finalDate = combineDateAndTime(
                    event.fechaf,
                    event.horaf
                  );
                  return (
                    <Event
                      id={event.id}
                      key={index}
                      name={event.title}
                      desc={event.extendedProps.descripcion}
                      place={event.extendedProps.lugar}
                      init_date={initDate}
                      final_date={finalDate}
                      lat={isNaN(lat) ? 0 : lat}
                      lng={isNaN(lng) ? 0 : lng}
                      availables={event.parqueosDisponibles}
                      parqueos={event.parqueos}
                      placement={placement}
                    />
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderWeekView = () => {
    const startOfWeek = currentDate.getDate() - currentDate.getDay();
    const weekDays = Array.from(
      { length: 7 },
      (_, i) => new Date(currentYear, currentMonth, startOfWeek + i)
    );

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
          {weekDays.map((date, index) => {
            const day = date.getDate();
            const isToday =
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();

            const dayOfWeek = (startDayOfWeek + index) % 7;
            const placement =
              dayOfWeek === 4 || dayOfWeek === 5 ? "left" : "right";

            return (
              <div
                key={index}
                className={classNames(styles.Day, { [styles.Today]: isToday })}
                style={{ minHeight: "500px", maxHeight: "500px" }}
              >
                <div className={styles.DayNumber}>{day}</div>
                {transformedEvents
                  .filter(
                    (event) =>
                      event.fechai.getFullYear() === currentYear &&
                      event.fechai.getMonth() === currentMonth &&
                      event.fechai.getDate() === day
                  )
                  .map((event, index) => {
                    const lat = event.extendedProps.latitud;
                    const lng = event.extendedProps.longitud;
                    const initDate = combineDateAndTime(
                      event.fechai,
                      event.horai
                    );
                    const finalDate = combineDateAndTime(
                      event.fechaf,
                      event.horaf
                    );
                    return (
                      <Event
                        id={event.id}
                        key={index}
                        name={event.title}
                        desc={event.extendedProps.descripcion}
                        place={event.extendedProps.lugar}
                        init_date={initDate}
                        final_date={finalDate}
                        lat={isNaN(lat) ? 0 : lat}
                        lng={isNaN(lng) ? 0 : lng}
                        availables={event.parqueosDisponibles}
                        parqueos={event.parqueos}
                        placement={placement}
                      />
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAgendaView = () => {
    const day = currentDate.getDate();
    const isToday =
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    return (
      <div className={styles.AgendaView}>
        <div
          className={classNames(styles.Day, { [styles.Today]: isToday })}
          style={{ minHeight: "unset", maxHeight: "unset", height: "auto" }}
        >
          <div className={styles.DayNumber}>
            {daysOfWeek[currentDate.getDay()]} {day}
          </div>
          {transformedEvents
            .filter(
              (event) =>
                event.fechai.getFullYear() === currentYear &&
                event.fechai.getMonth() === currentMonth &&
                event.fechai.getDate() === day
            )
            .map((event, index) => {
              const lat = event.extendedProps.latitud;
              const lng = event.extendedProps.longitud;
              const initDate = combineDateAndTime(event.fechai, event.horai);
              const finalDate = combineDateAndTime(event.fechaf, event.horaf);
              return (
                <Event
                  id={event.id}
                  key={index}
                  name={event.title}
                  desc={event.extendedProps.descripcion}
                  place={event.extendedProps.lugar}
                  init_date={initDate}
                  final_date={finalDate}
                  lat={isNaN(lat) ? 0 : lat}
                  lng={isNaN(lng) ? 0 : lng}
                  availables={event.parqueosDisponibles}
                  parqueos={event.parqueos}
                  placement="bottom"
                />
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.CalendarContainer}>
      {viewMode === "mes" && renderMonthView()}
      {viewMode === "semana" && renderWeekView()}
      {viewMode === "agenda" && renderAgendaView()}
    </div>
  );
};

export { Calendar };
