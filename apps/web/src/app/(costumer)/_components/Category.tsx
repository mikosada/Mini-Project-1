'use client';

import React, { useState } from 'react';
import { CATEGORIES } from '@/constants';
import CategoryItem from './CategoryItem';

export interface CategoryType {
  id: number;
  name: string;
}

interface CategoryProps {
  data: CategoryType[];
}

export const Category = ({ data }: CategoryProps) => {
  const [currentCategory, setCurrentCategory] = useState('');

  const onCheck = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const buttonName: HTMLButtonElement = event.currentTarget;
    setCurrentCategory(buttonName.name);
  };

  return (
    <CategoryItem
      checkedCategoryName={currentCategory}
      categories={data}
      onCheck={onCheck}
    />
  );
};
