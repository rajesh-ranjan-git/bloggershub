import vine, { errors } from "@vinejs/vine";
import prisma from "../../db/dbConfig.js";
import likeCommentSchema from "../../validations/comments/likeCommentSchema.js";

//Fetch all comments on post
const likeComment = async (req, res) => {
  try {
    const body = req.body;

    const validator = vine.compile(likeCommentSchema);
    const payload = await validator.validate(body);

    // Find comment to like
    const comment = await prisma.comment.findUnique({
      where: {
        id: payload.commentId,
      },
    });

    // If comment does not exist
    if (!comment) {
      return res.json({
        status: 400,
        success: false,
        message: "Comment not found!",
      });
    }

    // Check if comment exists in CommentLikes
    let likedComment = await prisma.commentLikes.findUnique({
      where: {
        commentId: payload.commentId,
      },
    });

    // If comment exists in CommentLikes, update like record
    if (likedComment && likedComment.liked === payload.liked) {
      return res.json({
        status: 400,
        success: false,
        message: "Invalid like operation!",
      });
    } else if (likedComment && likedComment.liked !== payload.liked) {
      likedComment = await prisma.commentLikes.update({
        where: {
          commentId: payload.commentId,
        },
        data: {
          liked: payload.liked,
        },
      });
    }

    // If comment does not exist in CommentLikes, create like record
    likedComment = await prisma.commentLikes.create({
      data: payload,
    });

    // If unable to create like record
    if (!likedComment) {
      return res.json({
        status: 400,
        success: false,
        message: "Unable to perform like operation!",
      });
    }
    return res.json({
      status: 200,
      success: true,
      message: "Like operation successful!",
    });
  } catch (error) {
    console.log("error while adding comment : ", error);
    // Check for validation error
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.json({
        status: 400,
        success: false,
        message: "Validation Filed!",
        error: error.messages,
      });
    } else {
      // Check for other errors
      return res.json({
        status: 500,
        success: false,
        message: "Something went wrong!",
      });
    }
  }
};

export default likeComment;
