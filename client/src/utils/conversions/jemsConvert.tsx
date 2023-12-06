import { Map } from "../models/Map";
import { User } from "../models/User";

//This function will take a Map Object and convert it into a JEMS Object
function MapToJEMS(map: Map) {
  const JEMS = {
    map_file_content: {
      mapName: map.mapName, // string
      description: map.description, // string
      creationDate: "", // ISO date string
      public: false, // boolean
      colorType: "",
      displayStrings: false,
      displayNumerics: false,
      displayLegend: false,
      displayPointers: false,
      thumbnail: {},
      regions: {},
      legend: {},
    },
  };

  return JEMS;
}

/*
  // This function gets the request body for GeoJSON
  function getGeoJsonRequest(geojson: any) {
    if (file) {
      const filename = file.name;
      // Create the request body
      const req = {
        map_file_content: {
          mapName: form.values.mapName,
          description: form.values.description,
          creationDate: new Date().toISOString(),
          public: form.values.visibility === "Public" ? true : false,
          template: form.values.template,
          colorType: getColorType(),
          displayStrings: false,
          displayNumerics: false,
          displayLegend: false,
          displayPointers: false,
          thumbnail: {
            imageUrl:
              "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
            imageType: "avif",
          },
          regions: {
            [filename]: getRegions(geojson),
          },
          legend: {
            colorLegend: {},
            choroplethLegend: {},
          },
        },
      };
      return req;
    }
  }
  */
