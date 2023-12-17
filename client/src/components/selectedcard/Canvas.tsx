import "./css/canvas.css";
import { Image } from "@mantine/core";
import { Map as JEMSMap } from "../../utils/models/Map";
import { useSelectedMap } from "../hooks/useSelectedMap";
import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet";
import { convertToGeoJSON } from "../edit/utils/jemsconvert";
import { TemplateTypes } from "../../utils/enums";
import {
  Feature,
  GeoJsonProperties,
  Geometry,
  FeatureCollection,
} from "geojson";
import { Layer, Map, divIcon, marker } from "leaflet";
import { useMap } from "react-leaflet";
import { geoCentroid } from "d3-geo";
import { useEffect } from "react";
import EasyPrint from "../common/EasyPrint";

interface CanvasProps {
  map: JEMSMap;
}
const Canvas = ({ map }: CanvasProps) => {
  const convertedGeoJSON = convertToGeoJSON(map);
  const data: FeatureCollection = JSON.parse(convertedGeoJSON);

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
        <EasyPrint />
        <TileLayer
          noWrap={true}
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          data={data}
          style={(region: Feature<Geometry, any> | undefined) =>
            initStyleFunction(region, map)
          }
        />
        <Labels data={data} map={map} />
      </MapContainer>
    </>
  );
};

function getRegionStyle(region: Feature<Geometry, any>, map: JEMSMap) {
  // Initialize the style object with common properties
  let style: { [key: string]: any } = {
    fillColor: region.properties.color,
    fillOpacity: 0.9,
  };

  const whichMap = map.colorType;
  style = { ...style, weight: 2, color: "#6996db" };

  if (whichMap !== TemplateTypes.COLOR) {
    style = {
      ...style,
      fillColor: "#8eb8fa",
      fillOpacity: 0.5,
    };
  }

  return style;
}

function initStyleFunction(
  region: Feature<Geometry, any> | undefined,
  map: JEMSMap
) {
  if (!region) return {};

  return getRegionStyle(region, map);
}

interface LabelsProps {
  data: FeatureCollection;
  map: JEMSMap;
}
function Labels({ data, map }: LabelsProps) {
  const labels = data.features.map(
    (
      region: Feature<Geometry, GeoJsonProperties>,
      index: React.Key | null | undefined
    ) => {
      return <RegionLabel key={index} region={region} map={map} />;
    }
  );

  return <>{labels}</>;
}

interface RegionLabelProps {
  key: React.Key | null | undefined;
  region: Feature<Geometry, GeoJsonProperties>;
  map: JEMSMap;
}
function RegionLabel({ key, region, map }: RegionLabelProps) {
  const centroid = geoCentroid(region);
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
      <Marker
        key={key}
        position={[centroid[1], centroid[0]]}
        icon={labelIcon}
        interactive={false}
      />
    );
  }
  return <></>;
}

function labelHTML(region: Feature<Geometry, any>, map: JEMSMap) {
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

export default Canvas;
