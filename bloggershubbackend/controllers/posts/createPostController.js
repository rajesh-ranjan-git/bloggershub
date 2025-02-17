import vine, { errors } from "@vinejs/vine";
import prisma from "../../db/dbConfig.js";
import postSchema from "../../validations/posts/postSchema.js";

//Create Post
const createPost = async (req, res) => {
  try {
    const body = req.body;

    // Validate request body
    const validator = vine.compile(postSchema);
    const payload = await validator.validate(body);

    const findAuthor = await prisma.user.findUnique({
      where: {
        id: payload.authorId,
      },
    });

    // If author does not exist
    if (!findAuthor) {
      return res.json({
        status: 400,
        success: false,
        message: "Unable to create post as author does not exist!",
      });
    }

    // If author exists
    // Create post
    const createdPost = await prisma.post.create({
      data: {
        title: payload.title,
        content: payload.content,
        postImage: payload.postImage,
        published: payload.published,
        authorId: payload.authorId,
        tags: {
          create: payload.tags.map((tag) => ({
            tag: {
              connectOrCreate: { where: { name: tag }, create: { name: tag } },
            },
          })),
        },
      },
      include: { tags: { select: { tag: { select: { name: true } } } } },
    });

    // If post did not get created
    if (!createdPost) {
      return res.json({
        status: 400,
        success: false,
        message: "Something went wrong while creating post!",
      });
    }

    // If post created successfully
    // Fetch all posts by author
    const posts = await prisma.post.findMany({
      include: { tags: { select: { tag: { select: { name: true } } } } },
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
    });

    // If fetching posts failed
    if (!posts || posts.length <= 0) {
      return res.json({
        status: 400,
        success: false,
        createdPost: createdPost,
        message:
          "Post created successfully but something went wrong while fetching posts!",
      });
    } else if (posts && posts.length > 0) {
      // If posts fetched successfully
      // Return all posts by author
      return res.json({
        status: 201,
        success: true,
        createdPost: createdPost,
        posts: posts,
        message: "Post created successfully!",
      });
    }

    return res.json({
      status: 500,
      success: false,
      message: "Something went wrong!",
      posts: posts,
    });
  } catch (error) {
    console.log("error while creating post : ", error);
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

export default createPost;
