import { Request, Response } from "express";
import { connect, model } from "mongoose";
import { Map, mapSchema } from "./MapSchema";
import { ObjectId } from "mongodb";
import * as dotenv from "dotenv";

/**
 * Connects to the mongodb server and returns a queriable object
 * @returns
 */
async function getMapModel() {
  dotenv.config();
  await connect(process.env.MONGO_DB_CONNECTION_STRING);
  return model("Map", mapSchema);
}

/**
 * Queries the database for matching query and returns a list.
 * @param req request
 * @param res response
 * @returns list of maps
 * @returns error status code
 */
const queryMaps = async (req: Request, res: Response) => {
  const mapModel = await getMapModel();
  const map_name: string = req.query.map_name?.toString();
  const map_private: string = req.query.private?.toString();
  const creator_id: string = req.query.creator_id?.toString();
  const session_token: string = req.query.session_token?.toString();

  let loggedIn_user: string;
  let authed = false;
  let query: { [key: string]: any } = {};

  // first check if requiest has session token
  if (session_token) {
    // if session token is provided
    // do some auth here
    if (session_token !== null) {
      // check for auth here this is temporary
      authed = true;
      loggedIn_user = session_token;
    }
  }

  if (map_private == "true") {
    // want private maps
    // if session token is provided
    // do some auth here
    if (authed) {
      query.public = false;
    } else {
      return res.status(401).send("Error 401: Unauthorized");
    }
  } else if (map_private == "false") {
    // want public maps
    query.public = true;
  }

  if (map_name) {
    query.mapName = map_name;
  }

  if (creator_id) {
    if (ObjectId.isValid(creator_id)) {
      const creator = new ObjectId(creator_id);
      query.creatorId = creator;
    }
  }

  if (Object.keys(query).length > 0) {
    let result_maps = await mapModel.find(query);

    let allowed_to_send_back = result_maps.filter((map: Map) =>
      map.public || (authed && map.creatorId.toString() === loggedIn_user)
        ? true
        : false
    );

    res.send(allowed_to_send_back);
  } else {
    res.send(await mapModel.find({ }));
  }
};

/**
 * Gets a map from the database
 * @param req request
 * @param res response
 * @returns a map object
 * @returns error status code
 */
const getMap = async (req: Request, res: Response) => {};

/**
 * Duplicates an existing map into the database
 * @param req
 * @param res
 * @returns a map
 */
const duplicateMap = async (req: Request, res: Response) => {};

/**
 * Adds a new map into the database
 * @param req
 * @param res
 * @returns a map
 */
const createMap = async (req: Request, res: Response) => {
  const MapModel = await getMapModel();
  const mapStr = req.body.map_file_content;
  const map = new MapModel(mapStr);
  map
    .save()
    .then((savedDoc) => {
      res.send(savedDoc);
    })
    .catch((err) => {
      res.status(400).send("unable to save map due to " + err);
    });
};

/**
 * Updates a map in the database
 * @param req
 * @param res
 * @returns a map
 */
const updateMap = async (req: Request, res: Response) => {};

/**
 * removes a map from the database
 * @param req request
 * @param res response
 */
const deleteMap = async (req: Request, res: Response) => {};

export { queryMaps, getMap, createMap, duplicateMap, updateMap, deleteMap };
