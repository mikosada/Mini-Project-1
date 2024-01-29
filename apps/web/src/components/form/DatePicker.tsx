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
import { UseFormRegister, UseFormReturn } from 'react-hook-form';
import { Input } from '../ui/input';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';

interface FormInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string | undefined;
  className?: string;
  defaultValue?: string;
  form: UseFormReturn<any, any, undefined>;
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
      form,
      register,
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
                        format(field.value, 'PPP')
                      ) : (
                        <span>{placeholder}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
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

DatePicker.displayName = 'DatePicker';
