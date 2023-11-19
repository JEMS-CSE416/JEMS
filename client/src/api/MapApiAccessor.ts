import { Map, ErrorMap } from "../utils/models/Map";
import { BACKEND_URL } from "../utils/constants";

const mapsUrl = BACKEND_URL + "/api/maps/";

export async function getMap(id: string): Promise<Map> {
  // TODO: replace this with an actual getMap endpoint
  console.log("TODO: REMOVE PLACEHOLDER IN GETMAP", id);
  return Promise.resolve(ErrorMap);
}

interface MapQueryParams {
  mapName?: string;
  isPrivate?: boolean;
  creatorId?: string;
}
export async function getMaps({mapName,isPrivate,creatorId}:MapQueryParams): Promise<Map[]> {
  try {
    const searchParams = {} as any;

    searchParams.session_token = "TODO: DELETE THIS LINE";
    if (mapName) searchParams.map_name = mapName;
    if (isPrivate) searchParams.private = isPrivate;
    if (creatorId) searchParams.creator_id = creatorId;

    // Replace with your API endpoint
    const response = await fetch(
      mapsUrl + "?" + new URLSearchParams(searchParams),
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
  } catch (error) {
    console.error("Error updating data:", error);
  }
  return Promise.reject("Error fetching maps");
}
