import { Router } from "express";
import fetchProfile from "../../controllers/profile/fetchProfileController.js";
import updateProfile from "../../controllers/profile/updateProfileController.js";

const profileRouter = Router();

// Profile router
profileRouter.get("/fetchProfile/:userId", fetchProfile);
profileRouter.post("/updateProfile/:userId", updateProfile);

export default profileRouter;
