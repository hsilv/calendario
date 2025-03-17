import React, { useEffect, useState } from "react";
import styles from "./CalendarTemplate.module.scss";
import classNames from "classnames";
import { CalendarHeader } from "@/components/Organisms/CalendarHeader";
import { Calendar } from "@/components/Organisms/Calendar";
import { AddEventModal } from "@/components/Molecules/AddEventModal";
import useEvent from "@/hooks/useEvent";

const CalendarTemplate: React.FC = () => {
  const [show, setShow] = useState(false);
  const { findAll, events } = useEvent();

  useEffect(() => {
    findAll();
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <div className={classNames(styles.Container)}>
      <CalendarHeader
        onAddEvent={() => setShow(true)}
        currentDate={new Date(2026, 1, 1)}
      />
      <Calendar />
      <AddEventModal show={show} onHide={() => setShow(false)} />
    </div>
  );
};

export { CalendarTemplate };
