'use client';

import React, { useState } from 'react';
import CategoryItem from './CategoryItem';
import { ICategory } from '@/types';

interface CategoryProps {
  onFilter(id: number): void;
  data: ICategory[];
}

export const Category = ({ data, onFilter }: CategoryProps) => {
  const [currentCategory, setCurrentCategory] = useState('');

  const onCheck = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const buttonName: HTMLButtonElement = event.currentTarget;
    setCurrentCategory(buttonName.name);
    const filteredCategory = data.find(
      (category: ICategory) =>
        category.name.toLowerCase() === buttonName.name.toLowerCase(),
    );

    onFilter(filteredCategory?.id as number);
  };

  return (
    <CategoryItem
      checkedCategoryName={currentCategory}
      categories={data}
      onCheck={onCheck}
    />
  );
};
