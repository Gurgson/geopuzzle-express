import { Router } from "express";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user data by ID
 *     tags:
 *       - Users
 *     security: []  # Public endpoint; add auth if needed
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID to fetch
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               # Add user data properties here if you want
 *       404:
 *         description: User not found
 */
userRouter.route("/:id").get(userController.getUserDataById);

export default userRouter;
