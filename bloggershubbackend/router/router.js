import { Router } from "express";
import authRouter from "./auth/authRouter.js";
import postsRouter from "./posts/postsRouter.js";
import profileRouter from "./profile/profileRouter.js";

// Router instance
const router = Router();

// Auth routes
router.use("/auth", authRouter);

// Posts routes
router.use("/posts", postsRouter);

// Profile routes
router.use("/profile", profileRouter);

export default router;
