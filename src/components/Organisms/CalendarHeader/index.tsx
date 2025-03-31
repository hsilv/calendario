import React, { useContext } from "react";
import classNames from "classnames";
import styles from "./CalendarHeader.module.scss";
import { Button } from "@components/Atoms";
import {
  CalendarDisplayOptions,
  CalendarPagination,
} from "@components/Molecules";
import { CalendarHeaderProps } from "./types";
import { CalendarContext } from "@/context/Calendar/context";
import logo from "/Logo_Vialto-02.png";

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ onAddEvent }) => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("CalendarHeader must be used within a CalendarProvider");
  }

  const { currentDate, setCurrentDate, viewMode } = context;

  const monthNames = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "mes") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewMode === "semana") {
      newDate.setDate(newDate.getDate() + 7);
    } else if (viewMode === "agenda") {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "mes") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewMode === "semana") {
      newDate.setDate(newDate.getDate() - 7);
    } else if (viewMode === "agenda") {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className={classNames(styles.Container)}>
      <div className={classNames(styles.Title)}>
        <img src={logo} className={classNames(styles.Logo)} />
        <h1 className={classNames(styles.Heading)}>
          Programador Digital de Eventos
        </h1>
      </div>
      <Button
        variant="success"
        className={classNames(styles.Button)}
        onClick={onAddEvent}
      >
        Agregar Evento
      </Button>

      <div className={classNames(styles.Header)}>
        <CalendarPagination
          onNext={handleNext}
          onPrev={handlePrev}
          onToday={handleToday}
        />
        <h2
          className={classNames(styles.Heading)}
        >{`${currentMonth} DE ${currentYear}`}</h2>
        <CalendarDisplayOptions />
      </div>
    </div>
  );
};

export { CalendarHeader };
