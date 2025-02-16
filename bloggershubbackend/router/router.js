import { Router } from "express";
import authRouter from "./auth/authRouter.js";

// Router instance
const router = Router();

// Auth routes
router.use("/auth", authRouter);

export default router;
