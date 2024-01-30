'use client';
import { useState } from 'react';
import ReactSlider from 'react-slider';

export const Footer = () => {
  const [values, setValues] = useState([0, 2500000]);
  const handleChange = (newValues: number[]) => setValues(newValues);
  return (
    <div>
      <div className="border-t border-neutral-200 w-full" />
      Footer
    </div>
  );
};
