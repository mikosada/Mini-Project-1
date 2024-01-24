import { PrismaClient } from '@prisma/client';
import { categories, events, medias, ratings, users } from './data';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.deleteMany();
  console.log('Deleted records in user table');

  await prisma.rating.deleteMany();
  console.log('Deleted rating in user table');

  await prisma.category.deleteMany();
  console.log('Deleted records in category table');

  await prisma.event.deleteMany();
  console.log('Deleted records in event table');

  await prisma.media.deleteMany();
  console.log('Deleted records in media table');

  await prisma.$queryRaw`ALTER TABLE user AUTO_INCREMENT = 1`;
  console.log('reset user auto increment to 1');

  await prisma.$queryRaw`ALTER TABLE rating AUTO_INCREMENT = 1`;
  console.log('reset rating auto increment to 1');

  await prisma.$queryRaw`ALTER TABLE category AUTO_INCREMENT = 1`;
  console.log('reset category auto increment to 1');

  await prisma.$queryRaw`ALTER TABLE media AUTO_INCREMENT = 1`;
  console.log('reset media auto increment to 1');

  await prisma.$queryRaw`ALTER TABLE event AUTO_INCREMENT = 1`;
  console.log('reset event auto increment to 1');

  await prisma.user.createMany({
    data: users,
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.event.createMany({
    data: events,
  });

  await prisma.media.createMany({
    data: medias,
  });

  await prisma.rating.createMany({
    data: ratings,
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
