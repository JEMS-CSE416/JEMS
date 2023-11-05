import { Request, Response } from "express";
import { connect, model } from 'mongoose'
import { mapSchema } from './MapSchema'

/**
 * Connects to the mongodb server and returns a queriable object
 * @returns 
 */
async function getMapModel(){
    await connect('mongodb://127.0.0.1:27017/test');
    return model('Map', mapSchema);
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
    const qPhrase = req.query.qPhrase
    console.log("here")

    res.send(
        await mapModel.find()
    )

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
    console.log(req.body)
    const mapStr = req.body.map_file_content
    const map = new MapModel(mapStr);
    console.log(mapStr)
    console.log(map)
    map.save()
        .then( savedDoc => {res.send(savedDoc)})
        .catch( err => { res.status(400).send('unable to save map due to ' + err)})
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


export {
  queryMaps,
  getMap,
  createMap,
  duplicateMap,
  updateMap,
  deleteMap,
};
