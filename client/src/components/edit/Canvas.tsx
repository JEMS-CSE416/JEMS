import "leaflet/dist/leaflet.css";
import Legend from "./Legend";
import DisplayLayer from "./DisplayLayer";
import { useEditContext } from "../../context/EditContextProvider";
import { convertToGeoJSON } from "./utils/jemsconvert";
import { FeatureCollection } from "geojson";
import * as turf from "@turf/turf";
import { Canvas as CanvasBase } from "../CanvasComponents/Canvas";
import LeafletToImage from "../common/LeafletToImage";

export default function Canvas() {
  const editPageState = useEditContext();

  const convertedGeoJSON = convertToGeoJSON(editPageState.map);
  const data: FeatureCollection = JSON.parse(convertedGeoJSON);

  // calculates center of geojson data. if it can't then it defaults to a 0,0 center
  const centerCoords =
    data.features.length != 0
      ? turf.centerMean(data).geometry.coordinates
      : [0, 0];

  console.debug("map center", editPageState.map._id);

  return (
    <>
      <CanvasBase centerCoords={[centerCoords[0], centerCoords[1]]} noWrap>
        <LeafletToImage/>
        <DisplayLayer />
        <Legend />
      </CanvasBase>
    </>
  );
}
