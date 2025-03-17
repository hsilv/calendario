import React from "react";
import { EventProps } from "./types";
import classNames from "classnames";
import styles from "./Event.module.scss";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { FaDotCircle } from "react-icons/fa";
import { Map } from "@components/Atoms/Map";

const Event: React.FC<EventProps> = ({
  name,
  desc,
  init_date,
  final_date,
  place,
  parkings,
}) => {
  const popover = (
    <Popover className={classNames(styles.Popover)}>
      <Popover.Header as="h3" className={classNames(styles.Header)}>
        {name}
      </Popover.Header>
      <Popover.Body className={classNames(styles.Body)}>
        <div className={classNames(styles.EventBody)}>
          <span>{desc}</span>
          {init_date && (
            <span>
              <strong>Fecha y hora de inicio: </strong>
              {init_date.toLocaleDateString()} {init_date.toLocaleTimeString()}
            </span>
          )}
          {final_date && (
            <span>
              <strong>Fecha y hora de cierre: </strong>
              {final_date.toLocaleDateString()}{" "}
              {final_date.toLocaleTimeString()}
            </span>
          )}
          <span>
            <strong>Lugar: </strong>
            {place}
          </span>
          <span>
            <strong>Parqueos disponibles: </strong>
            {parkings}
          </span>
          <Map className={classNames(styles.Map)} />
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
      <div className={classNames(styles.Container)}>
        <FaDotCircle className={classNames(styles.Icon)} />
        {name}
      </div>
    </OverlayTrigger>
  );
};

export { Event };
