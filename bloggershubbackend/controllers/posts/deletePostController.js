import prisma from "../../db/dbConfig.js";

//Delete Post
const deletePostController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { authorId } = req.body;

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

    // If deleting post was not successful
    if (!deletedPost) {
      return res.json({
        status: 400,
        success: false,
        message: "Something went wrong while deleting post!",
      });
    }

    // If post deleted successfully
    return res.json({
      status: 200,
      success: true,
      deletedPost: deletedPost,
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
