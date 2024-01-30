import React from 'react';
import Link from 'next/link';
import { EventsProps } from '@/types';
import UpcomingItem from './UpcomingItem';

const Upcoming = ({ events }: EventsProps) => {
  return (
    <div className="mt-8">
      <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:gap-6 max-sm:gap-4 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
        {events.slice(0, 3).map((event, index) => (
          <Link href={`/event/${event.id}`} key={index}>
            <UpcomingItem event={event} key={index} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
