import React from 'react';
import { UPCOMING } from '@/constants';
import UpcomingItem from './UpcomingItem';
import Link from 'next/link';

const Upcoming = () => {
  return (
    <div className="mt-8">
      <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:gap-4 max-sm:gap-4 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {UPCOMING.map((event, index) => (
          <Link href={`/event/${event.id}`} key={index}>
            <UpcomingItem event={event} key={index} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
