'use client';

import Hero from '@/app/(costumer)/_components/Hero';
import { Category } from '@/app/(costumer)/_components/Category';
import Info from '@/app/(costumer)/_components/Info';
import Upcoming from '@/app/(costumer)/_components/Upcoming';
import { useEffect, useState } from 'react';
import { Banknote, Calendar, SortAsc } from 'lucide-react';
import Events from '@/app/(costumer)/_components/Events';
import instance from '@/config/axios/instance';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export default function Home() {
  const [fix, setFix] = useState(false);
  const [fixFilter, setFixFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getCategories();
    getEvents();
  }, []);

  const getCategories = async () => {
    await instance
      .get('http://localhost:8000/api/categories')
      .then((res) => setCategories(res.data.data))
      .catch((error: AxiosError) => {
        toast('Error', { description: `${error.response?.data}` });
      });
  };

  const getEvents = async () => {
    await instance
      .get('http://127.0.0.1:8000/api/events')
      .then((res) => {
        console.log(res.data.data);
        setEvents(res.data.data);
      })
      .catch((error: AxiosError) => {
        toast('Error', { description: `${error.response?.data}` });
      });
  };

  const setFixed = () => {
    if (window.scrollY > 56) {
      setFix(true);
    } else {
      setFix(false);
    }

    if (window.scrollY > 200) {
      setFixFilter(true);
    } else {
      setFixFilter(false);
    }
  };

  if (typeof window !== undefined) window.addEventListener('scroll', setFixed);

  return (
    <div className="">
      <div
        className={`bg-white shadow-md pt-10 pb-6 px-4 flex items-center flex-cols ${
          fix ? 'bg-sticky' : ''
        }`}
      >
        <div className="md:max-w-screen-2xl mx-auto w-full">
          <Hero />
          <Category data={categories} />
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto w-full px-4">
        <Info />
        <div
          className={`${
            fixFilter
              ? 'transition delay-200 ease-in-out md:sticky-filter md:max-w-screen-2xl mx-auto w-full h-8 mt-[3px] pt-8 flex items-center justify-end'
              : 'mt-12 h-8 pt-8 flex items-center justify-between'
          }`}
        >
          <div
            className={`${
              fixFilter ? 'hidden transition duration-[0.3s] ease-in-out' : null
            } `}
          >
            <h2 className="font-semibold text-xl">Upcoming Events</h2>
            <h3 className="text-neutral-500 mt-2">
              Yuk, temukan atraksi ikonik di sekitarmu! Ada banyak diskon
              menanti.
            </h3>
          </div>
          <div
            className={`transition ease-in-out duration-[0.3s] flex items-center max-md:justify-evenly max-md:bg-white gap-x-2 mt-5 pt-2 pb-2 px-4 max-md:fixed max-md:bottom-0 max-md:z-[100] max-md:left-0 max-md:right-0 ${
              fixFilter ? 'bg-white rounded-b-xl shadow-md' : ''
            }`}
          >
            <div
              className={`transition ease-in-out duration-[0.3s] border max-md:border-0 border-input bg-background hover:bg-accent hover:text-accent-foreground max-md:btn-ghost font-normal rounded-full flex items-center justify-center max-md:flex-col h-12 px-4 max-md:h-[72px] gap-y-2 ${
                fixFilter ? 'border-0' : ''
              }`}
            >
              <Calendar className="text-neutral-500 w-[20px] h-[20px] mr-1" />
              <p className="font-normal">Tanggal</p>
            </div>

            <div
              className={`${
                fixFilter
                  ? 'w-[1px] h-[20px] bg-neutral-300 max-md:hidden'
                  : 'hidden'
              }`}
            />

            <div
              className={`transition ease-in-out duration-[0.3s] border max-md:border-0 border-input bg-background hover:bg-accent hover:text-accent-foreground max-md:btn-ghost font-normal rounded-full flex items-center justify-center max-md:flex-col h-12 px-4 max-md:h-[72px] gap-y-2 ${
                fixFilter ? 'border-0' : ''
              }`}
            >
              <Banknote className="text-neutral-500 w-[20px] h-[20px] mr-1" />
              <p className="font-normal">Harga</p>
            </div>

            <div
              className={`${
                fixFilter
                  ? 'transition ease-in-out duration-[0.3s] w-[1px] h-[20px] bg-neutral-300 max-md:hidden'
                  : 'hidden'
              }`}
            />

            <div
              className={`transition ease-in-out duration-[0.3s] border max-md:border-0 border-input bg-background hover:bg-accent hover:text-accent-foreground max-md:btn-ghost font-normal rounded-full flex items-center justify-center max-md:flex-col h-12 px-4 max-md:h-[72px] gap-y-2 ${
                fixFilter ? 'border-0' : ''
              }`}
            >
              <SortAsc className="text-neutral-500 w-[20px] h-[20px] mr-1" />
              <p className="font-normal">Urutkan</p>
            </div>
          </div>
        </div>
        <Upcoming events={events} />
        <div
          className={`md:max-w-screen-2xl mx-auto w-full h-8 mt-12 pt-8 flex items-center justify-between`}
        >
          <div className="">
            <h2 className="font-semibold text-xl">All Events</h2>
            <h3 className="text-neutral-500 mt-2">
              Yuk, temukan atraksi ikonik di sekitarmu! Ada banyak diskon
              menanti.
            </h3>
          </div>
        </div>
        <Events events={events} />
      </div>
    </div>
  );
}
