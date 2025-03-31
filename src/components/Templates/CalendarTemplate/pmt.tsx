import React, { useEffect, useState } from "react";
import styles from "./CalendarTemplate.module.scss";
import classNames from "classnames";
import { CalendarHeader } from "@/components/Organisms/CalendarHeader";
import { Calendar } from "@/components/Organisms/Calendar";
import { AddEventModal } from "@/components/Molecules/AddEventModal";
import useEvent from "@/hooks/useEvent";
import { EventMap } from "@/components/Atoms/Map/events";
import { FaDotCircle } from "react-icons/fa";

const PmtCalendarTemplate: React.FC = () => {
  const [show, setShow] = useState(false);
  const { findAll, events } = useEvent();

  useEffect(() => {
    findAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classNames(styles.Container)}>
      <CalendarHeader
        pmt
        onAddEvent={() => setShow(true)}
        currentDate={new Date(2026, 1, 1)}
      />
      <Calendar events={events} pmt />
      <div>
        <div className={classNames(styles.Heading)}>
          <FaDotCircle className={classNames(styles.ACTIVO)} />
          ACTIVO
        </div>
        <div className={classNames(styles.Heading)}>
          <FaDotCircle className={classNames(styles.PENDIENTE)} />
          PENDIENTE
        </div>
        <div className={classNames(styles.Heading)}>
          <FaDotCircle className={classNames(styles.CANCELADO)} />
          CANCELADO
        </div>
        <div className={classNames(styles.Heading)}>
          <FaDotCircle className={classNames(styles.FINALIZADO)} />
          FINALIZADO
        </div>
        <div className={classNames(styles.Heading)}>
          <FaDotCircle className={classNames(styles.DENEGADO)} />
          DENEGADO
        </div>
      </div>
      <EventMap eventos={events} />
      <AddEventModal show={show} onHide={() => setShow(false)} pmt />
    </div>
  );
};

export { PmtCalendarTemplate };
