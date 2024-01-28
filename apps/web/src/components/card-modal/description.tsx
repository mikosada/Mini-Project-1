'use client';

import { AlignLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { ElementRef, useRef, useState } from 'react';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { FormTextarea } from '../form/FormTextarea';
import FormSubmit from '../form/FormSubmit';
import { Skeleton } from '../ui/skeleton';
import { FormInput } from '../form/FormInput';
import { DatePicker } from '../form/DatePicker';
import { useFormSelect } from '@/hooks/use-form-select';
import { TimePicker } from '../time-picker/TimePicker';
import { useComboboxForm } from '@/hooks/use-combobox';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import { FormCombobox } from '../form/FormCombobox';
import { FormSelect } from '../form/FormSelect';

// interface DescriptionProps {
//   data: CardWithList;
// }

const Description = () => {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputNameRef = useRef<ElementRef<'input'>>(null);

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

  const onSubmit = (data: EventForm) => {
    console.log(data);

    // const description = formData.get('description') as string;
    // const boardId = params.boardId as string;
    //execute({ id: data.id, description, boardId });
  };

  const EventFormSchema = z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(5, 'Name must be at lest 5 characters'),
    categoryId: z.string({
      required_error: 'Please select a category.',
    }),
  });

  // const form = ({
  //   control,
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  // } = useForm<EventForm>({
  //   resolver: zodResolver(EventFormSchema),
  // }));

  const form = useForm<EventForm>({
    resolver: zodResolver(EventFormSchema),
  });

  const {
    control,
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
      <p className="font-semibold text-neutral-700 mb-2">Insert Your Event</p>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
          className="space-y-6"
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
                register={register}
              />

              <TimePicker
                id="time"
                label="Time"
                required
                className="w-full mt-2"
                placeholder="Pick a time"
                //error={errors.time?.message}
                // {...register('time')}
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
                seat={register}
              />
              <FormTextarea
                id="location"
                label="Location"
                required
                className="w-full mt-2"
                placeholder="Add a location of event"
                //errors={fieldErrors}
              />
              <FormSelect form={form} />

              <FormInput
                id="img"
                label="Image"
                type="file"
                required
                className="w-full mt-2"
                placeholder="Add a price of event"
                //errors={fieldErrors}
              />

              <FormCombobox />
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

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-center gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full bg-neutral-200 mt-2" />
      </div>
    </div>
  );
};
