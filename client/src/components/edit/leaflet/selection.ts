import { Feature } from "geojson";
import { Layer, LeafletMouseEvent } from "leaflet";
import React from "react";
import { EditPageAction, EditPageState } from "../../../context/EditContextProvider";
import { HOVERED_STYLE, SELECTED_STYLE, UNSELECTED_STYLE } from "./styles";

export default function attachSelectionEvents(
  region: Feature,
  layer: Layer,
  editPageState: EditPageState,
  setEditPageState: React.Dispatch<EditPageAction>
){
  layer.on('mouseover', (e) => onHover(e, editPageState))
  layer.on('click', (e) => onSelect(e, editPageState, setEditPageState))
  layer.on('mouseout', (e) => clearFormat(e, editPageState))
}

// slight highlight on hover
function onHover(e: LeafletMouseEvent, editPageState: EditPageState){
  const region = e.target
  if(region.feature.properties.i === editPageState.selectedRegion?.i &&
     region.feature.properties.groupName === editPageState.selectedRegion?.groupName
    ){
    region.setStyle(SELECTED_STYLE)
    region.bringToFront();
  }else {
    region.setStyle(HOVERED_STYLE)
    region.bringToFront();
  }
  //region.bringToFront();
}

// heavier region and update page state
function onSelect(e: LeafletMouseEvent, editPageState: EditPageState,setEditPageState: React.Dispatch<EditPageAction>){
  // apply 
  const region = e.target
  region.setStyle(SELECTED_STYLE)
  region.bringToFront();

  const i = region.feature.properties.i as number
  const groupName = region.feature.properties.groupName as string
  // actually set the state
  setEditPageState({
    type: 'select_region',
    selectedRegion: {
      region: editPageState.map.regions[groupName][i],
      i: i,
      groupName: groupName,
    }
  })

}

// clear formatting on mouseOff
function clearFormat(e: LeafletMouseEvent, editPageState: EditPageState){
  const region = e.target
  // checks to see if the region is currently selected
  if(region.feature.properties.i === editPageState.selectedRegion?.i &&
     region.feature.properties.groupName === editPageState.selectedRegion?.groupName
    ){
    region.setStyle(SELECTED_STYLE)
    region.bringToFront()
  }else {
    region.setStyle(UNSELECTED_STYLE)
    //editPageState.selectedRegion?.layer.setStyle(SELECTED_STYLE)
  }
}
