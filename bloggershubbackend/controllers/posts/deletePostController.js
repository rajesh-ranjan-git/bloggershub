import prisma from "../../db/dbConfig.js";

//Delete Post
const deletePostController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { authorId } = req.body;

    console.log("postId : ", postId);

    console.log("authorId : ", authorId);

    if (!postId || postId === "") {
      return res.json({
        status: 400,
        success: false,
        message: "Post Id is required to delete post!",
      });
    }

    if (!authorId || authorId === "") {
      return res.json({
        status: 400,
        success: false,
        message: "Author Id is required to delete post!",
      });
    }

    // Fetch post to delete
    const findPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    console.log("findPost : ", findPost);

    // If post not found
    if (!findPost) {
      return res.json({
        status: 400,
        success: false,
        message: "Post not found!",
      });
    }

    // If post found
    // If author deleting the post is not the original author
    if (findPost.authorId !== authorId) {
      return res.json({
        status: 400,
        success: false,
        message: "Invalid delete post request!",
      });
    }

    // If author deleting the post is the original author
    // Delete post
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    console.log("deletedPost : ", deletedPost);

    // If deleting post was not successful
    if (!deletedPost) {
      return res.json({
        status: 400,
        success: false,
        message: "Something went wrong while deleting post!",
      });
    }

    // If post deleted successfully
    // Fetch all posts by author
    const posts = await prisma.post.findMany({});

    console.log("posts : ", posts);

    // If fetching posts failed
    if (!posts) {
      return res.json({
        status: 200,
        success: true,
        deletedPost: deletedPost,
        message:
          "Post deleted successfully but something went wrong while fetching posts!",
      });
    }

    // If no posts available
    if (posts.length <= 0) {
      return res.json({
        status: 200,
        success: true,
        deletedPost: deletedPost,
        message: "Post deleted successfully and no further posts found!",
      });
    }

    // Return all posts by author
    return res.json({
      status: 200,
      success: true,
      deletedPost: deletedPost,
      posts: posts,
      message: "Post deleted successfully!",
    });
  } catch (error) {
    console.log("error while deleting post : ", error);
    // Check for other errors
    return res.json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default deletePostController;
