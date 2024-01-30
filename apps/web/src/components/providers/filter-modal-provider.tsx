'use client';

import React, { useEffect, useState } from 'react';
import { FilterModal } from '@/app/(costumer)/_components/FilterModal';

export const FilterModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <FilterModal />
    </>
  );
};
