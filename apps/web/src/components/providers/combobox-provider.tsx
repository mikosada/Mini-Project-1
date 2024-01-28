'use client';

import React, { useEffect, useState } from 'react';
import { FormCombobox } from '../form/FormCombobox';

export const ComboboxProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <FormCombobox />
    </>
  );
};
