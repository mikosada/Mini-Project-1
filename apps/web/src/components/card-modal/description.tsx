'use client';

import { useParams } from 'next/navigation';
import React, { ElementRef, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { FormTextarea } from '../form/FormTextarea';
import FormSubmit from '../form/FormSubmit';
import { FormInput } from '../form/FormInput';
import { DatePicker } from '../form/DatePicker';
import { TimePicker } from '../time-picker/TimePicker';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormCombobox } from '../form/FormCombobox';
import { FormSelect } from '../form/FormSelect';
import instance from '@/config/axios/instance';
import { Form } from '../ui/form';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useCardModal } from '@/hooks/use-card-modal';

export interface CategoryType {
  id: number;
  name: string;
}

const Description = () => {
  useEffect(() => {
    fetchCategories();
  }, []);

  const params = useParams();
  const cardModal = useCardModal();
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputNameRef = useRef<ElementRef<'input'>>(null);

  const fetchCategories = async () => {
    instance
      .get('http://localhost:8000/api/categories')
      .then((res) => setCategories(res.data.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputNameRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = async (data: EventForm) => {
    if (!data.img[0]) return;

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('date', data.date.toISOString());
    formData.append('time', data.time.toISOString());
    formData.append('seat', data.seat.toString());
    formData.append('location', data.location);
    formData.append('type', data.type);
    formData.append('status', 'ACTIVE');
    formData.append('categoryId', data.categoryId.toString());
    formData.append('img', data.img[0]);
    await instance
      .post('http://localhost:8000/api/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        toast('SUCCESS..!', { description: `${res.data.message}` });
        cardModal.onClose();
        cardModal.onSuccess('add-event');
      })
      .catch((err: AxiosError) => {
        const { response } = err;
        if (response?.status === 401) {
          toast('GAGAL..!', {
            description: `${response?.data.message}`,
          });
        }
        console.log('Error', err);
      });
  };

  const MAX_FILE_SIZE = 5000000;
  const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ];

  const EventFormSchema = z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(5, 'Name must be at lest 5 characters'),
    description: z.string({
      required_error: 'Description is required',
    }),
    price: z
      .number()
      .or(z.string().regex(/\d+/).transform(Number))
      .refine((n) => n >= 0),
    date: z.date({
      required_error: 'Date is required',
    }),
    time: z.date({
      required_error: 'Time is required',
    }),
    seat: z
      .number()
      .or(z.string().regex(/\d+/).transform(Number))
      .refine((n) => n >= 0),
    location: z
      .string({
        required_error: 'Location is required',
      })
      .min(3, {
        message: 'Location is too short',
      }),
    type: z.string({
      required_error: 'Type is required',
    }),
    img: z
      .any()
      .refine((files) => files?.length == 1, 'Image is required.')
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`,
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        '.jpg, .jpeg, .png and .webp files are accepted.',
      ),
    categoryId: z.number({
      required_error: 'Category is required',
    }),
  });

  const form = useForm<EventForm>({
    resolver: zodResolver(EventFormSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  type EventForm = {
    name: string;
    price: number;
    date: Date;
    time: Date;
    description: string;
    location: string;
    type: string;
    seat: number;
    status: string;
    categoryId: number;
    img: string;
  };

  return (
    <div className="w-full">
      <h2 className="font-semibold text-neutral-700 text-2xl">
        Please Define Your Special Event
      </h2>
      <h2 className="font-normal text-neutral-700 mb-4 text-xl">
        <i>
          insert form all required form <span className="text-red-500">*</span>
        </i>
      </h2>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
          className="space-y-8"
          enctype="multipart/form-data"
        >
          <div className="flex justify-evenly gap-x-6">
            <div className="w-full">
              <FormInput
                id="name"
                label="Name"
                required
                className="w-full mt-2"
                placeholder="Add a name of event"
                error={errors.name?.message}
                register={register}
              />
              <FormTextarea
                id="description"
                label="Description"
                required
                className="w-full mt-2"
                placeholder="Add a more detailed description"
                error={errors.description?.message}
                register={register}
              />
              <FormInput
                id="price"
                label="Price"
                type="number"
                required
                className="w-full mt-2"
                placeholder="Add a price of event"
                error={errors.price?.message}
                register={register}
              />
              <DatePicker
                id="date"
                label="Date"
                required
                className="w-full mt-2"
                placeholder="Pick a date"
                error={errors.date?.message}
                form={form}
              />
              <TimePicker
                id="time"
                label="Time"
                required
                className="w-full mt-2"
                placeholder="Pick a time"
                error={errors.date?.message}
                form={form}
              />
            </div>
            <div className="w-full">
              <FormInput
                id="seat"
                label="Seat"
                type="number"
                required
                className="w-full mt-2"
                placeholder="Add a seat of event"
                error={errors.seat?.message}
                register={register}
              />
              <FormTextarea
                id="location"
                label="Location"
                required
                className="w-full mt-2"
                placeholder="Add a location of event"
                error={errors.location?.message}
                register={register}
              />

              <FormSelect
                id="type"
                label="Type"
                required
                form={form}
                error={errors.price?.message}
              />

              <FormInput
                id="img"
                label="Image"
                type="file"
                required
                className="w-full mt-2"
                placeholder="Add a price of event"
                error={errors.img?.message}
                register={register}
              />

              <FormCombobox
                categories={categories}
                id="categoryId"
                label="Category"
                required
                placeholder="Search a category..."
                error={errors.categoryId?.message}
                form={form}
              />
            </div>
          </div>

          <div className="flex items-center gap-x-2 pt-4">
            <FormSubmit>Save</FormSubmit>
            <Button
              type="button"
              onClick={disableEditing}
              size="sm"
              variant="ghost"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Description;
