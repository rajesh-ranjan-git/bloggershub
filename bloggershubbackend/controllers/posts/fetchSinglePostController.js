import prisma from "../../db/dbConfig.js";

// Fetch single post
const fetchSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;

    console.log("postId : ", postId);

    const singlePost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    console.log("singlePost : ", singlePost);

    // If post not found
    if (!singlePost) {
      return res.json({
        status: 400,
        success: false,
        message: "Something went wrong while fetching post!",
      });
    }

    // If post found
    return res.json({
      status: 200,
      success: true,
      post: singlePost,
      message: "Post fetched successfully!",
    });
  } catch (error) {
    console.log("error while fetching all posts : ", error);
    // Check for other errors
    return res.json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default fetchSinglePost;
