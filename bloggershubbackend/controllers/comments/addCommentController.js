import vine, { errors } from "@vinejs/vine";
import prisma from "../../db/dbConfig.js";
import commentSchema from "../../validations/comments/commentSchema.js";

//Fetch all comments on post
const addComment = async (req, res) => {
  try {
    const body = req.body;

    const validator = vine.compile(commentSchema);
    const payload = await validator.validate(body);

    const newComment = await prisma.comment.create({
      data: payload,
    });

    // If comment was not added
    if (!newComment) {
      return res.json({
        status: 400,
        success: false,
        message: "Unable to add comment!",
      });
    }

    // If comment was added
    return res.json({
      status: 200,
      success: true,
      comment: newComment,
      message: "Comment added successfully!",
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

export default addComment;
