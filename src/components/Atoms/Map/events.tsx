import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import classNames from "classnames";
import styles from "./Map.module.scss";
import { Event } from "@/types/Read/events";

// Mapeo de colores por estado
const statusColors: Record<string, string> = {
  ACTIVO: "#97d700",
  FINALIZADO: "gray",
  CANCELADO: "black",
  DENEGADO: "red",
  PENDIENTE: "orange",
};

// Función para generar íconos personalizados con colores distintos usando SVG
const createColoredIcon = (color: string) =>
  L.divIcon({
    className: "custom-icon",
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
        <path fill="${color}" d="M12.5 0C5.6 0 0 5.6 0 12.5 0 21.9 12.5 41 12.5 41S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z"/>
        <circle fill="#FFF" cx="12.5" cy="12.5" r="5"/>
      </svg>
    `,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

export interface EventMapProps {
  eventos: Event[];
  className?: string;
}

const EventMap: React.FC<EventMapProps> = ({ eventos, className }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (eventos && eventos.length > 0) {
      // Centra el mapa en el primer evento
      setPosition([
        eventos[0].extendedProps.latitud,
        eventos[0].extendedProps.longitud,
      ]);
    }
  }, [eventos]);

  if (!position) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ width: "100%", height: "500px" }}
      className={classNames(styles.Container, className)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {eventos.map((evento) => {
        console.log(evento.status);
        const color = statusColors[evento.extendedProps.status || "PENDIENTE"];
        return (
          <Marker
            key={evento.id}
            position={[
              evento.extendedProps.latitud,
              evento.extendedProps.longitud,
            ]}
            icon={createColoredIcon(color)}
          >
            <Popup>
              <strong>{evento.title}</strong>
              <br />
              {evento.extendedProps.descripcion}
              <br />
              <em>
                <strong>Lugar: </strong>
                {evento.extendedProps.lugar}
              </em>
              <br />
              <span>
                <strong>Comienza: </strong>
                {evento.fechai.toLocaleString()} - {evento.horai}
              </span>
              <br />
              <span>
                <strong>Finaliza: </strong>
                {evento.fechai.toLocaleString()} - {evento.horai}
              </span>
              <br />
              <span>
                <strong>Estado: </strong>
                {evento.extendedProps.status}
              </span>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export { EventMap };
