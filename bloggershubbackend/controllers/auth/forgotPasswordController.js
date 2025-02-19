import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../db/dbConfig.js";
import forgotPasswordSchema from "../../validations/auth/forgotPasswordSchema.js";

//Sign In
const forgotPassword = async (req, res) => {
  try {
    const body = req.body;

    // Validate request body
    const validator = vine.compile(forgotPasswordSchema);
    const payload = await validator.validate(body);

    const findUser = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    // If user not found
    if (!findUser) {
      return res.json({
        status: 400,
        success: false,
        message: "User does not exist!",
      });
    }

    // If user found
    // Encrypt password
    const salt = bcrypt.genSaltSync(10);
    payload.password = bcrypt.hashSync(payload.password, salt);

    // Update password
    const user = await prisma.user.update({
      where: {
        email: payload.email,
      },
      data: {
        password: payload.password,
      },
    });

    // If password did not update
    if (!user) {
      return res.json({
        status: 400,
        success: false,
        message: "Something went wrong while updating password!",
      });
    }

    // If password updated
    return res.json({
      status: 200,
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.log("error during forgot password : ", error);
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

export default forgotPassword;
