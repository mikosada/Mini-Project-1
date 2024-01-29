import { ChevronDown, MapPin } from 'lucide-react';
import React from 'react';
import { Label } from '../../../components/ui/label';
import { cn } from '@/lib/utils';

interface LocationSearchProps {
  isDivider?: boolean;
  textStyle?: string;
}

export const LocationSearch = ({
  isDivider = false,
  textStyle = 'text-black',
}: LocationSearchProps) => {
  return (
    <div className="flex items-center justify-end gap-x-3 w-80 hover:cursor-pointer pr-4">
      {isDivider ? <div className="w-[1px] h-4 bg-neutral-300" /> : null}
      <MapPin className="w-[16px] h-[16px]" type="button" />
      <Label
        className={`text-base hover:cursor-pointer font-semibold ${textStyle}`}
      >
        Semua Lokasi
      </Label>
      <ChevronDown className="w-[16px] h-[16px] md:flex hidden" type="button" />
    </div>
  );
};
