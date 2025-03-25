import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import classNames from "classnames";
import styles from "./Map.module.scss";

const DefaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const ParkingIcon = L.icon({
  iconRetinaUrl,
  iconUrl: "/parking.svg",
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Parqueo {
  latitud: number;
  longitud: number;
}

export interface ParkingMapProps {
  lat?: number;
  lng?: number;
  parqueos?: Parqueo[];
  className?: string;
}

const ParkingMap: React.FC<ParkingMapProps> = ({
  lat,
  lng,
  parqueos,
  className,
}) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      setPosition([lat, lng]);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [
            position.coords.latitude,
            position.coords.longitude,
          ] as [number, number];
          setPosition(coords);
        },
        () => {
          const defaultPosition: [number, number] = [51.505, -0.09];
          setPosition(defaultPosition);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }
  }, [lat, lng]);

  if (!position) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ width: "100%" }}
      className={classNames(styles.Container, className)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Marcador personalizado.</Popup>
      </Marker>
      {parqueos &&
        parqueos.map((parqueo, index) => (
          <Marker
            key={index}
            position={[parqueo.latitud, parqueo.longitud]}
            icon={ParkingIcon}
          >
            <Popup>Parqueo {index + 1}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export { ParkingMap };
