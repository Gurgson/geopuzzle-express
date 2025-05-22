import { Router } from "express";
import * as trackController from "../controllers/trackControllers.js";
import * as waypointController from "../controllers/waypointController.js";
import { protectedRoute, convertUserToBody } from "../controllers/authController.js";

const trackRouter = Router();

/**
 * @swagger
 * /track:
 *   get:
 *     summary: Get all tracks
 *     tags:
 *       - Tracks
 *     security: []  # Public
 *     responses:
 *       200:
 *         description: Array of tracks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *   post:
 *     summary: Add a new track
 *     tags:
 *       - Tracks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Track data (user info auto-injected)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # add your track DTO schema properties here
 *     responses:
 *       201:
 *         description: Track created
 *       401:
 *         description: Unauthorized
 */
trackRouter
  .route("/")
  .get(trackController.getAllTrack)
  .post(protectedRoute, convertUserToBody, trackController.addOneTrack);

/**
 * @swagger
 * /track/waypoint:
 *   delete:
 *     summary: Delete a waypoint (body params expected)
 *     tags:
 *       - Waypoints
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Waypoint info to delete
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # add your expected delete params here
 *     responses:
 *       204:
 *         description: Waypoint deleted successfully
 *       401:
 *         description: Unauthorized
 */
trackRouter.route("/waypoint/").delete(protectedRoute, waypointController.deleteWaypoint);

/**
 * @swagger
 * /track/waypoint/text/{id}:
 *   post:
 *     summary: Add a text waypoint to a track
 *     tags:
 *       - Waypoints
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Track ID to add waypoint to
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Text waypoint data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # define text waypoint schema here
 *     responses:
 *       201:
 *         description: Text waypoint added
 *       401:
 *         description: Unauthorized
 */
trackRouter.route("/waypoint/text/:id").post(protectedRoute, waypointController.addTextWaypoint);

/**
 * @swagger
 * /track/waypoint/graphic/{id}:
 *   post:
 *     summary: Add a graphic waypoint to a track (file upload)
 *     tags:
 *       - Waypoints
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Track ID to add graphic waypoint to
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Graphic waypoint data (multipart/form-data with picture)
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               picture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Graphic waypoint added
 *       401:
 *         description: Unauthorized
 */
trackRouter
  .route("/waypoint/graphic/:id")
  .post(protectedRoute, waypointController.uploadPictureForWaypoint, waypointController.addGraphicWaypoint);

/**
 * @swagger
 * /track/{id}:
 *   get:
 *     summary: Get a single track by ID
 *     tags:
 *       - Tracks
 *     security: []  # Public
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Track ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Track data
 *       404:
 *         description: Track not found
 *   patch:
 *     summary: Update a track by ID
 *     tags:
 *       - Tracks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Track ID to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Fields to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # define partial track DTO here
 *     responses:
 *       200:
 *         description: Track updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Track not found
 *   delete:
 *     summary: Delete a track by ID
 *     tags:
 *       - Tracks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Track ID to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Track deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Track not found
 */
trackRouter
  .route("/:id")
  .get(trackController.getOneTrack)
  .patch(protectedRoute, trackController.updateOneTrack)
  .delete(protectedRoute, trackController.deleteOneTrack);

/**
 * @swagger
 * /track/thumbnail/{id}:
 *   post:
 *     summary: Upload and update track thumbnail image
 *     tags:
 *       - Tracks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Track ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Thumbnail image (multipart/form-data)
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Thumbnail updated successfully
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a track thumbnail
 *     tags:
 *       - Tracks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Track ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Thumbnail deleted successfully
 *       401:
 *         description: Unauthorized
 */
trackRouter
  .route("/thumbnail/:id")
  .post(protectedRoute, trackController.uploadTrackThumbnail, trackController.updateTrackThumbnail)
  .delete(protectedRoute, trackController.deleteTrackThumbnail);

export default trackRouter;
