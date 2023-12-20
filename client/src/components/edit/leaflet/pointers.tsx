import { EditPageAction, EditPageState, useEditContext } from "../../../context/EditContextProvider";
import React, { useEffect, useRef, useState } from "react";
import { LatLngTuple, LeafletEvent, LeafletMouseEvent, type Marker as LeafletMarker, } from 'leaflet';
import { Feature } from "geojson";
import { Polyline } from "react-leaflet";
import { UndoableDrag } from "../../../context/UndoRedo";
import { appendFile } from "fs";

// heavier region and update page state
export function onDragEndLabel(
  markerRef: React.MutableRefObject<LeafletMarker<any>> | React.MutableRefObject<null>,
  editPageState: EditPageState,
  setEditPageState: React.Dispatch<EditPageAction>,
  addToUndoStack: any,
  refs?: any
){

  const marker = markerRef.current;
  if(marker != null){
    const latLng = marker.getLatLng()
    
  const allRefs = refs.current as any
  if(allRefs !== undefined){
    allRefs.forEach((ref:any )=> {
      if(ref)
        ref.target.bringToFront();
    });
  }
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
  setDragState: any,
  refs?: any
){
  const allRefs = refs.current as any
  if(allRefs !== undefined){
    allRefs.forEach((ref:any )=> {
      if(ref)
        ref.target.bringToFront();
    });
  }

  const marker = markerRef.current;
  if(marker != null && setDragState != null){
    setDragState((e as LeafletMouseEvent).latlng);
  };
}

export function onClickLabel(region: Feature, editPageState: EditPageState,setEditPageState: React.Dispatch<EditPageAction>, refs?: any){
  const i = region.properties?.i as number
  const groupName = region.properties?.groupName as string

  const allRefs = refs.current as any
  if(allRefs !== undefined){
    allRefs.forEach((ref:any )=> {
      if(ref)
        ref.target.bringToFront();
    });
  }
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
    appendRef?: any
  }){
  const editPageState = useEditContext()
  const groupName = props.region.properties?.groupName
  const i = props.region.properties?.i


  let initState;
  try{
    initState = editPageState.map.regions[groupName][i].stringOffset as LatLngTuple
  } catch (e){
    initState = props.region.properties?.stringOffset as LatLngTuple
  }
  const [mousePos, setMousePos] = useState(
    props.region.properties?.stringOffset?.length !== 1
      ? initState
      : props.centroid
  );
  useEffect(() =>{
      props.setDragStateSetter(() => (coords: LatLngTuple) => {
        setMousePos(coords)
      });
  }, []) // eslint-disable-line

  useEffect( () =>{
    try{
        if(editPageState.map.regions[groupName][i].stringOffset !== null
          && props.region.properties?.stringOffset?.length !== 1
          )
          setMousePos( editPageState.map.regions[groupName][i].stringOffset as LatLngTuple)
        else
          setMousePos(props.centroid)
    } catch (e){
        // just continue

    }
  },[editPageState, groupName, i, props]);



  const polyLineRef = useRef(null)
  return <Polyline
      positions={[
        props.centroid,
        mousePos
      ]}
      ref={polyLineRef}
        eventHandlers={{
          add: (e) => {
            if(props.appendRef)
                props.appendRef(e)
            //e.target.bringToFront();
          },
        }}
  >
  </Polyline>
}

function Filler(props: {ref: any, appendRef?:any}){
  if(props.appendRef)
    props.appendRef(props.ref)
  return <></>
}


