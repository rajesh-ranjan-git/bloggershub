import vine, { errors } from "@vinejs/vine";
import prisma from "../../db/dbConfig.js";
import updateProfileImageSchema from "../../validations/profile/updateProfileImageSchema.js";

// Update user profile
const updateProfileImage = async (req, res) => {
  try {
    const body = req.body;
    const { userId } = req.params;

    body.userId = userId;

    // Validate request body
    const validator = vine.compile(updateProfileImageSchema);
    const payload = await validator.validate(body);

    // If user is updating someone else's profile
    if (userId !== payload.userId) {
      return res.json({
        status: 400,
        success: false,
        message: "Invalid profile update request!",
      });
    }

    // If user is updating his own profile
    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
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

    // If user found, get user profile
    let userProfile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    // If user profile not found
    if (!userProfile) {
      return res.json({
        status: 400,
        success: false,
        message: "User profile does not exist!",
      });
    }

    // If user profile found, update user profile image
    userProfile.profileImage =
      payload.profileImage && payload.profileImage !== ""
        ? payload.profileImage
        : userProfile.profileImage;

    userProfile = await prisma.profile.update({
      where: {
        userId: user.id,
      },
      data: {
        profileImage: userProfile.profileImage,
      },
    });

    // If profile image did not update
    if (!userProfile) {
      return res.json({
        status: 400,
        success: false,
        message: "Something went wrong while updating profile image!",
      });
    }

    // If profile image updated successfully
    return res.json({
      status: 200,
      success: true,
      message: "User profile image updated successfully!",
    });
  } catch (error) {
    console.log("error during profile update : ", error);
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

export default updateProfileImage;
