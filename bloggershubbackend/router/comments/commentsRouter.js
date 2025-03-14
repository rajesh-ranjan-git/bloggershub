import { Router } from "express";
import fetchAllCommentsOnPost from "../../controllers/comments/fetchAllCommentsOnPostController.js";
import addComment from "../../controllers/comments/addCommentController.js";
import deleteComment from "../../controllers/comments/deleteCommentController.js";
import likeComment from "../../controllers/comments/likeCommentController.js";
import updateComment from "../../controllers/comments/updateCommentController.js";

const postsRouter = Router();

// Posts router
postsRouter.get("/fetchAllCommentsOnPost/:postId", fetchAllCommentsOnPost);
postsRouter.post("/addComment", addComment);
postsRouter.delete("/deleteComment", deleteComment);
postsRouter.put("/updateComment", updateComment);
postsRouter.post("/likeComment", likeComment);

export default postsRouter;
