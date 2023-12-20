import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mantine/core";
import { useEffect, useContext } from "react";
import { Feature, FeatureCollection } from "geojson";
import * as turf from "@turf/turf";


interface CanvasProps {
  centerCoords?: number[];
  noWrap?: boolean;
  children?: React.ReactNode;
}

/* This is the most basic form of a canvas. It just takes in a GEOJSON data and center cords then displays it. */
export function Canvas({centerCoords, noWrap,children}: CanvasProps) {

  return (
    <>
      {centerCoords ? (
        <MapContainer
          center={[centerCoords[1], centerCoords[0]]}
          zoom={8}
          style={{
            width: "100%",
            height: "calc(100Vh - 60px)",
            zIndex: 125,
          }}
        >
          <TileLayer
            noWrap={noWrap ? true : false}
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
            attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {children}
        </MapContainer>
      ) : (
        <div>
            Loading Map...
        </div>
      )}
    </>
  );
}
