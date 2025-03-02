import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../db/dbConfig.js";
import signInSchema from "../../validations/auth/signInSchema.js";

//Sign In
const signIn = async (req, res) => {
  try {
    const body = req.body;

    // Validate request body
    const validator = vine.compile(signInSchema);
    const payload = await validator.validate(body);

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    // If user not found
    if (!user) {
      return res.json({
        status: 400,
        success: false,
        message: "User does not exist!",
      });
    }

    // If user found
    // Decrypt password
    // If password is invalid
    if (!bcrypt.compareSync(payload.password, user.password)) {
      return res.json({
        status: 400,
        success: false,
        message: "Invalid credentials!",
      });
    }

    // If password is valid
    // If user profile exists
    let profile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    // If user profile not found
    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          userId: user.id,
        },
      });
    }

    const loggedInUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        email: true,
        profile: true,
      },
    });

    const payloadData = {
      id: loggedInUser.id,
      email: loggedInUser.email,
    };

    // Issue token to login
    const authToken = jwt.sign(payloadData, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    // Create cookie
    return res
      .cookie("authToken", authToken, { httpOnly: true, secure: false })
      .json({
        status: 200,
        success: true,
        authToken: authToken,
        message: "User logged in successfully!",
        loggedInUser: loggedInUser,
      });
  } catch (error) {
    console.log("error during sign in : ", error);
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

export default signIn;
