import { Request, Response } from "express";
import { connect, model, Types } from "mongoose";
import { Map, mapSchema } from "./MapSchema";
import { ObjectId } from "mongodb";

/**
 * Connects to the mongodb server and returns a queriable object
 * @returns
 */
export async function getMapModel() {
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
  const owned: string = req.query.owned?.toString();
  const creator_id: string = req.session.user.id

  let query: { [key: string]: any } = {};


  /* does the request want private maps too? */
  if (map_private == "true") {
    query.public = false;
  } else if (map_private == "false") {
    // want public maps
    query.public = true;
  }

  /* does the request want to search by map name too? */
  if (map_name) {
    query.mapName = { $regex: new RegExp(map_name, 'i') };
  }

  /** Now that we've gone through the different fields that you can search by,
   * ask mongodb for the results and filter out maps that the user can't recieve.
   * e.g if they're logged in but requests all private maps. in this case we'll only give them back what they own.
   *
   *
   * If we're here and all the fields are still empty (meaning that the request was sent with no query parameters)
   * then FOR NOW we just return all public maps.
   */
  if(owned === "true"){
    return res.send(await mapModel.find({ creatorId: creator_id }));
  }

  if (Object.keys(query).length > 0) {
    let result_maps = await mapModel.find(query);

    let allowed_to_send_back = result_maps.filter((map: Map) =>
      map.public || ( map.creatorId.toString() === creator_id)
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
  const map_id = req.params.id?.toString();
  console.log(map_id)
  const creator_id: string = req.session.user.id;


  /* Check map exists */
  const map = await mapModel.findById(map_id);
  if (!map) {
    return res.status(404).send("Error 404: Map not found" + map_id);
  }

  /* Check maps private status */
  if (map.public == false) {
    /* Private Map */
    if (map.creatorId.toString() == creator_id) {
      /* check if the user is authenticated */
      return res.status(200).send(map);
    }
    return res
      .status(401)
      .send("Error 401: Unauthorized. Your token is invalid.");
  } else if (map.public == true) {
    /* Public Map */
    return res.status(200).send(map);
  } else {
    /* Private status not specified*/
    return res
      .status(400)
      .send("Error 400: Bad Request. Private status not specified.");
  }
};

/**
 * Duplicates an existing map into the database
 * @param req
 * @param res
 * @returns a map
 */
const duplicateMap = async (req: Request, res: Response) => {
  // takes in map id, map name, and description, and session token
  const mapModel = await getMapModel();
  const map_id = req.body.map_id;
  const map_name = req.body.map_name;
  const description = req.body.description;
  const isPublic = req.body.public;


  /* Get the user ID from the token (this is the user that is logged in) */
  const creator_id = req.session.user.id;
  // CHECKING AUTH SHOULD CHECK WITH A FUNCTION FROM THE AUTH CONTROLLER

  /* Check if the map exists */
  const map = await mapModel.findById(map_id);
  if (!map) {
    return res.status(404).send("Error 404: Map not found");
  }

  /* Is this private map? If so can this user duplicate this map? */
  if (!map.public) {
    // check if this map belongs to this user.
    if (map.creatorId.toString() !== creator_id) {
      return res
        .status(401)
        .send("Error 401: Unauthorized. Not your map to duplicate.");
    }
  }

  const duplicateMap = {
    ...map.toObject(),
    mapName: map_name,
    description: description,
    public: isPublic,
    creatorId: new Types.ObjectId(creator_id),
    creationDate: new Date().toISOString(),
    _id: new Types.ObjectId(),
  };


  /* Duplicate the map */
  const newMap = new mapModel(duplicateMap);

  await newMap.save();

  return res.status(201).send(newMap);
};

/**
 * Adds a new map into the database
 * @param req
 * @param res
 * @returns a map
 */
const createMap = async (req: Request, res: Response) => {
  console.log("inside create map");
  const MapModel = await getMapModel();
  const mapStr = {
    ...req.body.map_file_content,
    creatorId:req.session.user.id
  }
  console.log(req.body);
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
const updateMap = async (req: Request, res: Response) => {
  // TODO: Add security checks in future to double check whether the user accessing is indeed the owner of the map
  console.log("inside update map");
  const mapModel = await getMapModel();
  console.log(req.body);
  const map_id = req.query.id;
  const mapName = req.body.mapName;
  const isPublic = req.body.public;
  const description = req.body.description;
  const colorType = req.body.colorType;
  const displayStrings = req.body.displayStrings;
  const displayNumerics = req.body.displayNumerics;
  const displayLegend = req.body.displayLegend;
  const displayPointers = req.body.displayPointers;
  const thumbnail = req.body.thumbnail;
  const regions = req.body.regions;
  const legend = req.body.legend;
  const creator_id = req.session.user.id;

  /* Check map exists in database */
  let map;
  try {
    map = await mapModel.findById(map_id);
    
  } catch (error) {
    return res.status(400).send("Bad mapid format")
    
  }
  if (!map) {
    return res.status(404).send("Error 404: Map not found");
  }
  if (map.creatorId.toString() !== creator_id) {
    /* check if the user is authenticated */
    return res.status(401).send("Error 401: Not Authenticated");
  }

  try {
    const mapUpdateResponse = await mapModel.updateOne(
      { _id: map_id },
      {
        $set: {
          mapName: mapName,
          public: isPublic,
          description: description,
          colorType: colorType,
          displayStrings: displayStrings,
          displayNumerics: displayNumerics,
          displayLegend: displayLegend,
          displayPointers: displayPointers,
          thumbnail: thumbnail,
          regions: regions,
          legend: legend,
        },
      }
    );
    res.status(200).send(mapUpdateResponse);
  } catch (error) {
    console.log(error);
  }
};

/**
 * removes a map from the database
 * @param req request
 * @param res response
 */
const deleteMap = async (req: Request, res: Response) => {
  const mapModel = await getMapModel();

  const map_id = req.params.id;
  const creator_id = req.session.user.id;


  // CHECKING AUTH SHOULD CHECK WITH A FUNCTION FROM THE AUTH CONTROLLER

  /* Check if the map exists */
  const map = await mapModel.findById(map_id);
  if (!map) {
    return res.status(404).send("Error 404: Map not found");
  }

  /* Check if the user is the owner of the map */
  if (map.creatorId.toString() !== creator_id) {
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
