/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The API that manages auth -- logging in/out and signing up.
 *
 * components:
 *   schemas:
 *     Map:
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
import {
  login,
  logout,
  isAuthEndpt,
  signUp,
  initiatePasswordChange,
  changePassword
} from "./controller/AuthController";

const authRouter = Router();

/**
 * @swagger
 * /api/auth/signup/:
 *   put:
 *     summary: sign up of account provided
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               displayName:
 *                 type: string
 * 
 *     responses:
 *       200:
 *         description: Successfully signed up in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 id:
 *                   type: string
 *                 displayName:
 *                   type: string
 *          
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *
 */
authRouter.put("/signup", signUp);

/**
 * @swagger
 * /api/auth/login/:
 *   post:
 *     summary: Login to account provided
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 * 
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 id:
 *                   type: string
 *                 displayName:
 *                   type: string
 *          
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *
 */
authRouter.post("/login/", login);

/**
 * @swagger
 * /api/auth/logout/:
 *   post:
 *     summary: Logout using session id
 *     tags: [Auth]
 * 
 *     responses:
 *       200:
 *         description: Successfully logged out
 *          
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *
 */
authRouter.get("/logout/", logout);

/**
 * @swagger
 * /api/auth/:
 *   post:
 *     summary: Check if session attatched to user is authenticated
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 * 
 *     responses:
 *       200:
 *         description: authenticated
 *          
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *
 */
authRouter.post("/", isAuthEndpt);

/**
 * @swagger
 * /api/auth/forgotPass/:
 *   post:
 *     summary: Initiate password change
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             properties:
 *               email:
 *                 type: string
 * 
 *     responses:
 *       200:
 *         description: successful initiate password change
 *          
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *
 */
authRouter.post("/forgotPass/", initiatePasswordChange);

/**
 * @swagger
 * /api/auth/changePass/:
 *   post:
 *     summary: Login to account provided
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             properties:
 *               resetId:
 *                 type: string
 *               password:
 *                 type: string
 * 
 *     responses:
 *       200:
 *         description: Successfully password change
 *          
 *       400:
 *         description: Bad Link
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *
 *       405:
 *         description: Expired Link
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *
 */
authRouter.post("/changePass/", changePassword);

export default authRouter;
