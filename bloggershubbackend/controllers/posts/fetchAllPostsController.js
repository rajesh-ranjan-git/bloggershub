import prisma from "../../db/dbConfig.js";

// Fetch all posts
const fetchAllPosts = async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany({});

    // If posts not found
    if (!allPosts) {
      return res.json({
        status: 400,
        success: false,
        message: "Something went wrong while fetching posts!",
      });
    }

    if (allPosts.length <= 0) {
      return res.json({
        status: 400,
        success: false,
        message: "No posts found!",
      });
    } else if (allPosts.length > 0) {
      // If posts found
      return res.json({
        status: 200,
        success: true,
        posts: allPosts,
        message: "Posts fetched successfully!",
      });
    }

    return res.json({
      status: 500,
      success: false,
      message: "Something went wrong!",
      posts: posts,
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

export default fetchAllPosts;
