import express, { Router } from "express";
import {
  queryMaps,
  getMap,
  createMap,
  duplicateMap,
  updateMap,
  deleteMap,
} from "./controller/MapController";

const mapRouter = Router();

mapRouter.get("/", queryMaps);

mapRouter.get("/:id", getMap);

mapRouter.post("/:id", updateMap);

mapRouter.post("/duplicate", duplicateMap);

mapRouter.put("/", createMap);

mapRouter.post("/:id", deleteMap);

export default mapRouter;
