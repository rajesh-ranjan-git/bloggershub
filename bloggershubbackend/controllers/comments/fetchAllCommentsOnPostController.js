import prisma from "../../db/dbConfig.js";

//Fetch all comments on post
const fetchAllCommentsOnPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });

    // If comments on post does not exist
    if (!comments) {
      return res.json({
        status: 400,
        success: false,
        message: "No comments on this post!",
      });
    }

    // If comments on post exists
    return res.json({
      status: 200,
      success: true,
      comments: comments,
      message: "Comments fetched successfully!",
    });
  } catch (error) {
    console.log("error while fetching all posts by selected author : ", error);
    // Check for other errors
    return res.json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default fetchAllCommentsOnPost;
