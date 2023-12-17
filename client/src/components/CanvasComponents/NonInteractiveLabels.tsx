import { Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TemplateTypes } from "../../utils/enums";
import { divIcon } from "leaflet";
import * as L from "leaflet";
import * as turf from "@turf/turf";
import {
  Feature,
  GeoJsonProperties,
  Geometry,
  FeatureCollection,
} from "geojson";
import React, { useRef, useState, useEffect } from "react";
// import { geoCentroid } from "d3-geo";
import { PointerConnection } from "../edit/leaflet/pointers";
import { Map } from "../../utils/models/Map";


/* 
NON-INTERACTIVE LABELS 
This is only used to display labels on the map. no one can  interact with it.
*/
export const NonInteractiveLabels = (props: { data: FeatureCollection; map: Map }) => {
  const data = props.data;
  const geojsonMap = props.map;

  const labels = data.features.map(
    (
      region: Feature<Geometry, GeoJsonProperties>,
      index: React.Key | null | undefined
    ) => {
      return <RegionLabel index={index} region={region} map={geojsonMap} />;
    }
  );

  return <>{labels}</>;
};

// This function handles the labels (string, numeric, and pointer)
interface RegionLabelProps {
  index: React.Key | null | undefined;
  region: Feature;
  map: Map;
}
function RegionLabel({ index, region, map }: RegionLabelProps) {
  // useRef allows a ReactLeaflet child component to be accessible
  const markerRef = useRef(null);
  const [dragSetter, setDragSetter] = useState(() => {});

  const centroid = turf.centerMean(region).geometry.coordinates;

  if (
    region.properties &&
    ((map.displayStrings && region.properties.stringLabel !== "") ||
      (map.displayNumerics && region.properties.numericLabel !== ""))
  ) {
    let labelIcon = divIcon({
      className: "map-label",
      html: `<div>${labelHTML(region, map)}</div>`,
      iconSize: [100, 40],
      iconAnchor: [50, 20],
    });
    return (
      <>
        {map.displayPointers && (
          <PointerConnection
            centroid={[centroid[1], centroid[0]]}
            setDragStateSetter={(fxn: any) => setDragSetter(fxn)}
            region={region}
          />
        )}

        <Marker
          key={index}
          position={
            map.displayPointers && region.properties.stringOffset?.length !== 1
              ? [
                  region.properties.stringOffset[0],
                  region.properties.stringOffset[1],
                ]
              : [centroid[1], centroid[0]]
          }
          icon={labelIcon}
          interactive={true}
          bubblingMouseEvents={true}
          ref={markerRef}
        ></Marker>
      </>
    );
  }
  return <></>;
}

function labelHTML(region: Feature<Geometry, any>, map: Map) {
  const displayStrings = map.displayStrings;
  const displayNumerics = map.displayNumerics;
  const StringsLabel = region.properties.stringLabel;
  const NumericsLabel = region.properties.numericLabel;
  const UnitsLabel = region.properties.numericUnit;
  let contents = `
    <div style="pointer-events: none;">
      <p style="margin: 0;">${displayStrings ? StringsLabel : ""}</p>
      <p style="margin: 0;">${
        displayNumerics ? NumericsLabel + ` ${UnitsLabel}` : ""
      }</p>
    </div>
  `;

  return contents;
}

