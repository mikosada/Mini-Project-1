'use client';

import { Button } from '@/components/ui/button';
import instance from '@/config/axios/instance';
import { Edit, Plus, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCardModal } from '@/hooks/use-card-modal';
import { IEvent } from '@/types';

export default function Event() {
  const cardModal = useCardModal();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const { data } = await instance.get('http://localhost:8000/api/events');
    setEvents(data.data.data);
    console.log(data.data.data);
  };

  if (cardModal.isSuccess) getEvents();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-medium">Event Management</h1>
        <Button
          variant="primary"
          size="lg"
          onClick={() => cardModal.onOpen('add-event')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>
      <table className="table">
        <thead>
          <tr className="text-left bg-[#f2f2f2] p-8">
            <th>#</th>
            <th>Name</th>
            <th>Seat</th>
            <th>Price</th>
            <th>Type</th>
            <th>Category</th>
            <th>Datetime</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event: IEvent, index: number) => (
            <tr key={index} className="text-left px-4 even:bg-[#f2f2f2]">
              <td>{index + 1}</td>
              <td>{event.name}</td>
              <td>{event.seat}</td>
              <td>{event.price}</td>
              <td>{event.type}</td>
              <td>{event.category.name}</td>
              <td>{event.date}</td>
              <td className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="ghost" size="sm">
                        <Edit className="text-yellow-500 hover:text-yellow-300" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit Event</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="ghost" size="sm">
                        <Trash className="text-red-500 hover:text-red-200" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete Event</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
