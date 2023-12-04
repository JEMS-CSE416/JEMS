/**
 * @swagger
 * tags:
 *   name: User
 *   description: The API that manages users -- getting user and in the future potentially deleting/updating a user
 *
 * components:
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

const userRouter = Router();

/**
 * @swagger
 * /api/user/:
 *   get:
 *     summary: Gets a user
 *     tags: [User]
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
userRouter.get("/", getUser);

export default userRouter;
