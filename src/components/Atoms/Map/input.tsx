import React, { useEffect, useState, forwardRef } from "react";
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
import { ControllerRenderProps } from "react-hook-form";

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

interface MapInputProps {
  latProps: ControllerRenderProps;
  lngProps: ControllerRenderProps;
  className?: string;
}

const MapInput = forwardRef<HTMLInputElement, MapInputProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ latProps, lngProps, className }, ref) => {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [markerPosition, setMarkerPosition] = useState<
      [number, number] | null
    >(null);

    useEffect(() => {
      const latValue = parseFloat(latProps.value) || 0;
      const lngValue = parseFloat(lngProps.value) || 0;

      if (latValue && lngValue) {
        setPosition([latValue, lngValue]);
        setMarkerPosition([latValue, lngValue]);
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = [
              position.coords.latitude,
              position.coords.longitude,
            ] as [number, number];
            setPosition(coords);
            setMarkerPosition(coords);
            latProps.onChange(coords[0]);
            lngProps.onChange(coords[1]);
          },
          () => {
            const defaultPosition: [number, number] = [51.505, -0.09];
            setPosition(defaultPosition);
            setMarkerPosition(defaultPosition);
            latProps.onChange(defaultPosition[0]);
            lngProps.onChange(defaultPosition[1]);
          },
          { enableHighAccuracy: true, maximumAge: 0 }
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const MapClickHandler = () => {
      useMapEvents({
        click: (e) => {
          const newLatLng = [e.latlng.lat, e.latlng.lng] as [number, number];
          setMarkerPosition(newLatLng);
          latProps.onChange(newLatLng[0]);
          lngProps.onChange(newLatLng[1]);
        },
      });
      return null;
    };

    const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newLat = parseFloat(e.target.value);
      const newLng = markerPosition ? markerPosition[1] : 0;
      const newLatLng = [newLat, newLng] as [number, number];
      setMarkerPosition(newLatLng);
      latProps.onChange(newLat);
    };

    const handleLngChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newLng = parseFloat(e.target.value);
      const newLat = markerPosition ? markerPosition[0] : 0;
      const newLatLng = [newLat, newLng] as [number, number];
      setMarkerPosition(newLatLng);
      lngProps.onChange(newLng);
    };

    if (!position) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <MapContainer
          center={position}
          zoom={13}
          style={{ width: "100%", height: "300px" }}
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
        <div>
          <label>
            Latitud:
            <input
              type="number"
              step="any"
              value={markerPosition ? markerPosition[0] : ""}
              onChange={handleLatChange}
            />
          </label>
          <label>
            Longitud:
            <input
              type="number"
              step="any"
              value={markerPosition ? markerPosition[1] : ""}
              onChange={handleLngChange}
            />
          </label>
        </div>
      </>
    );
  }
);

export { MapInput };
