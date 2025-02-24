import vine, { errors } from "@vinejs/vine";
import prisma from "../../db/dbConfig.js";
import profileSchema from "../../validations/profile/profileSchema.js";

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const body = req.body;
    const { userId } = req.params;

    // Validate request body
    const validator = vine.compile(profileSchema);
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

    // If user found
    // Get user profile
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

    // If user profile found
    // Update user profile
    userProfile.firstName = payload.firstName || userProfile.firstName;
    userProfile.middleName = payload.middleName || userProfile.middleName;
    userProfile.lastName = payload.lastName || userProfile.lastName;
    userProfile.bio = payload.bio || userProfile.bio;
    userProfile.profileImage = payload.profileImage || userProfile.profileImage;

    userProfile = await prisma.profile.update({
      where: {
        userId: user.id,
      },
      data: {
        firstName: userProfile.firstName,
        middleName: userProfile.middleName,
        lastName: userProfile.lastName,
        bio: userProfile.bio,
        profileImage: userProfile.profileImage,
      },
    });

    // If profile did not update
    if (!userProfile) {
      return res.json({
        status: 400,
        success: false,
        message: "Something went wrong while updating profile!",
      });
    }

    // If profile updated successfully
    const updatedUser = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
      include: {
        profile: true,
      },
    });

    // If unable to fetch updated user
    if (!updatedUser) {
      return res.json({
        status: 200,
        success: true,
        user: user,
        profile: userProfile,
        message: "User profile updated successfully!",
      });
    }

    // If updated user fetched successfully
    return res.json({
      status: 200,
      success: true,
      updatedUser: updatedUser,
      message: "User profile updated successfully!",
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

export default updateProfile;
