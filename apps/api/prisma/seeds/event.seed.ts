import prisma from '@/prisma';
import { EventStatus, Prisma } from '@prisma/client';
import { EventType } from '@prisma/client';

const main = async () => {
  await prisma.event.deleteMany({
    where: {},
  });

  const data: Prisma.EventCreateInput[] = [
    {
      name: 'SUM 41 TOUR OF THE SETTING SUM FINAL TOUR',
      slug: 'sum-41-tour-of-the-setting-sum-final-tour',
      price: 230000,
      time: new Date(),
      date: new Date(),
      description: '',
      location: 'Bandung',
      rating: 4,
      type: EventType.FREE,
      available: EventStatus.AVAILABE,
      img: '/1.jpg',
      category: EventCatergory.EDUCATION,
    },
  ];

  await prisma.event.createMany({
    data,
  });
};

export default main;
