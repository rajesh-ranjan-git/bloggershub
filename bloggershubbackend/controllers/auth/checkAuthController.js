import prisma from "../../db/dbConfig.js";

// Check authentication on page load
const checkAuth = async (req, res) => {
  const user = req.loggedInUser;

  // Fetch logged In user with profile
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

  return res.json({
    status: 200,
    success: true,
    message: "Authorized user!",
    loggedInUser: loggedInUser,
  });
};

export default checkAuth;
