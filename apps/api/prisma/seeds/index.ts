import { PrismaClient } from '@prisma/client';
import EventSeeder from './event.seed';

const prisma = new PrismaClient();

const main = async () => {
  await EventSeeder();
};

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
