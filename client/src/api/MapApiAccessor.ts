import { Map, ErrorMap } from "../utils/models/Map";
import { BACKEND_URL } from "../utils/constants";

const mapsUrl = BACKEND_URL + "/api/maps/";

interface GetMapParams {
  mapId: string;
  creatorId: string;
}

export async function getMap({ mapId, creatorId }: GetMapParams): Promise<Map> {
  try {
    const res = await fetch(mapsUrl + mapId + "?creatorId=" + creatorId, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error updating data:", error);
  }
  // TODO: replace this with an actual getMap endpoint
  console.log("TODO: REMOVE PLACEHOLDER IN GETMAP", mapId);
  return Promise.resolve(ErrorMap);
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
}: duplicateMapParams): Promise<Map> {
  try {
    // TODO: replace with mapsurl when live server is up
    const res = await fetch("http://localhost:443/api/maps/" + "duplicate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + creatorId,
      },
      body: JSON.stringify({
        map_id: mapId,
        mapName: mapName,
        description: description,
        public: isPublic,
      }),
    });
    console.log(res);
  } catch (error) {
    console.error("Error updating data:", error);
  }
  return Promise.reject("Error fetching maps in duplicateMap API Accessor");
}
