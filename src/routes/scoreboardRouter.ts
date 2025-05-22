import { Router } from "express";
import * as scoreboardController from "../controllers/scoreboardController.js";
import { protectedRoute } from "../controllers/authController.js";

const scoreboardRouter = Router();

/**
 * @swagger
 * /scoreboard:
 *   get:
 *     summary: Get all scoreboard entries
 *     tags:
 *       - Scoreboard
 *     security: []  # Public endpoint, no auth required
 *     responses:
 *       200:
 *         description: Array of scoreboard entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 # You can add properties of scoreboard entries here if you want
 */
scoreboardRouter.route("/").get(scoreboardController.getAllScoreboardEntries);

/**
 * @swagger
 * /scoreboard/{id}:
 *   delete:
 *     summary: Delete (truncate) a scoreboard entry by ID
 *     tags:
 *       - Scoreboard
 *     security:
 *       - bearerAuth: []  # Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the scoreboard entry to delete
 *     responses:
 *       204:
 *         description: Scoreboard entry deleted successfully (No Content)
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: Scoreboard entry not found
 */
scoreboardRouter
  .route("/:id")
  .delete(protectedRoute, scoreboardController.truncateScroreboard);

export default scoreboardRouter;
