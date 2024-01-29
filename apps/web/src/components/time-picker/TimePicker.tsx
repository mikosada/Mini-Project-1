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
import { FormControl, FormField, FormItem } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';

interface FormInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  defaultValue?: string;
  form: UseFormReturn<any, any, undefined>;
}

export const TimePicker = forwardRef<HTMLInputElement, FormInputProps>(
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
      form,
    },
    ref,
  ) => {
    const [date, setDate] = React.useState<Date>();
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <FormField
          control={form.control}
          name={id}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              {label ? (
                <div className="flex gap-x-1 mt-2">
                  <Label
                    htmlFor={id}
                    className="text-xs font-semibold text-neutral-700"
                  >
                    {label}
                  </Label>
                  <span className="text-red-500"> *</span>
                </div>
              ) : null}
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                        className,
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'hh:mm:ss')
                      ) : (
                        <span>{placeholder}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent side="top" align="start" className="w-full p-4">
                  <TimePickerDemo setDate={field.onChange} date={field.value} />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormErrors error={error} />
      </div>
    );
  },
);

TimePicker.displayName = 'TimePicker';
