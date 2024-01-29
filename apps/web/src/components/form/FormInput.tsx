'use client';

import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormErrors } from './FormErrors';
import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  error?: string | undefined;
  register?: UseFormRegister<any>;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      error,
      className,
      defaultValue = '',
      register,
    },
    ref,
  ) => {
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

          <Input
            defaultValue={defaultValue}
            ref={ref}
            required={required}
            name={id}
            id={id}
            placeholder={placeholder}
            type={type}
            disabled={pending || disabled}
            className={cn(
              'resize-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-0 focus:ring-2 outline-none shadow-sm',
              className,
            )}
            aria-describedby={`${id}-error`}
            {...register?.(id, { required })}
          />
        </div>
        <FormErrors error={error} />
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';
