'use client';

import React, { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { FormErrors } from '../form/FormErrors';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { TimePickerDemo } from './TimePickerDemo';

interface FormInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onClick?: () => void;
}

export const TimePicker = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      required,
      disabled,
      placeholder,
      errors,
      className,
      defaultValue = '',
      onClick,
    },
    ref,
  ) => {
    const [date, setDate] = React.useState<Date>();
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          {required ? <span className="text-red-500"> *</span> : null}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground',
                )}
                aria-describedby={`${id}-error`}
                onClick={onClick}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'HH:mm:ss') : <span>{placeholder}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="start" className="w-full p-4">
              <TimePickerDemo setDate={setDate} date={date} />
            </PopoverContent>
          </Popover>
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  },
);

TimePicker.displayName = 'TimePicker';
