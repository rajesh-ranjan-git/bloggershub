import { Router } from "express";
import fetchAllCommentsOnPost from "../../controllers/comments/fetchAllCommentsOnPostController.js";

const postsRouter = Router();

// Posts router
postsRouter.get("/fetchAllCommentsOnPost/:postId", fetchAllCommentsOnPost);
postsRouter.post("/addComment/:postId", addComment);

export default postsRouter;
