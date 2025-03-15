import vine, { errors } from "@vinejs/vine";
import prisma from "../../db/dbConfig.js";
import updatePostSchema from "../../validations/posts/updatePostSchema.js";

//Update Post
const updatePost = async (req, res) => {
  try {
    const body = req.body;
    const { postId } = req.params;

    if (!postId || postId === "") {
      return res.json({
        status: 400,
        success: false,
        message: "Post Id is required to update post!",
      });
    }

    // Validate request body
    const validator = vine.compile(updatePostSchema);
    const payload = await validator.validate(body);

    // Fetch post to update
    const findPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        tags: true,
      },
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
    // If updater of post is not the original author
    if (findPost.authorId !== payload.authorId) {
      return res.json({
        status: 400,
        success: false,
        message: "Invalid update post request!",
      });
    }

    // If updater of post is the original author
    // Replace existing post data
    findPost.title = payload.title !== "" ? payload.title : findPost.title;
    findPost.content =
      payload.content !== "" ? payload.content : findPost.content;
    findPost.postImage = payload.postImage
      ? payload.postImage
      : findPost.postImage;
    findPost.published = payload.published || findPost.published;
    findPost.tags =
      payload.tags.length > 0
        ? payload.tags.split(",").map((tag) => tag.trim())
        : findPost.tags;

    // Update post
    const updatedPost = await prisma.post.update({
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

    // If updating post was not successful
    if (!updatedPost) {
      return res.json({
        status: 400,
        success: false,
        message: "Something went wrong while updating post!",
      });
    }

    return res.json({
      status: 200,
      success: true,
      message: "Post updated successfully!",
      post: updatedPost,
    });
  } catch (error) {
    console.log("error while updating post : ", error);
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

export default updatePost;
