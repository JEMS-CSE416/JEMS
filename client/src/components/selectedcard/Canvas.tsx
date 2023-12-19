import "./css/canvas.css";
import { Map as JEMSMap } from "../../utils/models/Map";
import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet";
import * as turf from "@turf/turf";
import { convertToGeoJSON } from "../edit/utils/jemsconvert";
import { TemplateTypes } from "../../utils/enums";
import { Feature, Geometry, FeatureCollection } from "geojson";
import { NonInteractiveLabels as Labels } from "../CanvasComponents/NonInteractiveLabels";
import { Canvas as CanvasBase } from "../CanvasComponents/Canvas";
import EasyPrint from "../common/EasyPrint";
import LeafletToImage from "../common/LeafletToImage";
interface CanvasProps {
  map: JEMSMap;
}
const Canvas = ({ map }: CanvasProps) => {
  const convertedGeoJSON = convertToGeoJSON(map);
  const data: FeatureCollection = JSON.parse(convertedGeoJSON);

  // calculates center of geojson data. if it can't then it defaults to a 0,0 center
  const centerCoords =
    data.features.length === 0
      ? [0, 0]
      : turf.centerMean(data).geometry.coordinates;

  return (
    <>
      <CanvasBase centerCoords={[centerCoords[0], centerCoords[1]]}>
        <GeoJSON
          data={data}
          style={(region: Feature<Geometry, any> | undefined) =>
            initStyleFunction(region, map)
          }
        />
        <Labels data={data} map={map} />
        {/* <EasyPrint/> */}
        <LeafletToImage/>
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
  // console.debug(map)
  if (whichMap == TemplateTypes.CHOROPLETH) {
    style = {
      ...style,
      fillColor: getChoroplethStyle(region, map),
      fillOpacity: 1,
      opacity: 1,
    };
  } else if (whichMap !== TemplateTypes.COLOR) {
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

// function that defines the color of each region based off its numeric value and choropleth items
function getChoroplethStyle(
  region: Feature<Geometry, any>,
  map: JEMSMap
) {

  console.debug(map)

  const items = Object.entries(
    map.legend.choroplethLegend?.items || {}
  );

  // console.debug(items)

  const value = region.properties.numericLabel;
  if (items.length >= 5) {
    return value >= items[0][1]
      ? items[0][0]
      : value >= items[1][1]
      ? items[1][0]
      : value >= items[2][1]
      ? items[2][0]
      : value >= items[3][1]
      ? items[3][0]
      : value >= items[4][1]
      ? items[4][0]
      : "#FFFFFF";
  } else {
    // Handle if there are 1, 2, 3, and/or 4 items in the legend
    if (items.length == 1) {
      return value == items[0][1] ? items[0][0] : "#FFFFFF";
    } else if (items.length == 2) {
      return value >= items[0][1]
        ? items[0][0]
        : value >= items[1][1]
        ? items[1][0]
        : "#FFFFFF";
    } else if (items.length == 3) {
      return value >= items[0][1]
        ? items[0][0]
        : value >= items[1][1]
        ? items[1][0]
        : value >= items[2][1]
        ? items[2][0]
        : "#FFFFFF";
    } else if (items.length == 4) {
      return value >= items[0][1]
        ? items[0][0]
        : value >= items[1][1]
        ? items[1][0]
        : value >= items[2][1]
        ? items[2][0]
        : value >= items[3][1]
        ? items[3][0]
        : "#FFFFFF";
    }
  }
  return "#FFFFFF";
}



export default Canvas;