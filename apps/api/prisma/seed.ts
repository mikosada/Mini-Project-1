import { PrismaClient } from '@prisma/client';
import { categories, events } from './data';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.category.deleteMany();
  console.log('Deleted records in category table');

  await prisma.event.deleteMany();
  console.log('Deleted records in event table');

  await prisma.$queryRaw`ALTER TABLE category AUTO_INCREMENT = 1`;
  console.log('reset category auto increment to 1');

  await prisma.$queryRaw`ALTER TABLE event AUTO_INCREMENT = 1`;
  console.log('reset event auto increment to 1');

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.event.createMany({
    data: events,
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
