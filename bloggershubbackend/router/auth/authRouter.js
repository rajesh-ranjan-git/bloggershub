import { Router } from "express";
import signUp from "../../controllers/auth/signUpController.js";

const authRouter = Router();

// Auth router
authRouter.post("/signUp", signUp);

export default authRouter;
