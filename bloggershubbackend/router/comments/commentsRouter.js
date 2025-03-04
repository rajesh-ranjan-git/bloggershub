import { Router } from "express";
import fetchAllCommentsOnPost from "../../controllers/comments/fetchAllCommentsOnPostController.js";
import addComment from "../../controllers/comments/addCommentController.js";
import deleteComment from "../../controllers/comments/deleteCommentController.js";

const postsRouter = Router();

// Posts router
postsRouter.get("/fetchAllCommentsOnPost/:postId", fetchAllCommentsOnPost);
postsRouter.post("/addComment", addComment);
postsRouter.delete("/deleteComment", deleteComment);

export default postsRouter;
