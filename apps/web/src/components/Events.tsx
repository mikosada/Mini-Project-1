import React from 'react';
import { EVENTS } from '@/constants';
import UpcomingItem, { UpcomingItemProps } from './UpcomingItem';
import Link from 'next/link';

const Events = () => {
  return (
    <div className="mt-8">
      <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:gap-4 max-sm:gap-4 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {EVENTS.map((event, index) => (
          <Link href={`/event/${event.id}`} key={index}>
            <UpcomingItem event={event} key={index} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Events;
