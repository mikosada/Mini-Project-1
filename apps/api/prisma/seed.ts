import { PrismaClient, Role } from '@prisma/client';
import { categories, events, medias, transactions, users } from './data';
import { genSalt, hash } from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.deleteMany();
  console.log('Deleted records in user table');

  await prisma.media.deleteMany();
  console.log('Deleted records in media table');

  await prisma.category.deleteMany();
  console.log('Deleted records in category table');

  await prisma.event.deleteMany();
  console.log('Deleted records in event table');

  await prisma.transaction.deleteMany();
  console.log('Deleted record in transaction table');

  await prisma.$queryRaw`ALTER TABLE user AUTO_INCREMENT = 1`;
  console.log('reset user auto increment to 1');

  await prisma.$queryRaw`ALTER TABLE transaction AUTO_INCREMENT = 1`;
  console.log('reset transaction auto increment to 1');

  await prisma.$queryRaw`ALTER TABLE category AUTO_INCREMENT = 1`;
  console.log('reset category auto increment to 1');

  await prisma.$queryRaw`ALTER TABLE media AUTO_INCREMENT = 1`;
  console.log('reset media auto increment to 1');

  await prisma.$queryRaw`ALTER TABLE event AUTO_INCREMENT = 1`;
  console.log('reset event auto increment to 1');

  const salt = await genSalt(10);

  await prisma.user.create({
    data: {
      username: 'user1',
      password: await hash('123user1', salt),
      email: 'user1@gmail.com',
      referral: '',
      role: Role.CUSTOMER,
    },
  });

  await prisma.user.create({
    data: {
      username: 'user2',
      password: await hash('123user2', salt),
      email: 'user2@gmail.com',
      referral: '',
      role: Role.ORGANIZER,
    },
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

  await prisma.transaction.createMany({
    data: transactions,
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
