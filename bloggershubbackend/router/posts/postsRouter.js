import { Router } from "express";
import createPost from "../../controllers/posts/createPostController.js";
import editPost from "../../controllers/posts/editPostController.js";
import deletePostController from "../../controllers/posts/deletePostController.js";
import fetchAllPostsByAuthor from "../../controllers/posts/fetchAllPostsByAuthorController.js";
import fetchAllPosts from "../../controllers/posts/fetchAllPostsController.js";
import fetchSinglePost from "../../controllers/posts/fetchSinglePostController.js";

const postsRouter = Router();

// Posts router
postsRouter.post("/createPost", createPost);
postsRouter.post("/editPost/:postId", editPost);
postsRouter.post("/deletePost/:postId", deletePostController);
postsRouter.get("/fetchAllPostsByAuthor/:authorId", fetchAllPostsByAuthor);
postsRouter.get("/fetchAllPosts", fetchAllPosts);
postsRouter.get("/fetchSinglePost/:postId", fetchSinglePost);

export default postsRouter;
