'use client';

import { formatNumber } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { MedalIcon, ZapIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export interface Event {
  id: number;
  name: string;
  img: string;
  category: string;
  location: string;
  created_at: string;
  price: number;
  rating: number;
  type: string;
  status: string;
}

export interface UpcomingItemProps {
  event: Event;
}

const UpcomingItem = ({ event }: UpcomingItemProps) => {
  const {
    id,
    name,
    img,
    category,
    location,
    created_at,
    price,
    rating,
    status,
    type,
  } = event;
  return (
    <div className="rounded-lg mt-4 shadow">
      {/* Image */}
      <div className="relative w-full bg-gradient-to-b h-[200px] from-neutral-500 to-neutral-300 rounded-t-lg">
        <Image
          src={img}
          layout="fill"
          alt="image"
          className="image rounded-t-md"
        />
      </div>
      {/* Free */}
      <div className="w-full h-6 bg-slate-200 opacity-70 px-4 flex items-center gap-4 p-4">
        {type !== 'Free' ? (
          <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-[#6e54ef] rounded-md px-1 py-[2px]">
            <MedalIcon className="w-[14px] h-[14px] text-white" />
            <span className="font-normal text-sm md:text-sm text-white sm:text-xs">
              Jaminan Harga Termurah
            </span>
          </div>
        ) : null}
        <div className="flex items-center gap-2">
          <ZapIcon className="w-[16px] h-[16px] text-green-700" />
          <span className="font-bold text-sm">{type}</span>
        </div>
      </div>
      {/*Text */}
      <div className="p-4">
        <h2 className="font-semibold truncate">{name}</h2>
        <h3 className="flex items-center justify-start gap-x-2 font-medium py-2 text-black/50 text-sm">
          {location}
          <div className="w-[4px] h-[4px] rounded-full bg-black/50" />
          {created_at}
        </h3>
        <div className="max-lg:flex max-lg:flex-row-reverse lg:block items-center justify-between">
          <h2 className="font-semibold text-lg text-red-500">
            IDR {formatNumber(price)}
          </h2>
          <h3 className="font-semibold text-sm text-green-600 pt-2">
            {status}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default UpcomingItem;
