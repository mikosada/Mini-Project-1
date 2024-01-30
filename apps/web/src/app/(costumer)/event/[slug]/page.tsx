'use client';
import instance from '@/config/axios/instance';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IEvent } from '@/types';
import Link from 'next/link';
import { Calendar, MapPin, MedalIcon, ZapIcon } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function EventDetail() {
  const [event, setEvent] = useState<IEvent>();

  const { slug } = useParams();
  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    instance
      .get(`http://127.0.0.1:8000/api/events/${slug}`)
      .then((res) => {
        console.log(res.data?.data);

        setEvent(res.data?.data);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="w-full bg-white border-t-[1px] border-neutral-300 flex justify-start items-center p-2">
        <div className="md:max-w-screen-2xl mx-auto w-full flex justify-start items-center gap-x-4">
          <Link href="/">
            <span className="text-neutral-500">Home</span>
          </Link>
          <span className="text-neutral-500">/</span>
          <Link href="/">
            <span className="text-neutral-500">{event?.category?.name}</span>
          </Link>
          <span className="text-neutral-500">/</span>{' '}
          <span className="text-neutral-500">#{slug}</span>
        </div>
      </div>
      <div className="relative w-full bg-gradient-to-b h-[500px] from-neutral-500 to-neutral-300">
        {event?.medias[0].url && (
          <Image
            src={`http://${event?.medias[0].url}`}
            layout="fill"
            alt="image"
            className="image-cover rounded-t-md"
          />
        )}
      </div>
      {/* DETAIL */}
      <div className="md:max-w-screen-2xl mx-auto flex w-full mt-6">
        {/* LEFT */}
        <div className="w-[75%]">
          <h2 className="text-3xl font-semibold">{event?.name}</h2>
          {/* location */}
          <div className="w-full flex items-top gap-2 mt-4 text-neutral-600">
            <MapPin /> {event?.location}
          </div>
          {/* date */}
          <div className="w-full  flex items-top gap-2 mt-4 text-neutral-600">
            <Calendar />
            {event?.date
              ? new Date(event?.date).toLocaleDateString('ID')
              : '-'}{' '}
            {event?.time ? new Date(event?.time).toLocaleTimeString('ID') : '-'}
          </div>
          {/* description */}
          <h2 className="text-3xl font-semibold mt-8">Deskripsi</h2>
          <p className="text-neutral-600 pt-4">{event?.description}</p>
        </div>
        {/* RIGHT */}
        <div className="w-[25%] flex flex-col items-end align-top overflow-hidden">
          <div className="flex w-[200px] items-center gap-2 bg-gradient-to-r from-green-500 to-[#6e54ef] rounded-sm px-1 py-[2px]">
            <MedalIcon className="w-[14px] h-[14px] text-white" />
            <span className="font-normal text-sm md:text-sm text-white sm:text-xs">
              Jaminan Harga Termurah
            </span>
          </div>
          <h2 className="text-2xl mt-4 text-neutral-500">Harga</h2>
          <h2 className="text-2xl text-red-400 font-bold">
            IDR. {formatNumber(event?.price ? event?.price : 0)}
          </h2>
          <Button variant="primary" size="lg" className="mt-4">
            BELI SEKARANG
          </Button>
        </div>
      </div>
    </div>
  );
}
