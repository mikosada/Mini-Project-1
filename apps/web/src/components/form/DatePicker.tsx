'use client';

import React, { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { FormErrors } from './FormErrors';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { UseFormRegister } from 'react-hook-form';

interface FormInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string | undefined;
  className?: string;
  defaultValue?: string;
  register?: UseFormRegister<any>;
}

export const DatePicker = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      required,
      disabled,
      placeholder,
      error,
      className,
      defaultValue = '',
      register,
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
                id={id}
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground',
                )}
                aria-describedby={`${id}-error`}
                disabled={pending || disabled}
                value={defaultValue ? defaultValue : ''}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>{placeholder}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <FormErrors error={error} />
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';
