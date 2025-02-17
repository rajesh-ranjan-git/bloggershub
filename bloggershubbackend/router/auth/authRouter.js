import { Router } from "express";
import signUp from "../../controllers/auth/signUpController.js";
import signIn from "../../controllers/auth/signInController.js";
import signOut from "../../controllers/auth/signOutController.js";
import checkAuth from "../../controllers/auth/checkAuthController.js";
import authMiddleware from "../../middlewares/auth/authMiddleware.js";
import deleteAccount from "../../controllers/auth/deleteAccountController.js";

const authRouter = Router();

// Auth router
authRouter.get("/checkAuth", authMiddleware, checkAuth);
authRouter.post("/signUp", signUp);
authRouter.post("/signIn", signIn);
authRouter.post("/signOut", signOut);
authRouter.post("/deleteAccount/:userId", deleteAccount);

export default authRouter;
