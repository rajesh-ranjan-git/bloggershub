// Sign Out user
const signOut = async (req, res) => {
  // Remove cookie to sign out
  return res
    .clearCookie("token")
    .status(200)
    .json({ status: 200, success: true, message: "Signed out successfully!" });
};

export default signOut;
