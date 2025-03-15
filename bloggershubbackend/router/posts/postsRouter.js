import { Router } from "express";
import createPost from "../../controllers/posts/createPostController.js";
import updatePost from "../../controllers/posts/updatePostController.js";
import deletePostController from "../../controllers/posts/deletePostController.js";
import fetchAllPostsByAuthor from "../../controllers/posts/fetchAllPostsByAuthorController.js";
import fetchAllPosts from "../../controllers/posts/fetchAllPostsController.js";
import fetchLatestPosts from "../../controllers/posts/fetchLatestPostsController.js";
import fetchSinglePost from "../../controllers/posts/fetchSinglePostController.js";

const postsRouter = Router();

// Posts router
postsRouter.post("/createPost", createPost);
postsRouter.get("/fetchAllPostsByAuthor/:authorId", fetchAllPostsByAuthor);
postsRouter.get("/fetchAllPosts", fetchAllPosts);
postsRouter.get("/fetchLatestPosts", fetchLatestPosts);
postsRouter.get("/fetchSinglePost/:postId", fetchSinglePost);
postsRouter.post("/deletePost/:postId", deletePostController);
postsRouter.post("/updatePost/:postId", updatePost);

export default postsRouter;
