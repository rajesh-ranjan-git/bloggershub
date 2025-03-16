import { Router } from "express";
import authRouter from "./auth/authRouter.js";
import postsRouter from "./posts/postsRouter.js";
import commentsRouter from "./comments/commentsRouter.js";
import profileRouter from "./profile/profileRouter.js";
import cloudinaryRouter from "./cloudinary/cloudinaryRouter.js";

// Router instance
const router = Router();

// Auth routes
router.use("/auth", authRouter);

// Posts routes
router.use("/posts", postsRouter);

// Comments routes
router.use("/comments", commentsRouter);

// Profile routes
router.use("/profile", profileRouter);

// Cloudinary routes
router.use("/cloudinary", cloudinaryRouter);

export default router;
