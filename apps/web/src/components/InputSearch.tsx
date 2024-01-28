import React, { forwardRef } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { CustomInputSearch } from './ui/input-search';

interface InputSearchProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[]> | undefined;
  className?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
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
    return (
      <div className="space-y-2 w-full md:w-1/2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}

          <CustomInputSearch
            onChange={onChange}
            defaultValue={defaultValue}
            ref={ref}
            required={required}
            name={id}
            id={id}
            placeholder={placeholder}
            type={type}
            className={cn('text-lg px-2 py-1 h-7', className)}
            aria-describedby={`${id}-error`}
          />
        </div>
      </div>
    );
  },
);

InputSearch.displayName = 'InputSearch';
