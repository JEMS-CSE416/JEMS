import { GeoJSON, useMap, Marker, GeoJSONProps } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  EditPageAction,
  EditPageState,
  useEditContext,
  useEditDispatchContext,
} from "../../context/EditContextProvider";
import { Layer, Map, divIcon, marker } from "leaflet";
import { Feature, GeoJsonProperties, Geometry } from "geojson";
import attachSelectionEvents from "./leaflet/selection";
import { convertToGeoJSON } from "./utils/jemsconvert";
import React, { useEffect, useRef } from "react";
import { SELECTED_STYLE, UNSELECTED_STYLE } from "./leaflet/styles";
import { geoCentroid } from "d3-geo";

const RegionLabel = (props: { region: Feature }) => {
  const region = props.region;

  if (region.properties) {
    const label = divIcon({
      className: "map-label",
      html: region.properties.name || "undefined",
      iconSize: [100, 40],
      iconAnchor: [50, 20],
    });
    const centroid = geoCentroid(region);
    return <Marker position={[centroid[1], centroid[0]]} icon={label} />;
  }
  return <></>;
};

export default function DisplayLayer() {
  // Implement your component logic here
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  const convertedGeoJSON = convertToGeoJSON(editPageState.map);
  const map = useMap(); // get access to map object
  const data = JSON.parse(convertedGeoJSON);

  return (
    <>
      <GeoJSON
        key={JSON.stringify(editPageState)}
        data={data}
        onEachFeature={(region, layer) =>
          onEachRegion(region, layer, editPageState, setEditPageState, map)
        }
        style={(region) => initStyleFunction(region, editPageState)}
      />
      {
        // add labels to each region if string label is enabled
        editPageState.map.displayStrings &&
        data.features.map(
          (
            region: Feature<Geometry, GeoJsonProperties>,
            index: React.Key | null | undefined
          ) => (
            <RegionLabel key={index} region={region} />
          )
        )
      }
    </>
  );
}

// This function will be applied to each feature in the geojson aka each region
// on the map
function onEachRegion(
  region: Feature,
  layer: Layer,
  editPageState: EditPageState,
  setEditPageState: React.Dispatch<EditPageAction>,
  map: Map
) {
  // attach selection functionality to each region
  attachSelectionEvents(region, layer, editPageState, setEditPageState);
}

function initStyleFunction(region: any, editPageState: EditPageState) {
  if (
    region.properties.i === editPageState.selectedRegion?.i &&
    region.properties.groupName === editPageState.selectedRegion?.groupName
  ) {
    return {
      ...SELECTED_STYLE,
      fillColor: region.properties.color,
      fillOpacity: 1,
      color: "#000000",
    };
  } else {
    return {
      ...UNSELECTED_STYLE,
      fillColor: region.properties.color,
      fillOpacity: 1,
      color: "#6996db",
    };
  }
}
