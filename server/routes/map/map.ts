/**
 * @swagger
 * tags:
 *   name: Maps
 *   description: The Maps managing API
 *
 * components:
 *   securitySchemes:
 *     BasicAuth:
 *       type: http
 *       scheme: basic
 *
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
 *           properties:
 *             hue:
 *               type: string
 *             min:
 *               type: number
 *             max:
 *               type: number
 *             items:
 *               type: object
 *               additionalProperties:
 *                 type: integer
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
import { isAuthMiddleWare } from "../auth/controller/AuthController";

const mapRouter = Router();


/**
 * @swagger
 * /api/maps/{id}:
 *   get:
 *     summary: Gets a map
 *     tags: [Maps]
 *     security:
 *       - BasicAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: string ID of the map to get.
 *
 *     responses:
 *       200:
 *         description: the map was retrieved
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
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *
 */
mapRouter.get("/:id", isAuthMiddleWare, getMap);

/**
 * @swagger
 * /api/maps/:
 *   get:
 *     summary: Query Maps with a string
 *     tags: [Maps]
 *     security:
 *       - BasicAuth: []
 *     parameters:
 *       - in: query
 *         name: map_name
 *         schema:
 *           type: string
 *       - in: query
 *         name: private
 *         schema:
 *            type: boolean
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
mapRouter.get("/", isAuthMiddleWare,  queryMaps);

/**
 * @swagger
 * /api/maps/update/{id}:
 *   put:
 *     summary: Updates a map
 *     tags: [Maps]
 *     security:
 *       - BasicAuth: []
 *     parameters:
 *      - in: query
 *        name: id
 *        type: integer
 *        required: true
 *        description: Numeric ID of the map to get.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             properties:
 *               mapName:
 *                 type: string
 *               public:
 *                 type: boolean
 *               description:
 *                 type: string
 *               colorType:
 *                 type: string
 *               displayStrings:
 *                 type: boolean
 *               displayNumerics:
 *                 type: boolean
 *               displayLegend:
 *                 type: boolean
 *               displayPointers:
 *                 type: boolean
 *               thumbnail:
 *                 $ref: '#/components/schemas/Image'
 *               regions:
 *                 type: array
 *               items:
 *                 $ref: '#/components/schemas/Region'
 *               legend:
 *                 $ref: '#/components/schemas/Legend'
 * 
 *     responses:
 *       200:
 *         description: the map updated
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
mapRouter.put("/update/", isAuthMiddleWare, updateMap);

/**
 * @swagger
 * /api/maps/duplicate:
 *   post:
 *     summary: Duplicates a map
 *     tags: [Maps]
 *     security:
 *       - BasicAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               map_id:
 *                 type: string
 *               map_name:
 *                 type: string
 *               description:
 *                 type: string
 *               public:
 *                 type: boolean
 *               colorType:
 *                 type: string
 *               displayStrings:
 *                 type: boolean
 *               displayNumerics:
 *                 type: boolean
 *               displayLegend:
 *                 type: boolean
 *               displayPointers:
 *                 type: boolean
 *               thumbnail:
 *                 $ref: '#/components/schemas/Image'
 *               legend:
 *                 $ref: '#/components/schemas/Legend'
 *
 *             required:
 *               - map_id
 *               - map_name
 *               - description
 *               - public
 *     responses:
 *       201:
 *         description: the map was duplicated
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
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
mapRouter.post("/duplicate/",isAuthMiddleWare, duplicateMap);

/**
 * @swagger
 * /api/maps/:
 *   put:
 *     summary: Creates a map
 *     tags: [Maps]
 *     security:
 *       - BasicAuth: []
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
mapRouter.put("/", isAuthMiddleWare, createMap);

mapRouter.delete("/:id",isAuthMiddleWare, deleteMap);

export default mapRouter;
