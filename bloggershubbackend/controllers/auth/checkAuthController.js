// Check authentication on page load
const checkAuth = (req, res) => {
  const user = req.user;

  return res.json({
    status: 200,
    success: true,
    message: "Authorized user!",
    user: user,
  });
};

export default checkAuth;
