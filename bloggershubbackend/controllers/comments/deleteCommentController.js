import vine, { errors } from "@vinejs/vine";
import prisma from "../../db/dbConfig.js";
import deleteCommentSchema from "../../validations/comments/deleteCommentSchema.js";

//Fetch all comments on post
const deleteComment = async (req, res) => {
  try {
    const body = req.body;

    const validator = vine.compile(deleteCommentSchema);
    const payload = await validator.validate(body);

    // Find comment to delete
    const comment = await prisma.comment.findUnique({
      where: {
        id: payload.id,
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

    // If comment exists, check if user is deleting other's comment
    if (comment.userId !== payload.userId) {
      return res.json({
        status: 400,
        success: false,
        message: "Unable to delete comment!",
      });
    }

    // If user is deleting his own comment
    const deletedComment = await prisma.comment.delete({
      where: {
        id: payload.id,
      },
    });

    // If comment was not deleted
    if (!deletedComment) {
      return res.json({
        status: 400,
        success: false,
        message: "Unable to delete comment!",
      });
    }

    // If comment was deleted successfully
    return res.json({
      status: 200,
      success: true,
      comment: deletedComment,
      message: "Comment deleted successfully!",
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

export default deleteComment;
