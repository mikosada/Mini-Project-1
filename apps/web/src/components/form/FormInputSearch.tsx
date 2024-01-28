'use client';

import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormErrors } from './FormErrors';

interface FormInputSearchProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onChange?: () => void;
}

export const FormInputSearch = forwardRef<
  HTMLInputElement,
  FormInputSearchProps
>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = '',
      onChange,
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

          <Input
            onChange={onChange}
            defaultValue={defaultValue}
            ref={ref}
            required={required}
            name={id}
            id={id}
            placeholder={placeholder}
            type={type}
            disabled={pending || disabled}
            className={cn('text-sm px-2 py-1 h-7', className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  },
);

FormInputSearch.displayName = 'FormInputSearch';
