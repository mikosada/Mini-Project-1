'use client';

import { useState } from 'react';

// components
import IconChevronLeft from '@/components/icons/icon-chevron-left';
import IconChevronRight from '@/components/icons/icon-chevron-right';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';

interface IconProps {
  page: number;
  total?: number;
  onChange: (activePage: number) => void;
}

const CommonPagination: React.FC<IconProps> = ({
  page,
  total,
  onChange,
}: IconProps) => {
  const [activePage, setActivePage] = useState(page);

  return (
    <>
      <div className="w-full flex justify-center">
        <div
          className="cursor-pointer"
          onClick={() => {
            if (activePage <= 1) return;
            setActivePage(activePage - 1);
            onChange(activePage - 1);
          }}
        >
          <ChevronLeftCircle
            className={`w-6 h-6 ${activePage <= 1 ? 'text-neutral-300' : 'text-neutral-600'}`}
          />
        </div>
        <div className="px-4">
          Halaman {activePage} {total && <span>/ {total}</span>}
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            if (activePage >= (total || 1)) return;
            setActivePage(activePage + 1);
            onChange(activePage + 1);
          }}
        >
          <ChevronRightCircle
            className={`w-6 h-6 ${activePage >= (total || 1) ? 'text-neutral-300' : 'text-neutral-600'}`}
          />
        </div>
      </div>
    </>
  );
};

export default CommonPagination;
