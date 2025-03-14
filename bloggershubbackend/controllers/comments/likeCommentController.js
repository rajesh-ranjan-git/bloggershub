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

    // Check if comment is liked by user previously
    let likedComment = await prisma.commentLikes.findUnique({
      where: {
        userId_commentId: {
          userId: payload.userId,
          commentId: payload.commentId,
        },
      },
    });

    // If comment is not liked by user previously, create like record
    if (!likedComment) {
      const createLikedComment = await prisma.commentLikes.create({
        data: payload,
      });

      if (!createLikedComment) {
        return res.json({
          status: 400,
          success: false,
          message: "Like operation failed!",
        });
      }
      return res.json({
        status: 200,
        success: true,
        message: "Like operation successful!",
      });
    }

    // If comment is liked by user previously, update like record
    if (likedComment.liked === payload.liked) {
      likedComment = await prisma.commentLikes.delete({
        where: {
          userId_commentId: {
            userId: payload.userId,
            commentId: payload.commentId,
          },
        },
      });
      console.log("if likedComment : ", likedComment);
    } else if (likedComment.liked !== payload.liked) {
      likedComment = await prisma.commentLikes.update({
        where: {
          userId_commentId: {
            userId: payload.userId,
            commentId: payload.commentId,
          },
        },
        data: {
          liked: payload.liked,
        },
      });
    }

    if (likeComment) {
      return res.json({
        status: 200,
        success: true,
        message: "Like operation successful!",
      });
    }

    return res.json({
      status: 400,
      success: false,
      message: "Unable to perform like operation!",
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
