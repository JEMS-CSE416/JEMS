import { EditPageAction, EditPageState } from "../../../context/EditContextProvider";
import React, { useEffect, useState } from "react";
import { LatLngTuple, LeafletEvent, LeafletMouseEvent, type Marker as LeafletMarker, } from 'leaflet';
import { Feature } from "geojson";
import { Polyline } from "react-leaflet";

// heavier region and update page state
export function onDragEndLabel(
  markerRef: React.MutableRefObject<LeafletMarker<any>> | React.MutableRefObject<null>,
  editPageState: EditPageState,
  setEditPageState: React.Dispatch<EditPageAction>
){

  const marker = markerRef.current;
  if(marker != null){
    const latLng = marker.getLatLng()
    setEditPageState({
      type: "update_selected_region_info",
      selectedRegion: {
        ...editPageState.selectedRegion!,
        region: {
          ...editPageState.selectedRegion!.region,
          stringOffset: [latLng.lat, latLng.lng]
        },
      },
    });
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

  const [mousePos, setMousePos] = useState(
    props.region.properties?.stringOffset?.length !== 1
      ? props.region.properties?.stringOffset as LatLngTuple
      : props.centroid
  );
  useEffect(() =>{
      props.setDragStateSetter(() => (coords: LatLngTuple) => {
        setMousePos(coords)
      });
  }, []) // eslint-disable-line

  return <Polyline
      positions={[
        props.centroid,
        mousePos
      ]}
  />
}
