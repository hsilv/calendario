import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./EventTemplate.module.scss";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Map } from "@/components/Atoms/Map";
import { ParkingMap } from "@/components/Atoms/Map/parkings";
import useEvent from "@/hooks/useEvent";
import { Link, useParams } from "react-router-dom";
import { Form, Spinner } from "react-bootstrap";
import { Button } from "@/components/Atoms";

const PmtEventTemplate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { findOne, updateStatus, loading, event } = useEvent();
  const [selectedStatus, setSelectedStatus] = useState<number>(5); // Default to "PENDIENTE"
  const [updating, setUpdating] = useState<boolean>(false); // Spinner for updating status

  const reverseStatusMap: Record<string, number> = {
    ACTIVO: 1,
    FINALIZADO: 2,
    CANCELADO: 3,
    DENEGADO: 4,
    PENDIENTE: 5,
  };

  useEffect(() => {
    if (id) {
      findOne(id).then(() => {
        if (event?.extendedProps?.status) {
          setSelectedStatus(reverseStatusMap[event.extendedProps.status]); // Set default status
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(Number(e.target.value));
  };

  const handleUpdateStatus = async () => {
    if (id) {
      setUpdating(true);
      await updateStatus(Number(id), selectedStatus);
      await findOne(id);
      setUpdating(false);
    }
  };

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
        <Link to={"/pmt"} replace>
          <button className={classNames(styles.BackButton)}>
            <FaArrowLeftLong />
          </button>
        </Link>
        <h2 className={classNames(styles.Heading)}>Detalles del evento</h2>
      </div>

      <div className={classNames(styles.Form)}>
        <Form.Select
          value={selectedStatus}
          onChange={handleStatusChange}
          disabled={updating}
        >
          <option value={1}>ACTIVO</option>
          <option value={2}>FINALIZADO</option>
          <option value={3}>CANCELADO</option>
          <option value={4}>DENEGADO</option>
          <option value={5}>PENDIENTE</option>
        </Form.Select>

        <Button onClick={handleUpdateStatus} disabled={updating}>
          {updating ? (
            <Spinner
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
          ) : null}
          {updating ? "Actualizando..." : "Actualizar estado"}
        </Button>
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
            <strong>Estado: </strong>
            {event && event.extendedProps.status}
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
          <Map
            lat={event?.extendedProps?.latitud}
            lng={event?.extendedProps?.longitud}
            zoom={15}
          />
        </div>
        {event && event.parqueos && <h3>Parqueos</h3>}
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

export { PmtEventTemplate };
