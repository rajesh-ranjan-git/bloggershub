import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../db/dbConfig.js";
import { signUpSchema } from "../../validations/auth/signUpSchema.js";

//Register user
const signUp = async (req, res) => {
  try {
    const body = req.body;

    console.log("body : ", body);

    // Validate request body
    const validator = vine.compile(signUpSchema);
    const payload = await validator.validate(body);

    console.log("payload : ", payload);

    const findUser = await prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    console.log("findUser : ", findUser);

    // If user already exists
    if (findUser) {
      return res.json({
        status: 400,
        success: false,
        message: "User already exists, please use a different email!",
      });
    }

    // If user does not exist

    // Encrypt password if user does not exist
    const salt = bcrypt.genSaltSync(10);
    payload.password = bcrypt.hashSync(payload.password, salt);

    // Register user
    const user = await prisma.user.create({
      data: payload,
    });

    console.log("user : ", user);

    // If user is registered successfully
    if (user) {
      // Create Profile for user
      const profile = await prisma.profile.create({
        data: {
          userId: user.id,
        },
      });

      console.log("profile : ", profile);

      let isProfileCreated = true;

      // If profile creation failed
      if (!profile) {
        isProfileCreated = false;
      }

      const payloadData = {
        id: user.id,
        email: user.email,
      };

      console.log("payloadData : ", payloadData);

      // Issue token to login
      const token = jwt.sign(payloadData, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });

      console.log("token : ", token);

      // Create cookie
      return res
        .cookie("token", token, { httpOnly: true, secure: false })
        .json({
          status: 200,
          success: true,
          token: token,
          message: "User created successfully!",
          user: user,
          userProfile: profile ? profile : null,
        });
    }

    // Check if user is not registered
    return res.json({
      errors: {
        status: 400,
        success: false,
        message: "Something went wrong while creating user!",
      },
    });
  } catch (error) {
    console.log("error : ", error);
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
