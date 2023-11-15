import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Paper } from "@mantine/core";
import Legend from "./Legend";

export default function Canvas () {
    return (
      <>
        <MapContainer
          center={[23.6978, 120.9605]}
          zoom={5}
          style={{
            width: "100%",
            height: "calc(100Vh - 60px)",
            zIndex: 125
          }}
        >
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        <Legend/>
        </MapContainer>
      </>
    )
}

