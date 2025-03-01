import prisma from "../../db/dbConfig.js";
import { getFullname } from "../../helper/getFullName.js";

export const getAuthorDetails = async (authorId) => {
  const author = { authorId: "", name: "", email: "", profileImage: null };

  const authorOfPost = await prisma.profile.findUnique({
    where: {
      userId: authorId,
    },
    select: {
      userId: true,
      firstName: true,
      middleName: true,
      lastName: true,
      profileImage: true,
    },
  });

  // If Author exists
  if (authorOfPost) {
    author.authorId = authorId;
    author.profileImage = authorOfPost.profileImage;
    author.name = getFullname(
      authorOfPost.firstName,
      authorOfPost.middleName,
      authorOfPost.lastName
    );

    const authorEmail = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
      select: {
        email: true,
      },
    });

    author.email = authorEmail.email ? authorEmail.email : "";
  }

  return author;
};
