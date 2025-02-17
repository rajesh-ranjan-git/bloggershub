import vine, { errors } from "@vinejs/vine";
import prisma from "../../db/dbConfig.js";
import postSchema from "../../validations/posts/postSchema.js";

//Edit Post
const editPost = async (req, res) => {
  try {
    const body = req.body;
    const { postId } = req.params;

    if (!postId || postId === "") {
      return res.json({
        status: 400,
        success: false,
        message: "Post Id is required to edit post!",
      });
    }

    // Validate request body
    const validator = vine.compile(postSchema);
    const payload = await validator.validate(body);

    // Fetch post to edit
    const findPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: { tags: { select: { tag: { select: { name: true } } } } },
    });

    // If post not found
    if (!findPost) {
      return res.json({
        status: 400,
        success: false,
        message: "Post not found!",
      });
    }

    // If post found
    // If editor of post is not the original author
    if (findPost.authorId !== payload.authorId) {
      return res.json({
        status: 400,
        success: false,
        message: "Invalid edit post request!",
      });
    }

    // If editor of post is the original author
    // Replace existing post data
    findPost.title = payload.title !== "" ? payload.title : findPost.title;
    findPost.content =
      payload.content !== "" ? payload.content : findPost.content;
    findPost.postImage = payload.postImage
      ? payload.postImage
      : findPost.postImage;
    findPost.published = payload.published || findPost.published;
    findPost.tags = payload.tags;

    // Edit post
    const editedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: findPost.title,
        content: findPost.content,
        postImage: findPost.postImage,
        published: findPost.published,
        tags: {
          deleteMany: {},
          create: findPost.tags.map((tag) => ({
            tag: {
              connectOrCreate: { where: { name: tag }, create: { name: tag } },
            },
          })),
        },
      },
      include: { tags: { select: { tag: { select: { name: true } } } } },
    });

    // If editing post was not successful
    if (!editedPost) {
      return res.json({
        status: 400,
        success: false,
        message: "Something went wrong while editing post!",
      });
    }

    // If editing post was successful
    // Fetch all posts by author
    const posts = await prisma.post.findMany({
      include: { tags: { select: { tag: { select: { name: true } } } } },
    });

    // If fetching posts failed
    if (!posts || posts.length <= 0) {
      return res.json({
        status: 400,
        success: false,
        editedPost: editedPost,
        message:
          "Post edited successfully but something went wrong while fetching posts!",
      });
    } else if (posts && posts.length > 0) {
      // If posts fetched successfully
      // Return all posts by author
      return res.json({
        status: 200,
        success: true,
        editedPost: editedPost,
        posts: posts,
        message: "Post edited successfully!",
      });
    }

    return res.json({
      status: 500,
      success: false,
      message: "Something went wrong!",
      posts: posts,
    });
  } catch (error) {
    console.log("error while editing post : ", error);
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

export default editPost;
