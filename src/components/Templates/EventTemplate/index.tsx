import classNames from "classnames";
import styles from "./EventTemplate.module.scss";
import React, { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Map } from "@/components/Atoms/Map";
import { ParkingMap } from "@/components/Atoms/Map/parkings";
import useEvent from "@/hooks/useEvent";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const EventTemplate: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { findOne, loading, event } = useEvent();

  useEffect(() => {
    if (id) findOne(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const lat = event?.extendedProps?.latitud ?? undefined;
  const lng = event?.extendedProps?.longitud ?? undefined;

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className={classNames(styles.Container)}>
      <div className={classNames(styles.Header)}>
        <Link to={"/"} replace>
          <button className={classNames(styles.BackButton)}>
            <FaArrowLeftLong />
          </button>
        </Link>
        <h2 className={classNames(styles.Heading)}>Detalles del evento</h2>
      </div>
      <div className={classNames(styles.Content)}>
        <h2>{event && event.title}</h2>
        <p>{event && event.extendedProps?.descripcion}</p>
        <div className={classNames(styles.Data)}>
          <span>
            <strong>Identificador: </strong>
            {id}
          </span>
          <span>
            <strong>Estimado de Asistentes: </strong>
            {event && event.estimado}
          </span>
          <span>
            <strong>Fecha y Hora de Inicio: </strong>
            {event && event.start} - {event && event.horai}
          </span>
          <span>
            <strong>Fecha y Hora de Cierre: </strong>
            {event && event.end} - {event && event.horaf}
          </span>
          <span>
            <strong>Parqueos a disponibilidad: </strong>
            {event && event.parqueosDisponibles}
          </span>
          <Map lat={lat} lng={lng} zoom={15} />
        </div>
        <h3>Parqueos</h3>
        <div className={classNames(styles.ParkingContainer)}>
          {event &&
            event.parqueos &&
            event.parqueos.map((parqueo) => (
              <div key={parqueo.id} className={classNames(styles.Parking)}>
                <span>
                  <strong>Descripción: </strong>
                  {parqueo.descripcion}
                </span>
                <span>
                  <strong>Dirección: </strong>
                  {parqueo.direccion}
                </span>
                <span>
                  <strong>Capacidad: </strong>
                  {parqueo.capacidad}
                </span>
                <span>
                  <strong>Reservados: </strong>
                  {parqueo.reservados}
                </span>
                <ParkingMap parqueos={[parqueo]} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export { EventTemplate };
