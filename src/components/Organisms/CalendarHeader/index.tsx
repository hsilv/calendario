import React from "react";
import classNames from "classnames";
import styles from "./CalendarHeader.module.scss";
import { Button } from "@components/Atoms";
import {
  CalendarDisplayOptions,
  CalendarPagination,
} from "@components/Molecules";

const CalendarHeader: React.FC = () => {
  return (
    <div className={classNames(styles.Container)}>
      <h1 className={classNames(styles.Heading)}>Calendario de Eventos</h1>
      <Button variant="success" className={classNames(styles.Button)}>
        Agregar Evento
      </Button>

      <div className={classNames(styles.Header)}>
        <CalendarPagination />
        <h2 className={classNames(styles.Heading)}>MARZO DE 2025</h2>
        <CalendarDisplayOptions />
      </div>
    </div>
  );
};

export { CalendarHeader };
