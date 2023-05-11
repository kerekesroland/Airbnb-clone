"use client";

import leaf, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";

// @ts-ignore
delete leaf.Icon.Default.prototype._getIconUrl;
leaf.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

//@ts-ignore
delete leaf.Icon.Default.prototype._getIconUrl;

leaf.Icon.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface IProps {
  center?: Array<number> | null;
}

const Location = ({ center }: IProps) => {
  return (
    <MapContainer
      center={(center as LatLngExpression) || [19, 23]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      touchZoom={false}
      style={{
        height: "300px",
        borderRadius: "15px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {center && <Marker position={center as leaf.LatLngExpression} />}
    </MapContainer>
  );
};

export default Location;
