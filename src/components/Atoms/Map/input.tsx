/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Form, Container } from "react-bootstrap"; // Importamos React-Bootstrap

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import classNames from "classnames";
import styles from "./Map.module.scss";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

const DefaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  lat?: number;
  lng?: number;
  className?: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  latFieldName: string;
  lngFieldName: string;
}

const MapInput: React.FC<MapProps> = ({
  lat,
  lng,
  className,
  register,
  setValue,
  latFieldName,
  lngFieldName,
}) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      setPosition([lat, lng]);
      setMarkerPosition([lat, lng]);
      setValue(latFieldName, lat);
      setValue(lngFieldName, lng);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setPosition(coords);
          setMarkerPosition(coords);
          setValue(latFieldName, coords[0]);
          setValue(lngFieldName, coords[1]);
        },
        () => {
          const defaultPosition: [number, number] = [
            14.626897765589398, -90.5152577161789,
          ];
          setPosition(defaultPosition);
          setMarkerPosition(defaultPosition);
          setValue(latFieldName, defaultPosition[0]);
          setValue(lngFieldName, defaultPosition[1]);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }
  }, [lat, lng, setValue, latFieldName, lngFieldName]);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const newCoords: [number, number] = [e.latlng.lat, e.latlng.lng];
        setMarkerPosition(newCoords);
        setValue(latFieldName, newCoords[0]);
        setValue(lngFieldName, newCoords[1]);
      },
    });
    return null;
  };

  return (
    <Container className={classNames(styles.MapContainer)}>
      <MapContainer
        center={position || [14.626897765589398, -90.5152577161789]}
        zoom={13}
        className={className}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />
        {markerPosition && <Marker position={markerPosition} />}
      </MapContainer>
      <Form.Group>
        <Form.Label>Latitud</Form.Label>
        <Form.Control
          type="text"
          {...register(latFieldName)}
          value={markerPosition ? markerPosition[0] : ""}
          readOnly
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Longitud</Form.Label>
        <Form.Control
          type="text"
          {...register(lngFieldName)}
          value={markerPosition ? markerPosition[1] : ""}
          readOnly
        />
      </Form.Group>
    </Container>
  );
};

export { MapInput };
