import { GeoJSON, useMap, Marker, GeoJSONProps } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  EditPageAction,
  EditPageState,
  useEditContext,
  useEditDispatchContext,
  SetLeafletMapContext,
  setLeafletMapPrinterContext,
  useLeafLetMapPrinter,
} from "../../context/EditContextProvider";
import { TemplateTypes } from "../../utils/enums";
import { Layer, Map, divIcon } from "leaflet";
import * as L from "leaflet";
import * as turf from "@turf/turf";
import {
  Feature,
  GeoJsonProperties,
  Geometry,
  FeatureCollection,
} from "geojson";
import attachSelectionEvents from "./leaflet/selection";
import { convertToGeoJSON } from "./utils/jemsconvert";
import React, { useContext, useRef, useState, useEffect } from "react";
import { SELECTED_STYLE, UNSELECTED_STYLE } from "./leaflet/styles";
import {
  onClickLabel,
  onDragEndLabel,
  onDragLabel,
  PointerConnection,
} from "./leaflet/pointers";

export default function DisplayLayer() {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  const convertedGeoJSON = convertToGeoJSON(editPageState.map);
  const map = useMap(); // get access to map object
  const data: FeatureCollection = JSON.parse(convertedGeoJSON);

  const mapInstance = useMap();
  const setLeafletMap = useContext(SetLeafletMapContext);
  const setLeafletMapPrinter = useContext(setLeafletMapPrinterContext);
  const leafletMapPrinter = useLeafLetMapPrinter();

  useEffect(() => {
    // console.debug(
    //   "MAP INSTANCE: ",
    //   mapInstance,
    //   "SET LEAFLET MAP",
    //   setLeafletMap,
    //   "SET LEAFLET MAP PRINTER",
    //   setLeafletMapPrinter
    // );

    if (mapInstance && setLeafletMap && setLeafletMapPrinter) {
      setLeafletMap(mapInstance);

      const printer = L.easyPrint({
        sizeModes: ["Current", "A4Portrait", "A4Landscape"],
        filename: "MyMap",
        exportOnly: true,
        hideControlContainer: true,
      }).addTo(mapInstance);

      setLeafletMapPrinter(printer);

      console.warn("LEAFLET MAP: ", mapInstance);
    }
  }, [mapInstance, setLeafletMap]);

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

// This function handles the labels (string, numeric, and pointer)
const RegionLabel = (props: {
  key: React.Key | null | undefined;
  region: Feature;
}) => {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  const region = props.region;
  const index = props.key;

  // useRef allows a ReactLeaflet child component to be accessible
  const markerRef = useRef(null);
  const [dragSetter, setDragSetter] = useState(() => {});

  const centroid = turf.centerMean(region).geometry.coordinates;

  if (
    region.properties &&
    ((editPageState.map.displayStrings &&
      region.properties.stringLabel !== "") ||
      (editPageState.map.displayNumerics &&
        region.properties.numericLabel !== ""))
  ) {
    let labelIcon = divIcon({
      className: "map-label",
      html: `<div>${labelHTML(region, editPageState)}</div>`,
      iconSize: [100, 40],
      iconAnchor: [50, 20],
    });
    return (
      <>
        {editPageState.map.displayPointers && (
          <PointerConnection
            centroid={[centroid[1], centroid[0]]}
            setDragStateSetter={(fxn: any) => setDragSetter(fxn)}
            region={region}
          />
        )}

        <Marker
          key={index}
          position={
            editPageState.map.displayPointers &&
            region.properties.stringOffset?.length !== 1
              ? [
                  region.properties.stringOffset[0],
                  region.properties.stringOffset[1],
                ]
              : [centroid[1], centroid[0]]
          }
          icon={labelIcon}
          interactive={true}
          bubblingMouseEvents={true}
          draggable={isDraggable(region, editPageState)}
          eventHandlers={{
            click: () => {
              onClickLabel(region, editPageState, setEditPageState);
            },
            dragend: () => {
              onDragEndLabel(markerRef, editPageState, setEditPageState);
            },
            drag: (e) => {
              onDragLabel(e, markerRef, dragSetter);
            },
          }}
          ref={markerRef}
        ></Marker>
      </>
    );
  }
  return <></>;
};

// Helper function that determines weather or not a marker is draggable
function isDraggable(region: Feature, editPageState: EditPageState) {
  const i = region.properties?.i as number;
  const groupName = region.properties?.groupName as string;
  return (
    editPageState.map.displayPointers &&
    editPageState.selectedRegion?.groupName === groupName &&
    editPageState.selectedRegion?.i === i
  );
}

function getRegionStyle(
  region: Feature<Geometry, any>,
  editPageState: EditPageState
) {
  // Initialize the style object with common properties
  let style: { [key: string]: any } = {
    fillColor: region.properties.color,
    fillOpacity: 0.9,
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

  if (whichMap == TemplateTypes.CHOROPLETH) {
    style = {
      ...style,
      fillColor: getChoroplethStyle(region, editPageState),
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

// function that defines the color of each region based off its numeric value and choropleth items
function getChoroplethStyle(
  region: Feature<Geometry, any>,
  editPageState: EditPageState
) {
  const items = Object.entries(
    editPageState.map.legend.choroplethLegend?.items || {}
  );
  const value = region.properties.numericLabel;
  console.log("value: " + value);
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
      console.log("2");
      return value >= items[0][1]
        ? items[0][0]
        : value >= items[1][1]
        ? items[1][0]
        : "#FFFFFF";
    } else if (items.length == 3) {
      console.log("3");
      return value >= items[0][1]
        ? items[0][0]
        : value >= items[1][1]
        ? items[1][0]
        : value >= items[2][1]
        ? items[2][0]
        : "#FFFFFF";
    } else if (items.length == 4) {
      console.log("4");
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
  return "#8eb8fa";
}

function labelHTML(
  region: Feature<Geometry, any>,
  editPageState: EditPageState
) {
  const displayStrings = editPageState.map.displayStrings;
  const displayNumerics = editPageState.map.displayNumerics;
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

function initStyleFunction(
  region: Feature<Geometry, any> | undefined,
  editPageState: EditPageState
) {
  if (!region) return {};
  return getRegionStyle(region, editPageState);
}
