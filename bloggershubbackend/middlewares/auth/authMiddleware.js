import jwt from "jsonwebtoken";

// Auth middleware
const authMiddleware = async (req, res, next) => {
  // Get token from cookies
  const authToken = req.cookies.authToken;

  // For setting header for localStorage
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];

  if (!authToken)
    return res.json({
      status: 401,
      success: false,
      message: "Unauthorized user!",
    });

  try {
    // Decoding token to get user
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

    req.loggedInUser = decodedToken;
    next();
  } catch (error) {
    console.log("error in middleware : ", error);
    return res.json({
      status: 401,
      success: false,
      message: "Unauthorized user!",
    });
  }
};

export default authMiddleware;
