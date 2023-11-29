import { GeoJSON, useMap, Marker, GeoJSONProps } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  EditPageAction,
  EditPageState,
  useEditContext,
  useEditDispatchContext,
} from "../../context/EditContextProvider";
import { TemplateTypes } from "../../utils/enums";
import { Layer, Map, divIcon, marker } from "leaflet";
import {
  Feature,
  GeoJsonProperties,
  Geometry,
  FeatureCollection,
} from "geojson";
import attachSelectionEvents from "./leaflet/selection";
import { convertToGeoJSON } from "./utils/jemsconvert";
import React, { useEffect, useRef } from "react";
import { SELECTED_STYLE, UNSELECTED_STYLE } from "./leaflet/styles";
import { geoCentroid } from "d3-geo";
import { spawn } from "child_process";

export default function DisplayLayer() {
  // Implement your component logic here
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  const convertedGeoJSON = convertToGeoJSON(editPageState.map);
  const map = useMap(); // get access to map object
  const data: FeatureCollection = JSON.parse(convertedGeoJSON);

  return (
    <>
      <GeoJSON
        key={JSON.stringify(editPageState)}
        data={data}
        onEachFeature={(region, layer) =>
          onEachRegion(region, layer, editPageState, setEditPageState, map)
        }
        style={(region: Feature<Geometry, any> | undefined) =>
          initStyleFunction(region, editPageState)
        }
      />
      <Labels data={data} editPageState={editPageState} />
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

const Labels = (props: {
  data: FeatureCollection;
  editPageState: EditPageState;
}) => {
  const data = props.data;
  const editPageState = props.editPageState;

  const labels = data.features.map(
    (
      region: Feature<Geometry, GeoJsonProperties>,
      index: React.Key | null | undefined
    ) => {
      return <RegionLabel key={index} region={region} />;
    }
  );

  return <>{labels}</>;
};

const RegionLabel = (props: {
  key: React.Key | null | undefined;
  region: Feature;
}) => {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  const region = props.region;
  const index = props.key;

  //   if (region.properties) {
  //     let label = divIcon({
  //       className: "map-label",
  //       html: `<div style="pointer-events:none;"></div>`,
  //       iconSize: [100, 40],
  //       iconAnchor: [50, 20],
  //     });
  //     const centroid = geoCentroid(region);
  //     return <Marker position={[centroid[1], centroid[0]]} icon={label} />;
  //   }
  const centroid = geoCentroid(region);
  if (
    region.properties &&
    ((editPageState.map.displayStrings &&
      region.properties.stringLabel !== "") ||
      (editPageState.map.displayNumerics &&
        region.properties.numericLabel !== ""))
  ) {
    let labelIcon = divIcon({
      className: "map-label",
      html: `<div style="border:1px solid black;">${labelHTML(
        region,
        editPageState
      )}</div>`,
      iconSize: [100, 40],
      iconAnchor: [50, 20],
    });
    return (
      <Marker
        key={index}
        position={[centroid[1], centroid[0]]}
        icon={labelIcon}
      />
    );
  }
  return <></>;
};

function getRegionStyle(
  region: Feature<Geometry, any>,
  editPageState: EditPageState
) {
  // Initialize the style object with common properties
  let style: { [key: string]: any } = {
    fillColor: region.properties.color,
    fillOpacity: 1,
  };

  const whichMap = editPageState.map.colorType;
  const isSelected =
    region.properties.i === editPageState.selectedRegion?.i &&
    region.properties.groupName === editPageState.selectedRegion?.groupName;

  if (isSelected) {
    style = { ...style, ...SELECTED_STYLE, color: "#000000" };
  } else {
    style = { ...style, ...UNSELECTED_STYLE, color: "#6996db" };
  }

  if (whichMap === TemplateTypes.NONE) {
    style = {
      ...style,
      fillColor: "#8eb8fa",
    };
  }else if (whichMap === TemplateTypes.CHOROPLETH) {
        style = {
        ...style,
        fillColor: "#8eb8fa",
        };
    }

  return style;
}

function labelHTML(
  region: Feature<Geometry, any>,
  editPageState: EditPageState
) {
  const displayStrings = editPageState.map.displayStrings;
  const displayNumerics = editPageState.map.displayNumerics;
  const displayStringsLabel = region.properties.stringLabel;
  const displayNumericsLabel = region.properties.numericLabel;

  let label = 
  `<div>
  </div>`;
  return label;
}

function initStyleFunction(
  region: Feature<Geometry, any> | undefined,
  editPageState: EditPageState
) {
  if (!region) return {};

  return getRegionStyle(region, editPageState);
}
