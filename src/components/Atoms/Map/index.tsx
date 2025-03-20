import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import classNames from "classnames";

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
}

const Map: React.FC<MapProps> = ({ lat, lng, className }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      setPosition([lat, lng]);
      setMarkerPosition([lat, lng]);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [
            position.coords.latitude,
            position.coords.longitude,
          ] as [number, number];
          setPosition(coords);
          setMarkerPosition(coords);
        },
        () => {
          const defaultPosition: [number, number] = [51.505, -0.09];
          setPosition(defaultPosition);
          setMarkerPosition(defaultPosition);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }
  }, [lat, lng]);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  if (!position) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ width: "100%" }}
      className={classNames(className)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>
            Marcador personalizado. <br /> Puedes moverlo.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export { Map };
