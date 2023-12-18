import { EditPageAction, EditPageState, useEditContext } from "../../../context/EditContextProvider";
import React, { useEffect, useState } from "react";
import { LatLngTuple, LeafletEvent, LeafletMouseEvent, type Marker as LeafletMarker, } from 'leaflet';
import { Feature } from "geojson";
import { Polyline } from "react-leaflet";
import { UndoableDrag } from "../../../context/UndoRedo";

// heavier region and update page state
export function onDragEndLabel(
  markerRef: React.MutableRefObject<LeafletMarker<any>> | React.MutableRefObject<null>,
  editPageState: EditPageState,
  setEditPageState: React.Dispatch<EditPageAction>,
  addToUndoStack: any
){

  const marker = markerRef.current;
  if(marker != null){
    const latLng = marker.getLatLng()
    
    addToUndoStack(new UndoableDrag(
      [latLng.lat, latLng.lng],
      editPageState.selectedRegion?.region.stringOffset?? [0],
      editPageState.selectedRegion?.groupName?? "",
      editPageState.selectedRegion?.i?? 0
    ))
    //setEditPageState({
      //type: "update_selected_region_info",
      //map:{
        //...editPageState.map,
        //legend: {
          //...editPageState.map.legend
        //}
      //},
      //selectedRegion: {
        //...editPageState.selectedRegion!,
        //region: {
          //...editPageState.selectedRegion!.region,
          //stringOffset: [latLng.lat, latLng.lng]
        //},
      //},
    //});
  }
}

export function onDragLabel(
  e: LeafletEvent,
  markerRef: React.MutableRefObject<LeafletMarker<any>> | React.MutableRefObject<null>,
  setDragState: any
){

  const marker = markerRef.current;
  if(marker != null && setDragState != null){
    setDragState((e as LeafletMouseEvent).latlng);
  };
}

export function onClickLabel(region: Feature, editPageState: EditPageState,setEditPageState: React.Dispatch<EditPageAction>){
  const i = region.properties?.i as number
  const groupName = region.properties?.groupName as string
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

export function PointerConnection(
  props: {
    centroid: LatLngTuple,
    setDragStateSetter: any
    region: Feature
  }){
  const editPageState = useEditContext()
  const groupName = props.region.properties?.groupName
  const i = props.region.properties?.i

  const [mousePos, setMousePos] = useState(
    props.region.properties?.stringOffset?.length !== 1
      ? editPageState.map.regions[groupName][i].stringOffset as LatLngTuple
      : props.centroid
  );
  useEffect(() =>{
      props.setDragStateSetter(() => (coords: LatLngTuple) => {
        setMousePos(coords)
      });
  }, []) // eslint-disable-line

  useEffect( () =>{
    if(editPageState.map.regions[groupName][i].stringOffset !== null
      && props.region.properties?.stringOffset?.length !== 1
      )
      setMousePos( editPageState.map.regions[groupName][i].stringOffset as LatLngTuple)
    else
      setMousePos(props.centroid)
  },[editPageState, groupName, i, props]);

  return <Polyline
      positions={[
        props.centroid,
        mousePos
      ]}
  />
}
