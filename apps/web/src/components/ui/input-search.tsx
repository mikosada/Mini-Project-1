import * as React from 'react';

import { cn } from '@/lib/utils';
import { ChevronDown, MapPin, SearchIcon } from 'lucide-react';
import { Label } from './label';
import { LocationSearch } from '../../app/(costumer)/_components/LocationSearch';

export interface CustomInputSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const CustomInputSearch = React.forwardRef<
  HTMLInputElement,
  CustomInputSearchProps
>(({ className, type, ...props }, ref) => {
  return (
    <div className="relative flex items-center h-10 rounded-full border border-input bg-[#F4F7FE] pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
      <SearchIcon className="h-[24px] w-[24px] text-neutral-400" />
      <input
        type={type}
        className={cn(
          'bg-[#F4F7FE] rounded-full w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
      <div className="md:hidden">
        <LocationSearch isDivider={true} textStyle="text-blue-600" />
      </div>
    </div>
  );
});
CustomInputSearch.displayName = 'CustomInputSearch';

export { CustomInputSearch };
