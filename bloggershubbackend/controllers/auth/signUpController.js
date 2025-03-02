import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../db/dbConfig.js";
import signUpSchema from "../../validations/auth/signUpSchema.js";

//Sign Up
const signUp = async (req, res) => {
  try {
    const body = req.body;

    // Validate request body
    const validator = vine.compile(signUpSchema);
    const payload = await validator.validate(body);

    const findUser = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    // If user already exists
    if (findUser) {
      return res.json({
        status: 400,
        success: false,
        message: "User already exists, please use a different email!",
      });
    }

    // If user does not exist
    // Encrypt password
    const salt = bcrypt.genSaltSync(10);
    payload.password = bcrypt.hashSync(payload.password, salt);

    // Register user
    const user = await prisma.user.create({
      data: payload,
    });

    // If user is not registered
    if (!user) {
      return res.json({
        status: 400,
        success: false,
        message: "Something went wrong while creating user!",
      });
    }

    // If user is registered successfully
    // Create Profile for user
    await prisma.profile.create({
      data: {
        userId: user.id,
      },
    });

    // Fetch logged in user with profile
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
        status: 201,
        success: true,
        message: "User created successfully!",
        loggedInUser: loggedInUser,
      });
  } catch (error) {
    console.log("error while sign up : ", error);
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

export default signUp;
