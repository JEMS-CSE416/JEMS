import { Map, ErrorMap } from "../utils/models/Map";
import { BACKEND_URL } from "../utils/constants";

const mapsUrl = BACKEND_URL + "/api/maps/";
const mapUrl = BACKEND_URL + "/api/maps/:id/";

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
  } catch (error) {
    console.error("Error updating data:", error);
  }
  return Promise.reject("Error fetching maps");
}
