import { Router } from "express";
import passport from "passport";
import { generateUserToken } from "../controllers/authController.js";

const authRouter = Router();

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Initiate Google OAuth login
 *     tags:
 *       - Authentication
 *     security: []  # No auth required to start OAuth
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth consent screen
 */
authRouter.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile"],
  })
);

/**
 * @swagger
 * /auth/google/redirect:
 *   get:
 *     summary: Google OAuth callback URL
 *     tags:
 *       - Authentication
 *     security: []  # This is a callback from Google, no bearer token expected
 *     responses:
 *       200:
 *         description: Returns generated JWT token after successful login
 *       401:
 *         description: Unauthorized - failed Google authentication
 */
authRouter.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  generateUserToken
);

export default authRouter;
