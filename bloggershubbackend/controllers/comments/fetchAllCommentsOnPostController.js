import prisma from "../../db/dbConfig.js";

//Fetch all comments on post
const fetchAllCommentsOnPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
      include: {
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                firstName: true,
                middleName: true,
                lastName: true,
                profileImage: true,
              },
            },
          },
        },
        CommentLikes: {
          select: {
            liked: true,
            userId: true,
          },
        },
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

    // If comments on post exist
    // Map comments to include likes count and dislikes count
    const commentsWithLikes = comments.map((comment) => {
      const likesCount = comment.CommentLikes.filter(
        (like) => like.liked
      ).length;
      const dislikesCount = comment.CommentLikes.filter(
        (like) => !like.liked
      ).length;

      return {
        ...comment,
        likesCount,
        dislikesCount,
      };
    });

    // If comments with likes on post does not exist
    if (!commentsWithLikes) {
      return res.json({
        status: 200,
        success: true,
        comments: comments,
        message: "No comments on this post!",
      });
    }

    return res.json({
      status: 200,
      success: true,
      comments: commentsWithLikes,
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
