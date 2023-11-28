import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Legend from "./Legend";
import { EditPageAction, EditPageState, useEditContext, useEditDispatchContext } from "../../context/EditContextProvider";
import { Layer } from "leaflet";
import { Feature } from "geojson";
import attachSelectionEvents from "./leaflet/selection";
import { convertToGeoJSON } from "./utils/jemsconvert";
import React from "react";
import { SELECTED_STYLE, UNSELECTED_STYLE } from "./leaflet/styles";
import { Box } from "@mantine/core";

export default function Canvas() {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  const convertedGeoJSON = convertToGeoJSON(editPageState.map);

  return (
    <>
      <MapContainer
        center={[40.6482, -73.9442]}
        zoom={12}
        style={{
          width: "100%",
          height: "calc(100Vh - 60px)",
          zIndex: 125
        }}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
            key={JSON.stringify(editPageState)}
            data={JSON.parse(convertedGeoJSON)} 
            onEachFeature={
              (region, layer) => onEachRegion(region, layer, editPageState, setEditPageState)
            }
            style={(region) => initStyleFunction(region, editPageState)}
                
        />
      </MapContainer>
      <Box style={{ position: 'relative', top: "100%"}}>
        <Legend />
      </Box>
    </>
  )
}

// This function will be applied to each feature in the geojson aka each region
// on the map
function onEachRegion(
  region: Feature, layer: Layer,
  editPageState: EditPageState,
  setEditPageState: React.Dispatch<EditPageAction>){

  // attatch selection functionality to each region
  attachSelectionEvents(region, layer, editPageState, setEditPageState);
}

function initStyleFunction(region: any, editPageState: EditPageState){
  if(region.properties.i === editPageState.selectedRegion?.i &&
     region.properties.groupName === editPageState.selectedRegion?.groupName
    ){
    return {
      ...SELECTED_STYLE,
      fillColor: "#8eb8fa",
      fillOpacity: 1,
      color: "#000000",
    }
  }else {
    return {
      ...UNSELECTED_STYLE,
      fillColor: "#8eb8fa",
      fillOpacity: 1,
      color: "#6996db",
    }
  }


}



