/**
 * @swagger
 * tags:
 *   name: Maps
 *   description: The Maps managing API
 *
 * components:
 *   schemas:
 *     Map:
 *       type: object
 *       required:
 *         - creatorId
 *         - mapName
 *         - description
 *         - creationDate
 *         - public
 *         - displayStrings
 *         - displayNumerics
 *         - displayLegend
 *         - displayPointers
 *         - thumbnail
 *         - regions
 *         - legend
 *       properties:
 *         creatorId:
 *           type: string
 *         mapName:
 *           type: string
 *         description: 
 *           type: string
 *         creationDate: 
 *           type: string
 *           format: date
 *         public: 
 *           type: boolean
 *         colorType: 
 *           type: string
 *         displayStrings: 
 *           type: boolean
 *         displayNumerics: 
 *           type: boolean
 *         displayLegend: 
 *           type: boolean
 *         displayPointers: 
 *           type: boolean
 *         thumbnail: 
 *           $ref: '#/components/schemas/Image'
 *         regions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Region'
 *         legend: 
 *           $ref: '#/components/schemas/Legend'
 *
 *     Legend:
 *       type: object
 *       required:
 *         - colorLegend
 *         - choroplethLegend
 *       properties:
 *         colorLegend:
 *           type: object
 *           additionalProperties:
 *             type: string
 *         choroplethLegend:
 *           type: object
 *           additionalProperties:
 *             type: integer
 *
 *     Image:
 *       type: object
 *       required:
 *         - imageUrl
 *         - imageType
 *       properties:
 *         imageUrl:
 *           type: string
 *           format: url
 *         imageType:
 *           type: string
 *         
 *     Region:
 *       type: object
 *       required:
 *         - regionName
 *         - coordinates
 *         - stringlabel
 *         - stringOffset
 *         - stringOffset
 *         - numericLabel
 *         - nuumericUnit
 *         - color
 *       properties:
 *         regionName:
 *           type: string
 *         coordinates:
 *           type: array
 *           items:
 *             type: array
 *             items:
 *               type: integer
 *         stringLabel:
 *           type: string
 *         stringOffset:
 *           type: array
 *           items:
 *             type: integer
 *         numericLabel:
 *           type: double
 *         numericUnit:
 *           type: string
 *         color:
 *           type: string
 */

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

/**
 * @swagger
 * /api/maps/:
 *   get:
 *     summary: Query Maps with a string
 *     tags: [Maps]
 *     parameters:
 *       - in: query
 *         name: map_name
 *         schema:
 *           type: string
 *       - in: query
 *         name: private
 *         schema:
 *            type: boolean
 *       - in: query
 *         name: creator_id
 *         schema: 
 *            type: string
 *       - in: query
 *         name: session_token
 *         schema:
 *            type: string
 * 
 *     responses:
 *       200:
 *         description: List of maps
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Map'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *
 */
mapRouter.get("/query", queryMaps);

/**
 * @swagger
 * /api/maps/{id}/:
 *   get:
 *     summary: Gets a map
 *     tags: [Maps]
 *     parameters:        
 *       - in: query
 *         name: id
 *         type: integer
 *         required: true
 *         description: Numeric ID of the map to get.
 *       - in: query
 *         name: creator_id
 *         schema: 
 *            type: string
 *       - in: query
 *         name: session_token
 *         schema:
 *            type: string
 *     responses:
 *       200:
 *         description: the map was retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Map'
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 * 
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *
 */
mapRouter.get("/:id", getMap);

mapRouter.post("/update/:id", updateMap);

mapRouter.post("/duplicate", duplicateMap);


/**
 * @swagger
 * /api/maps/:
 *   put:
 *     summary: Creates a map
 *     tags: [Maps]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             properties:
 *               map_file_content:
 *                 $ref: '#/components/schemas/Map'
 *     responses:
 *       201:
 *         description: the map created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Map'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *
 */
mapRouter.put("/", createMap);

mapRouter.delete("/:id", deleteMap);

export default mapRouter;
