import vine, { errors } from "@vinejs/vine";
import prisma from "../../db/dbConfig.js";
import updateProfileSchema from "../../validations/profile/updateProfileSchema.js";

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const body = req.body;
    const { userId } = req.params;

    body.userId = userId;

    // Validate request body
    const validator = vine.compile(updateProfileSchema);
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

    // If user profile found, update user profile
    userProfile.firstName =
      payload.firstName.length > 2 ? payload.firstName : userProfile.firstName;
    userProfile.middleName =
      payload.middleName.length > 2
        ? payload.middleName
        : userProfile.middleName;
    userProfile.lastName =
      payload.lastName.length > 2 ? payload.lastName : userProfile.lastName;
    userProfile.designation =
      payload.designation.length > 2
        ? payload.designation
        : userProfile.designation;
    userProfile.dob = payload.dob ? payload.dob : userProfile.dob;
    userProfile.phoneNumber = payload.phoneNumber
      ? payload.phoneNumber
      : userProfile.phoneNumber;
    userProfile.bio = payload.bio.length > 2 ? payload.bio : userProfile.bio;

    userProfile = await prisma.profile.update({
      where: {
        userId: user.id,
      },
      data: {
        firstName: userProfile.firstName,
        middleName: userProfile.middleName,
        lastName: userProfile.lastName,
        designation: userProfile.designation,
        dob: userProfile.dob,
        phoneNumber: userProfile.phoneNumber,
        bio: userProfile.bio,
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
      select: {
        id: true,
        email: true,
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
