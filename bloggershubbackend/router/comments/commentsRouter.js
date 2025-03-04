import { Router } from "express";
import fetchAllCommentsOnPost from "../../controllers/comments/fetchAllCommentsOnPostController.js";
import addComment from "../../controllers/comments/addCommentController.js";

const postsRouter = Router();

// Posts router
postsRouter.get("/fetchAllCommentsOnPost/:postId", fetchAllCommentsOnPost);
postsRouter.post("/addComment", addComment);

export default postsRouter;
