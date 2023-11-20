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
  const token: string = req.query.session_token?.toString(); // TODO: session token should be in the header not the query

  let tokenVerified = false;
  let tokenUserID = "";
  let query: { [key: string]: any } = {};

  /* Does the request have a token? */
  if (token) {
    // TODO: Verify the token
    tokenVerified = true;
    if (!tokenVerified) {
      return res
        .status(401)
        .send("Error 401: Unauthorized. Your token is invalid.");
    }

    /* Get the user ID from the token (this is the user that is logged in) */
    // TODO: Get the user ID from the token. The token is the user ID for now
    tokenUserID = token;
  }

  /* does the request want private maps too? */
  if (map_private == "true") {
    // want private maps
    if (!tokenVerified) {
      // check if the user is authenticated
      return res
        .status(401)
        .send("Error 401: Unauthorized. Your token is invalid.");
    }
    query.public = false;
  } else if (map_private == "false") {
    // want public maps
    query.public = true;
  }

  /* does the request want to search by map name too? */
  if (map_name) {
    query.mapName = map_name;
  }

  /* does the request want to search by creator id as well? */
  if (creator_id) {
    // first check if the creator id is even valid
    if (ObjectId.isValid(creator_id)) {
      const creator = new ObjectId(creator_id);
      query.creatorId = creator;
    }
  }

  /** Now that we've gone through the different fields that you can search by,
   * ask mongodb for the results and filter out maps that the user can't recieve.
   * e.g if they're logged in but requests all private maps. in this case we'll only give them back what they own.
   *
   *
   * If we're here and all the fields are still empty (meaning that the request was sent with no query parameters)
   * then FOR NOW we just return all public maps.
   */
  if (Object.keys(query).length > 0) {
    let result_maps = await mapModel.find(query);

    let allowed_to_send_back = result_maps.filter((map: Map) =>
      map.public || (tokenVerified && map.creatorId.toString() === tokenUserID)
        ? true
        : false
    );

    res.send(allowed_to_send_back);
  } else {
    res.send(await mapModel.find({ public: true }));
  }
};

/**
 * Gets a map from the database
 * @param req request
 * @param res response
 * @returns a map object
 * @returns error status code
 */
const getMap = async (req: Request, res: Response) => {
  /* Get collection of maps */
  const mapModel = await getMapModel();
  const map_id = req.params.id;
  const token: string = req.query.session_token?.toString();
  const creator_id: string = req.query.creator_id?.toString();
  let tokenVerified = false;
  let tokenUserID = "";

  /* CHECKING AUTH SHOULD CHECK WITH A FUNCTION FROM THE AUTH CONTROLLER */
  if (!token) {
    // TODO: Verify the token
    tokenVerified = true;
    if (!tokenVerified) {
      return res
        .status(401)
        .send("Error 401: Unauthorized. Your token is invalid.");
    }

    /* Get the user ID from the token (this is the user that is logged in) */
    // TODO: Get the user ID from the token. The token is the user ID for now
    tokenUserID = token.split(" ")[1];
  }

  /* Check map exists */
  const map = await mapModel.findById(map_id);
  if(!map) {
    return res.status(404).send("Error 404: Map not found");
  }

  return res.status(200).send(map);
};

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
      res.status(201).send(savedDoc);
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
const deleteMap = async (req: Request, res: Response) => {
  const mapModel = await getMapModel();

  const map_id = req.params.id;

  const token = req.headers.authorization;

  /* CHECKING AUTH SHOULD CHECK WITH A FUNCTION FROM THE AUTH CONTROLLER */
  if (!token) {
    return res.status(401).send("Error 401: Unauthorized");
  }

  /* Verify the token */
  const tokenVerified = true;
  if (!tokenVerified) {
    return res
      .status(401)
      .send("Error 401: Unauthorized. Your token is invalid.");
  }

  /* Get the user ID from the token (this is the user that is logged in) */
  // TODO: Get the user ID from the token. The token is the user ID for now
  const tokenUserID = token.split(" ")[1]; // we split token bc theres a bearer in front of it
  // CHECKING AUTH SHOULD CHECK WITH A FUNCTION FROM THE AUTH CONTROLLER

  /* Check if the map exists */
  const map = await mapModel.findById(map_id);
  if (!map) {
    return res.status(404).send("Error 404: Map not found");
  }

  /* Check if the user is the owner of the map */
  if (map.creatorId.toString() !== tokenUserID) {
    return res
      .status(401)
      .send("Error 401: Unauthorized. You do not own this map.");
  }

  /* Delete the map */
  await map.deleteOne();

  /* Return success */
  return res.status(204).send();
};

export { queryMaps, getMap, createMap, duplicateMap, updateMap, deleteMap };
