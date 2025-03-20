import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid"; // Correct import for uuid

const prisma = new PrismaClient();

async function main() {
  // Generate fake data for one user
  // await prisma.user.create({
  //   data: {
  //     email: faker.internet.email(),
  //     name: faker.internet.username(),
  //   },
  // });

  // Generate many fake data user model
  // await prisma.user.createMany({
  //   data: Array.from({ length: 25 }, () => ({
  //     email: faker.internet.email(),
  //     name: faker.internet.username(),
  //   })),
  // });

  await prisma.todo.createMany({
    data: Array.from({ length: 25 }, () => {
      const title = faker.book.title();
      const slug = `${title.toLowerCase().replace(/ /g, "-")}-${uuidv4()}`; 
      return {
        title: title,
        body: faker.lorem.words(25),
        slug: slug,
      };
    }),
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
