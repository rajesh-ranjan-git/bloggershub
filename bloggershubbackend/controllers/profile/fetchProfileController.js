import prisma from "../../db/dbConfig.js";

// Fetch user profile
const fetchProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // If user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        profile: {
          select: {
            firstName: true,
            middleName: true,
            lastName: true,
            profileImage: true,
          },
        },
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
    return res.json({
      status: 200,
      success: true,
      user: user,
      message: "User profile fetched successfully!",
    });
  } catch (error) {
    console.log("error during fetching profile : ", error);
    // Check for other errors
    return res.json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default fetchProfile;
