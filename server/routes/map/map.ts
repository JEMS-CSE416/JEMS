import express, { Router } from "express";
import {
  queryMaps,
  getMap,
  createMap,
  updateMap,
  deleteMap,
} from "./controller/MapController";

const mapRouter = Router();
const MapController = require("./controller");

mapRouter.get("/", queryMaps);

mapRouter.get("/:id", getMap);

mapRouter.post("/:id",)



export default mapRouter;
