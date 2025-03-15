import prisma from "../../db/dbConfig.js";

//Fetch all posts by author
const fetchAllPostsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;

    const findAuthor = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });

    // If author does not exist
    if (!findAuthor) {
      return res.json({
        status: 400,
        success: false,
        message: "Author does not exist!",
      });
    }

    // If author exists
    // Fetch author profile
    const authorProfile = await prisma.profile.findUnique({
      where: {
        userId: authorId,
      },
    });

    const author = authorProfile.firstName
      ? authorProfile.middleName
        ? authorProfile.lastName
          ? authorProfile.firstName +
            authorProfile.middleName +
            authorProfile.lastName
          : authorProfile.firstName + authorProfile.middleName
        : authorProfile.lastName
        ? authorProfile.firstName + authorProfile.lastName
        : authorProfile.firstName
      : findAuthor.email;

    // Fetch all posts by author
    const allPostsByAuthor = await prisma.post.findMany({
      where: {
        authorId: authorId,
      },
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
    });

    console.log("allPostsByAuthor : ", allPostsByAuthor);

    // If posts by selected author not found
    if (!allPostsByAuthor) {
      return res.json({
        status: 400,
        success: false,
        message: `Something went wrong while fetching posts by ${author}!`,
      });
    }

    // If fetching posts failed
    if (!allPostsByAuthor || allPostsByAuthor.length <= 0) {
      return res.json({
        status: 400,
        success: false,
        message: `No posts found by ${author}!`,
      });
    } else if (allPostsByAuthor && allPostsByAuthor.length > 0) {
      // If posts fetched successfully
      // Return all posts by author
      return res.json({
        status: 200,
        success: true,
        posts: allPostsByAuthor,
        author: authorProfile,
        message: `Posts by ${author} fetched successfully!`,
      });
    }

    return res.json({
      status: 500,
      success: false,
      message: "Something went wrong!",
      posts: posts,
    });
  } catch (error) {
    console.log("error while fetching all posts by selected author : ", error);
    // Check for other errors
    return res.json({
      status: 500,
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default fetchAllPostsByAuthor;
