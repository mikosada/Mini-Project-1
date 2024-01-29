import React from 'react';
import Link from 'next/link';
import { EventsProps } from '@/types';
import EventItem from './EventItem';

const Events = ({ events }: EventsProps) => {
  return (
    <div className="mt-8">
      <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:gap-4 max-sm:gap-4 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {events.map((event, index) => (
          <Link href={`/event/${event.slug}`} key={index}>
            <EventItem event={event} key={index} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Events;
