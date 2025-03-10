import prisma from "../../db/dbConfig.js";
import { getAuthorDetails } from "./getAuthorDetails.js";

// Fetch single post
const fetchSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const singlePost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    // If post not found
    if (!singlePost) {
      return res.json({
        status: 400,
        success: false,
        message: "Something went wrong while fetching post!",
      });
    }

    // If post found
    // Get author details
    const author = await getAuthorDetails(singlePost.authorId);

    // Send the response even if author is not found
    return res.json({
      status: 200,
      success: true,
      post: singlePost,
      author: author,
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
