import "leaflet/dist/leaflet.css";
import Legend from "./Legend";
import DisplayLayer from "./DisplayLayer";
import { useEditContext } from "../../context/EditContextProvider";
import { convertToGeoJSON } from "./utils/jemsconvert";
import { FeatureCollection } from "geojson";
import * as turf from "@turf/turf";
import { Canvas as CanvasBase } from "../CanvasComponents/Canvas";

export default function Canvas() {
  const editPageState = useEditContext();

  const convertedGeoJSON = convertToGeoJSON(editPageState.map);
  const data: FeatureCollection = JSON.parse(convertedGeoJSON);

  // calculates center of geojson data. if it can't then it defaults to a 0,0 center
  const centerCoords =
    data.features.length != 0
      ? turf.centerMean(data).geometry.coordinates
      : false;

  console.debug("CENTER COORDS: ", centerCoords);

  // if center coords is false then it's an error and will return nothing
  if (!centerCoords) {
    return <div>This GeoJSON is not supported</div>;
  }

  return (
    <>
      <CanvasBase centerCoords={centerCoords} noWrap>
        <DisplayLayer />
        <Legend />
      </CanvasBase>
    </>
  );
}
