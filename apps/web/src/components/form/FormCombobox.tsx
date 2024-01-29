'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '../ui/label';
import { CategoryType } from '../card-modal/description';
import { FormControl, FormField, FormItem } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';
import { FormErrors } from './FormErrors';

interface FormComboboxProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  defaultValue?: string;
  form: UseFormReturn<any, any, undefined>;
  categories: CategoryType[];
}

export function FormCombobox({
  id,
  label,
  placeholder,
  required,
  disabled,
  error,
  className,
  defaultValue = '',
  form,
  categories,
}: FormComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-2 mt-2">
      <div className="space-y-1">
        <FormField
          control={form.control}
          name={id}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              {label ? (
                <div className="flex items-center gap-x-1">
                  <Label className="text-xs font-semibold text-neutral-700">
                    {label}
                  </Label>
                  {required ? <span className="text-red-500"> *</span> : null}
                </div>
              ) : null}
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? categories.find(
                            (category: CategoryType) =>
                              category.id === field.value,
                          )?.name
                        : placeholder}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-full p-0"
                  sideOffset={18}
                  align="end"
                >
                  <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandEmpty>No data found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          value={category.name}
                          key={category.id}
                          onSelect={() => {
                            form.setValue(id, category.id);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              category.id === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {category.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      </div>
      <FormErrors error={error} />
    </div>
  );
}
