'use client';

import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils';
import { IEvent } from '@/types';
import { MedalIcon, ZapIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export interface UpcomingItemProps {
  event: IEvent;
}

const UpcomingItem = ({ event }: UpcomingItemProps) => {
  const {
    id,
    name,
    medias,
    description,
    categoryId,
    location,
    created_at,
    price,
    rating,
    status,
    type,
  } = event;
  return (
    <div className="rounded-lg mt-4 shadow-md">
      {/* Image */}
      <div className="relative w-full h-[300px] rounded-t-lg">
        <Image
          src={`http://${medias[0].url}`}
          layout="fill"
          alt="image"
          className="image-upcoming rounded-md"
        />

        <div className="absolute inset-0 z-5 bg-gradient-to-r h-[300px] from-blue-950 to-white opacity-70 rounded-md" />

        <div className="absolute right-0 top-[20px] z-10 w-full px-6">
          <h2 className="font-semibold text-white pr-2 text-2xl">{name}</h2>
          <div className="h-[70px] w-[300px]">
            <h2 className="font-normal text-white text-sm mt-2 overflow-hidden text-clip">
              {description.slice(0, 100)}
            </h2>
          </div>
        </div>
        <Button variant="outline" className="absolute bottom-0 left-0 m-6">
          Lihat Sekarang
        </Button>
      </div>
    </div>
  );
};

export default UpcomingItem;
