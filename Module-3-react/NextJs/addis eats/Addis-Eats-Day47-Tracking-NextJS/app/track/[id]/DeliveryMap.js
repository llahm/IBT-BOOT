"use client";

import { useEffect } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FitMap({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length) map.fitBounds(points, { padding: [35, 35], maxZoom: 15 });
  }, [map, points]);
  return null;
}

export default function DeliveryMap({ courier, destination }) {
  const courierPosition = [courier.latitude, courier.longitude];
  const destinationPosition = [destination.latitude, destination.longitude];
  const points = [courierPosition, destinationPosition];

  return (
    <MapContainer center={courierPosition} zoom={14} scrollWheelZoom={false} className="delivery-leaflet-map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <CircleMarker center={courierPosition} radius={10} pathOptions={{ color: "#fff", fillColor: "#e85d04", fillOpacity: 1, weight: 3 }}>
        <Popup>Courier: {courier.name}</Popup>
      </CircleMarker>
      <CircleMarker center={destinationPosition} radius={10} pathOptions={{ color: "#fff", fillColor: "#34735b", fillOpacity: 1, weight: 3 }}>
        <Popup>Delivery destination</Popup>
      </CircleMarker>
      <FitMap points={points} />
    </MapContainer>
  );
}
