import vine, { errors } from "@vinejs/vine";
import prisma from "../../db/dbConfig.js";
import updateCommentSchema from "../../validations/comments/updateCommentSchema.js";

//Fetch all comments on post
const updateComment = async (req, res) => {
  try {
    const body = req.body;

    const validator = vine.compile(updateCommentSchema);
    const payload = await validator.validate(body);

    // Find comment
    const comment = await prisma.comment.findUnique({
      where: {
        id: payload.id,
      },
    });

    // If comment was not found
    if (!comment) {
      return res.json({
        status: 400,
        success: false,
        message: "Comment not found!",
      });
    }

    // If comment was found, Update comment
    const updatedComment = await prisma.comment.update({
      where: {
        id: payload.id,
      },
      data: {
        content: payload.content,
      },
    });

    // If comment was not updated
    if (!updatedComment) {
      return res.json({
        status: 400,
        success: false,
        message: "Unable to update comment!",
      });
    }

    // If comment was updated
    return res.json({
      status: 200,
      success: true,
      comment: updatedComment,
      message: "Comment updated successfully!",
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

export default updateComment;
