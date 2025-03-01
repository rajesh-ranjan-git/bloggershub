import prisma from "../db/dbConfig.js";
import { getFullname } from "./getFullName.js";

export const getAuthorDetails = async (authorId) => {
  const author = { authorId: "", name: "", email: "", profileImage: null };

  const authorOfPostOrComment = await prisma.profile.findUnique({
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

  if (authorOfPostOrComment) {
    author.authorId = authorId;
    author.profileImage = authorOfPostOrComment.profileImage;
    author.name = getFullname(
      authorOfPostOrComment.firstName,
      authorOfPostOrComment.middleName,
      authorOfPostOrComment.lastName
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
