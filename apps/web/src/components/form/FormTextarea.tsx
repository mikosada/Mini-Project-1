'use client';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ChangeEventHandler, KeyboardEventHandler, forwardRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Textarea } from '../ui/textarea';
import { FormErrors } from './FormErrors';
import { UseFormRegister } from 'react-hook-form';

interface FormTextareaProps {
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

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      error,
      className,
      defaultValue,
      register,
    },
    ref,
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          {required ? <span className="text-red-500"> *</span> : null}
          <Textarea
            ref={ref}
            required={required}
            placeholder={placeholder}
            name={id}
            id={id}
            disabled={pending || disabled}
            className={cn(
              'resize-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-0 focus:ring-2 outline-none shadow-sm',
              className,
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
            {...register?.(id, { required })}
          />
        </div>
        <FormErrors error={error} />
      </div>
    );
  },
);

FormTextarea.displayName = 'FormTextarea';
