import "./css/canvas.css";
import { Map as JEMSMap } from "../../utils/models/Map";
import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet";
import * as turf from "@turf/turf";
import { convertToGeoJSON } from "../edit/utils/jemsconvert";
import { TemplateTypes } from "../../utils/enums";
import { Feature, Geometry, FeatureCollection } from "geojson";
import { NonInteractiveLabels as Labels } from "../CanvasComponents/NonInteractiveLabels";
import { Canvas as CanvasBase } from "../CanvasComponents/Canvas";

interface CanvasProps {
  map: JEMSMap;
}
const Canvas = ({ map }: CanvasProps) => {
  const convertedGeoJSON = convertToGeoJSON(map);
  const data: FeatureCollection = JSON.parse(convertedGeoJSON);

  // calculates center of geojson data. if it can't then it defaults to a 0,0 center
  const centerCoords = turf.centerMean(data).geometry.coordinates

  return (
    <>
      <CanvasBase centerCoords={[centerCoords[0],centerCoords[1]]}>
        <GeoJSON
          data={data}
          style={(region: Feature<Geometry, any> | undefined) =>
            initStyleFunction(region, map)
          }
        />
        <Labels data={data} map={map} />
      </CanvasBase>
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

export default Canvas;
