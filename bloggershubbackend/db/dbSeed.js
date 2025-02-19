import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

  // Create users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        profile: {
          create: {
            firstName: faker.person.firstName(),
            middleName: faker.person.middleName(),
            lastName: faker.person.lastName(),
            bio: faker.lorem.sentence(),
            profileImage: faker.image.avatar(),
            designation: faker.person.jobTitle(),
            dob: faker.date.birthdate().toISOString(),
            phoneNumber: faker.phone.number(),
            country: faker.location.country(),
          },
        },
      },
    });
    users.push(user);
  }

  // Create posts
  const posts = [];
  for (let i = 0; i < 20; i++) {
    const post = await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
        postImage: faker.image.url(),
        published: faker.datatype.boolean(),
        authorId: users[Math.floor(Math.random() * users.length)].id,
      },
    });
    posts.push(post);
  }

  // Create comments and replies
  for (const post of posts) {
    const comments = [];
    for (let i = 0; i < 10; i++) {
      const comment = await prisma.comment.create({
        data: {
          content: faker.lorem.sentences(),
          postId: post.id,
          userId: users[Math.floor(Math.random() * users.length)].id,
        },
      });
      comments.push(comment);
    }

    for (const comment of comments) {
      for (let j = 0; j < 2; j++) {
        await prisma.comment.create({
          data: {
            content: faker.lorem.sentences(),
            postId: post.id,
            userId: users[Math.floor(Math.random() * users.length)].id,
            parentId: comment.id,
          },
        });
      }
    }
  }

  console.log("Seeding completed!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
