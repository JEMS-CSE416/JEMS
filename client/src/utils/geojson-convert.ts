import { read } from "shapefile";
import { FeatureCollection, GeoJSON } from "geojson";
import * as toGeoJSON from '@tmcw/togeojson';
import JSZip from "jszip";
import { getFileType } from "./global_utils";

/*
  * Exported function that with convert specified file types into a
  * GeoJSON object
  */
export async function geoJsonConvert(file: File): Promise<GeoJSON> {
  // contains characters after the '.' in a filename
  let fileSuffix = getFileType(file.name); 
  console.log("fileSuffix: " + fileSuffix);
  switch(fileSuffix){
    // Handling json, shp, kml and zip file
    case "geojson":
      return await handleGeoJson(file);
    case "shp":
      return await handleShp(file);
    case "zip":
      return await handleZip(file);

    // Error cases
    case file.name:
      throw new Error("CANNOT HANDLE UNSPECIFIED FILETYPE");
    default:
      throw new Error("UNEXPECTED FILETYPE");
  }
}

/*
  * Case by Case handler functions
  */
async function handleGeoJson(file: File): Promise<GeoJSON> {
  return JSON.parse(await file.text()); //if already a geojson, handle itself
}

export async function handleShp(file: File): Promise<GeoJSON> {
  let geoJSON = await read(await file.arrayBuffer()); // read is from the shapefile library
  return handleUntitledRegions(geoJSON);
}

export async function readFileContent(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    // read the file as text
    reader.readAsText(file);

    reader.onload = (event) => {
      if (event.target) {
        const fileContent = event.target.result as string;
        // indicates that the asynch file reading is completed & provides fileContent as Promise result
        resolve(fileContent);
      }
    };
    
    // sets up handler when error while reading
    reader.onerror = (event) => {
      // reject Promise with error
      reject(new Error('Error reading file: ' + event.target?.error));
    };
    
  });
}

export async function handleKml(file: File): Promise<any> {
  try {
    // Read the KML file as text.
    let kmlText = await readFileContent(file);
    const parser = new DOMParser();
    const kmlData = parser.parseFromString(kmlText, 'text/xml');

    // Parse the KML data to GeoJSON using togeojson.
    const geoJSON = toGeoJSON.kml(kmlData);

    console.log("KML FILE:", geoJSON);
    // Return the GeoJSON object.
    return geoJSON;
  } catch (error) {
    console.error('Error handling KML:', error);
    throw error;
  }
}

export async function handleZip(file: File): Promise<GeoJSON> {
  try {
    // loading zip
    let zip = await JSZip.loadAsync(file);

    // gets the cleaned name of the simplest shp file
    let firstAlphabeticalShpFileName = Object.keys(zip.files)
      .filter( // filter out shp files
        (fileName) => fileName.split('.').slice(-1)[0] === "shp"
      ).map( // remove .shp from name
        (fileName) => fileName.split('.').slice(0, -1).join('.')
      ).sort( // sort by alphabetical order
        (fileA, fileB) => fileA.localeCompare(fileB)
      )[0];

    // preps the alphabetically first shp and dbf file for display
    let shp = zip.files[ firstAlphabeticalShpFileName + ".shp"].async("uint8array");
    let dbf = zip.files[ firstAlphabeticalShpFileName + ".dbf"].async("uint8array");

    // combines the shp file and dbf file together
    return await read(await shp, await dbf); // read is from the shapefile library

  } catch (error) {
    console.error('Error handling ZIP:', error);
    throw error;
  }
}

function handleUntitledRegions(geoJSON: GeoJSON){
  let counter = 0;
  if(geoJSON.type !== "FeatureCollection")
    throw new Error("geojson after being converted is not a feature collection")
  
  geoJSON = geoJSON as FeatureCollection


  for(let i = 0; i < geoJSON.features.length; i++){
    if(!geoJSON.features[i].properties)
      geoJSON.features[i].properties = {}
    if(!geoJSON.features[i].properties?.name)
      geoJSON.features[i].properties!.name = `undefined region ${counter++}`
  }

  return geoJSON
}
