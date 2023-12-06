import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { SetLeafletMapContext } from "../../context/EditContextProvider"
import "leaflet/dist/leaflet.css";
import Legend from "./Legend";
import DisplayLayer from "./DisplayLayer";
import { Box } from "@mantine/core";
import { useEffect, useContext } from "react";



export default function Canvas() {
  return (
    <>
      <MapContainer
        center={[40.6482, -73.9442]}
        zoom={12}
        style={{
          width: "100%",
          height: "calc(100Vh - 60px)",
          zIndex: 125,
        }}
      >
        <TileLayer
          noWrap={true}
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <DisplayLayer />
        <Legend />
      </MapContainer>
      <Box style={{ position: "relative", top: "100%" }}>
        <Legend />
      </Box>
    </>
  );
}
