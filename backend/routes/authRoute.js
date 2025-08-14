// routes/authRoute.js
import express from "express";
import passport from "passport";
import { register, login, getMyProfile, logout, googleAuthSuccess } from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getMyProfile);
router.post("/logout", logout);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: false,
  }),
  googleAuthSuccess
);

export default router;
