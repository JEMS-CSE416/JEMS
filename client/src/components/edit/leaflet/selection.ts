import { Feature } from "geojson";
import { Layer, LeafletMouseEvent } from "leaflet";
import React from "react";
import { EditPageAction, EditPageState } from "../../../context/EditContextProvider";
import { HOVERED_STYLE, SELECTED_STYLE, UNSELECTED_STYLE } from "./styles";

export default function attachSelectionEvents(
  region: Feature,
  layer: Layer,
  editPageState: EditPageState,
  setEditPageState: React.Dispatch<EditPageAction>,
  refs: any,
){
  layer.on('mouseover', (e) => onHover(e, editPageState, refs))
  layer.on('click', (e) => onSelect(e, editPageState, setEditPageState, refs))
  layer.on('mouseout', (e) => clearFormat(e, editPageState, refs))
}

// slight highlight on hover
function onHover(e: LeafletMouseEvent, editPageState: EditPageState, refs: any){
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

  const allRefs = refs.current as any
  if(allRefs !== undefined){
    allRefs.forEach((ref:any )=> {
      if(ref)
        ref.target.bringToFront();
    });
  }

}

// heavier region and update page state
function onSelect(e: LeafletMouseEvent, editPageState: EditPageState,setEditPageState: React.Dispatch<EditPageAction>, refs: any){
  // apply 
  const region = e.target
  region.setStyle(SELECTED_STYLE)
  region.bringToFront();

  const i = region.feature.properties.i as number
  const groupName = region.feature.properties.groupName as string
  // actually set the state
  const allRefs = refs.current as any
  if(allRefs !== undefined){
    allRefs.forEach((ref:any )=> {
      if(ref)
        ref.target.bringToFront();
    });
  }
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
function clearFormat(e: LeafletMouseEvent, editPageState: EditPageState, refs: any){
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
  const allRefs = refs.current as any
  if(allRefs !== undefined){
    allRefs.forEach((ref:any )=> {
      if(ref)
        ref.target.bringToFront();
    });
  }
}
