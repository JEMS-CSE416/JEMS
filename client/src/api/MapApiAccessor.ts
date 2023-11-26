import { Map, ErrorMap } from "../utils/models/Map";
import { BACKEND_URL, LOCAL_BACKEND_URL } from "../utils/constants";

const mapsUrl = LOCAL_BACKEND_URL + "/api/maps/";
const mapUrl = BACKEND_URL + "/api/maps/:id/";
const updateMapURL = LOCAL_BACKEND_URL + "/api/maps/update/:id/";

interface GetMapParams {
  id: string;
  creatorId: string;
}

/* Get a single map with the map with the map id */
export async function getMap({ id, creatorId }: GetMapParams): Promise<Map> {
  // TODO: Change creatorId with session_token when authentication is implemented
  try {
    const res = await fetch(mapUrl + "?id=" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const resData = await res.json();
      console.log("Data updated successfully:", resData);
      return resData;
    } else {
      console.error("Error updating data:", res.status, res.statusText);
    }
  } catch (error) {
    console.log(error);
  }
  return Promise.reject("Error fetching maps");
}

interface updateMapParams {
  map: Map;
}

/* Update a map by passing in a Map object, which must contain the map id*/
export async function updateMap({map} : updateMapParams): Promise<Map[]> {
  try {
    const res = await fetch(updateMapURL + "?id=" + map._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mapName: map.mapName,
        public: map.public,
        description: map.description,
        colorType: map.colorType,
        displayStrings: map.displayStrings,
        displayNumerics: map.displayNumerics,
        displayLegend: map.displayLegend,
        displayPointers: map.displayPointers,
        thumbnail: map.thumbnail,
        regions: map.regions,
        legend: map.legend,
      }),
    });
    if(res.ok) {
      const resData = await res.json();
      console.log("Data updated successfully:", resData);
      return resData;
    }
    else {
      console.error("Error updating data:", res.status, res.statusText);
    }
  }
  catch(error) {
    console.log(error);
  }
  return Promise.reject("Error updating maps");
}

interface MapQueryParams {
  mapName?: string;
  isPrivate?: boolean;
  creatorId?: string;
  session_token?: string;
}

export async function getMaps({
  mapName,
  isPrivate,
  creatorId,
  session_token,
}: MapQueryParams): Promise<Map[]> {
  try {
    const searchParams = {} as any;

    if (session_token) searchParams.session_token = session_token;
    if (mapName) searchParams.map_name = mapName;
    if (isPrivate) searchParams.private = isPrivate;
    if (creatorId) searchParams.creator_id = creatorId;

    // Replace with your API endpoint
    const response = await fetch(
      mapsUrl + "query/?" + new URLSearchParams(searchParams),
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      console.log("Data updated successfully:", responseData);
      return responseData;
    } else {
      console.error(
        "Error updating data:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {}
  return Promise.reject("Error fetching maps");
}
interface duplicateMapParams {
  mapId: string;
  mapName: string;
  description: string;
  isPublic: string;
  creatorId: string;
}

export async function duplicateMap({
  mapId,
  mapName,
  description,
  isPublic,
  creatorId,
}: duplicateMapParams) {
  try {
    console.log("DUPLICATE MAPPP: ", mapId, mapName, description, isPublic, creatorId)
    // TODO: replace with mapsurl when live server is up
    const res = await fetch(mapsUrl + "duplicate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + creatorId,
      },
      body: JSON.stringify({
        map_id: mapId,
        map_name: mapName,
        description: description,
        public: isPublic,
      }),
    });
  } catch (error) {
    console.error("Error Duplicating Map:", error);
  }
}

export async function createMap(req: any) {
  try {
    const res = await fetch(mapsUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req)
    });
    if (res.ok) {
      const resData = await res.json();
      console.log("Map created successfully:", resData);
      return resData;
    } else {
      console.error("Error updating data:", res.status, res.statusText);
    }
  } catch (error) {
    console.log(error);
  }
  return Promise.reject("Error creating map");
}