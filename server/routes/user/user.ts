/**
 * @swagger
 * tags:
 *   name: User
 *   description: The API that manages users -- getting user and in the future potentially deleting/updating a user
 *
 * components:
 *   securitySchemes:
 *     BasicAuth:
 *       type: http
 *       scheme: basic
 * 
 *   schemas:
 *     User:
 *       type: Object
 *       required:
 *         - email
 *         - displayName
 *         - passowrd
 *       properties:
 *         email:
 *           type: string
 *         displayName:
 *           type: string
 *         password:
 *           type: string
 */

import { Router } from "express";
import { getUser } from "./controller/UserController";
import { isAuthMiddleWare } from "../auth/controller/AuthController";

const userRouter = Router();

/**
 * @swagger
 * /api/user/:
 *   get:
 *     summary: Gets a user
 *     tags: [User]
 *     security:
 *       - BasicAuth: []
 *     parameters:
 *       - in: header
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
userRouter.get("/", isAuthMiddleWare, getUser);

export default userRouter;
