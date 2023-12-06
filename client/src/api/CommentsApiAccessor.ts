import { Comment } from "../utils/models/Comment";
import { BACKEND_URL, LOCAL_BACKEND_URL } from "../utils/constants";

let getCommentsUrl = "";
let createCommentUrl = "";
if (process.env.REACT_APP_PROCESS_STAGE === 'dev') {
    console.log("DEV MODE")
    getCommentsUrl = LOCAL_BACKEND_URL + "/api/comment/";
    createCommentUrl = LOCAL_BACKEND_URL + "/api/comment/create/";
} else {
    console.log("PROD MODE")
    getCommentsUrl = BACKEND_URL + "/api/comment/";
    createCommentUrl = BACKEND_URL + "/api/comment/create/";
}

/**
  * Creates a new comment for a map
  */
export async function createComment(req: any) {
    try {
        const res = await fetch(createCommentUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
            credentials: "include"
        });
        if (res.ok) {
            const resData = await res.json();
            console.log("Comment created successfully:");
            return resData;
        } else {
            console.error("Error creating comment:", res.status, res.statusText);
        }
    } catch (error) {
        console.log(error);
    }
    return Promise.reject("Promise Reject - Error creating comment");
}

interface MapQueryParams {
    mapId: string;
    isPrivate?: boolean;
}

/**
  * Gets all comments for a map
  */
export async function getComments({
    mapId,
}: MapQueryParams): Promise<Comment[]> {
    try {
        const res = await fetch(getCommentsUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json", "id": mapId },
            credentials: "include"
        });
        if (res.ok) {
            const resData = await res.json();
            console.log("Successfully grabbed comments list:", resData);
            return resData;
        } else {
            console.error("Error grabbing comments:", res.status, res.statusText);
        }
    } catch (error) {
        console.log(error);
    }
    return Promise.reject("Error fetching comments");
}