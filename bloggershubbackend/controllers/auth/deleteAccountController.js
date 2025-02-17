import vine, { errors } from "@vinejs/vine";
import prisma from "../../db/dbConfig.js";
import deleteAccountSchema from "../../validations/auth/deleteAccountSchema.js";

// Delete user account
const deleteAccount = async (req, res) => {
  try {
    const body = req.body;
    const { userId } = req.params;

    // Validate request body
    const validator = vine.compile(deleteAccountSchema);
    const payload = await validator.validate(body);

    // If user is deleting someone else's account
    if (userId !== payload.userId) {
      return res.json({
        status: 400,
        success: false,
        message: "Invalid account delete request!",
      });
    }

    // If user is deleting his own account
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    // If unable to delete user
    if (!user) {
      return res.json({
        status: 400,
        success: false,
        message: "Something went wrong while deleting user account!",
      });
    }

    // If user deleted successfully
    return res.json({
      status: 200,
      success: true,
      user: user,
      message: "User account deleted successfully!",
    });
  } catch (error) {
    console.log("error during deleting user account : ", error);
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

export default deleteAccount;
