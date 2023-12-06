/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: The API that manages comments -- creating comments & grabbing them - in the future potentially deleting/updating a comment
 *
 * components:
 *   securitySchemes:
 *     BasicAuth:
 *       type: http
 *       scheme: basic
 * 
 *   schemas:
 *     Comment:
 *       type: Object
 *       required:
 *         - commenterId
 *         - displayName
 *         - mapId
 *         - content
 *         - creationDate
 *       properties:
 *         commenterId:
 *           type: string
 *         displayName:
 *           type: string
 *         mapId:
 *           type: string 
 *         content:
 *           type: string
 *         creationDate:
 *           type: Date
 */

import { Router } from "express";
import { getComments, createComment } from "./controller/CommentController";
import { isAuthMiddleWare } from "../auth/controller/AuthController";

const commentRouter = Router();

/**
 * @swagger
 * /api/comment/create/:
 *   put:
 *     summary: makes a new comment
 *     tags: [Comment]
 *     security:
 *       - BasicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             properties:
 *               commenterId:
 *                 type: string
 *               displayName:
 *                 type: string
 *               mapId:
 *                 type: string
 *               content:
 *                 type: string
 * 
 *     responses:
 *       201:
 *         description: the comment created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
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
commentRouter.put("/create", isAuthMiddleWare, createComment);

/**
 * @swagger
 * /api/comment/:
 *   get:
 *     summary: Gets a list of comments
 *     tags: [Comment]
 *     security:
 *       - BasicAuth: []
 *     parameters:
 *       - in: header
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The map id
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
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
 */
commentRouter.get("/", isAuthMiddleWare, getComments);


export default commentRouter;