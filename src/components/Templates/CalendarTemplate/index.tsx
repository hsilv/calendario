import React, { useState } from "react";
import styles from "./CalendarTemplate.module.scss";
import classNames from "classnames";
import { CalendarHeader } from "@/components/Organisms/CalendarHeader";
import { Calendar } from "@/components/Organisms/Calendar";
import { AddEventModal } from "@/components/Molecules/AddEventModal";

const CalendarTemplate: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <div className={classNames(styles.Container)}>
      <CalendarHeader onAddEvent={() => setShow(true)} />
      <Calendar />
      <AddEventModal show={show} onHide={() => setShow(false)} />
    </div>
  );
};

export { CalendarTemplate };
