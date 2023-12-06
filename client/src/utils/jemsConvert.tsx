import { matchPath } from "react-router-dom";
import { Map } from "./models/Map";
import { User } from "./models/User";

// This function will take a Map Object and convert it into a JEMS Object
export function MapToJEMS(map: Map) {
  const JEMS = {
    map_file_content: {
      mapName: map.mapName, // string
      description: map.description, // string
      creationDate: map.creationDate, // ISO date string
      public: map.public, // boolean
      colorType: map.colorType,
      displayStrings: map.displayStrings, // boolean
      displayNumerics: map.displayNumerics, // boolean
      displayLegend: map.displayLegend, // boolean
      displayPointers: map.displayPointers, // boolean
      thumbnail: map.thumbnail, // object
      regions: map.regions, // object
      legend: map.legend, // object
    },
  };

  return JEMS;
}