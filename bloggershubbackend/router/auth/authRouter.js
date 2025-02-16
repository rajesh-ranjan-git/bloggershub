import { Router } from "express";
import signUp from "../../controllers/auth/signUpController.js";
import signIn from "../../controllers/auth/signInController.js";

const authRouter = Router();

// Auth router
authRouter.post("/signUp", signUp);
authRouter.get("/signIn", signIn);

export default authRouter;
