import { GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { EditPageAction, EditPageState, useEditContext, useEditDispatchContext } from "../../context/EditContextProvider";
import { Layer, Map, divIcon, marker } from "leaflet";
import { Feature } from "geojson";
import attachSelectionEvents from "./leaflet/selection";
import { convertToGeoJSON } from "./utils/jemsconvert";
import React from "react";
import { SELECTED_STYLE, UNSELECTED_STYLE } from "./leaflet/styles";
import { geoCentroid } from "d3-geo";

export default function DisplayLayer() {
    // Implement your component logic here
    const editPageState = useEditContext();
    const setEditPageState = useEditDispatchContext();
    const convertedGeoJSON = convertToGeoJSON(editPageState.map);
    const map = useMap(); // get access to map object

    return (
        <GeoJSON
            key={JSON.stringify(editPageState)}
            data={JSON.parse(convertedGeoJSON)}
            onEachFeature={
                (region, layer) => onEachRegion(region, layer, editPageState, setEditPageState, map)
            }
            style={(region) => initStyleFunction(region, editPageState)}
        />
    );
};

// This function will be applied to each feature in the geojson aka each region
// on the map
function onEachRegion(
    region: Feature, layer: Layer,
    editPageState: EditPageState,
    setEditPageState: React.Dispatch<EditPageAction>,
    map: Map) {

    // attach selection functionality to each region
    attachSelectionEvents(region, layer, editPageState, setEditPageState);
    
    if (layer instanceof Layer) {
        if (region.properties) {
            const label = divIcon({
                className: 'map-label',
                html: region.properties.name || 'undefined',
                iconSize: [100, 40],
                iconAnchor: [50, 20]
            });
            const centroid = geoCentroid(region);
            marker([centroid[1], centroid[0]], { icon: label }).addTo(map); // add marker to map
        }
    }
}

function initStyleFunction(region: any, editPageState: EditPageState) {
    if (region.properties.i === editPageState.selectedRegion?.i &&
        region.properties.groupName === editPageState.selectedRegion?.groupName
    ) {
        return {
            ...SELECTED_STYLE,
            fillColor: region.properties.color,
            fillOpacity: 1,
            color: "#000000",
        }
    } else {
        return {
            ...UNSELECTED_STYLE,
            fillColor: region.properties.color,
            fillOpacity: 1,
            color: "#6996db",
        }
    }
}
