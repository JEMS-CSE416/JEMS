import { Map } from "./models/Map";
import { MapToJEMS } from "./jemsConvert";
import { saveAs } from 'file-saver';

// This function will take a Map object and set up for download as a JEMS file
export function downloadAsJEMS(map: Map) {
  // Convert the map object to a JEMS object
  const JEMS = MapToJEMS(map);
  const fileName = map.mapName.trim().replace(/ /g, "_") + ".json";
  console.debug(JEMS);
  console.debug(map);

  // Create a new blob object
  const blob = new Blob([JSON.stringify(JEMS)], {
    type: "application/json",
  });
  saveAs(blob, fileName);
}

// This function will take a Map object and set up for download as an image
export function downloadAsImage(format: "PNG" | "JPEG") {
  return null;
}