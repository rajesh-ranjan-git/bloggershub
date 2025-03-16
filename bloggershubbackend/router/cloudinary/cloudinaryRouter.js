import { Router } from "express";
import { uploadImage } from "../../helpers/cloudinary.js";
import ImageUpload from "../../controllers/cloudinary/imageUpload.js";

const cloudinaryRouter = Router();
// Upload image to cloudinary
cloudinaryRouter.post(
  "/uploadImage",
  uploadImage.single("myFile"),
  ImageUpload
);

export default cloudinaryRouter;
