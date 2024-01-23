'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export interface CategoryProps {
  title: string;
  isChecked: boolean;
}

interface CategoryItemProps {
  checkedCategoryName: string;
  categories: CategoryProps[];
  onCheck: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CategoryItem = ({
  checkedCategoryName,
  categories,
  onCheck,
}: CategoryItemProps) => {
  const refCategory = useRef<HTMLDivElement>(null);
  const btnLeft = useRef<HTMLDivElement>(null);
  const btnRight = useRef<HTMLDivElement>(null);

  const onNext = (even: React.MouseEvent<HTMLDivElement>) => {
    even.preventDefault();
    let currentRef = refCategory?.current;
    if (currentRef != null) currentRef.scrollLeft += 150;
    VisibilityIcon();
  };

  const onPrev = (even: React.MouseEvent<HTMLDivElement>) => {
    even.preventDefault();
    let da = refCategory?.current;
    if (da != null) da.scrollLeft -= 150;
    VisibilityIcon();
  };

  const VisibilityIcon = () => {
    let currentRef = refCategory?.current;
    let btnLeftCurrent = btnLeft?.current;
    let btnRightCurrent = btnRight?.current;
    if (currentRef == null || btnLeftCurrent == null || btnRightCurrent == null)
      return;

    let scrollLeftValue = Math.ceil(currentRef.scrollLeft);
    let scrollableWidth = currentRef.scrollWidth - currentRef.clientWidth;
    btnLeftCurrent.style.display = scrollLeftValue > 0 ? 'block' : 'none';
    btnRightCurrent.style.display =
      scrollableWidth > scrollLeftValue ? 'block' : 'none';
  };

  return (
    <div className="relative flex items-center pt-6 transition ease-linear trans">
      <div
        ref={btnLeft}
        className="max-sm:hidden absolute left-0 rounded-xl bg-white shadow-lg p-2 hidden hover:border-2 hover:bg-neutral-200 hover:border-neutral-200 cursor-pointer"
        onClick={onPrev}
      >
        <ChevronLeft className="w-[24px] h-[24px]" />
      </div>
      <div
        ref={btnRight}
        className="max-sm:block absolute right-0 rounded-xl bg-white shadow-lg p-2 hidden hover:border-2 hover:bg-neutral-200 hover:border-neutral-200 cursor-pointer"
        onClick={onNext}
      >
        <ChevronRight className="w-[24px] h-[24px]" />
      </div>
      <div
        ref={refCategory}
        className="flex gap-2 items-center max-sm:overflow-x-auto justify-start scroll-category"
      >
        {categories.map((category, index) => (
          <Button
            onClick={onCheck}
            key={index}
            variant={
              category.title === checkedCategoryName
                ? 'outlinePrimaryFull'
                : 'outline'
            }
            size="md"
            name={category.title}
            className="rounded-full font-normal select-none transition ease-in-out delay-150"
          >
            {category.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryItem;
