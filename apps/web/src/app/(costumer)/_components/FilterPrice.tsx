import { Button } from '@/components/ui/button';
import { useCardModal } from '@/hooks/use-card-modal';
import { formatNumber } from '@/lib/utils';
import React, { useState } from 'react';
import Slider from 'react-slider';

export const FilterPrice = () => {
  const [values, setValues] = useState([0, 2500000]);
  const handleChange = (newValues: number[]) => setValues(newValues);
  const filterModal = useCardModal();

  const onSubmit = () => {
    filterModal.onClose();
    filterModal.onData('harga', values);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-2xl">Harga</h3>
      <div className="flex justify-evenly items-center gap-x-6 mt-4">
        <div className="w-full flex flex-col rounded-md bg-slate-200 p-4 border-2 border-neutral-300 hover:border-neutral-400">
          <span className="font-light text-sm">Minumum</span>
          <span>IDR {formatNumber(values[0])}</span>
        </div>
        <div className="w-full flex flex-col rounded-md bg-slate-200 p-4 border-2 border-neutral-300 hover:border-neutral-400">
          <span className="font-light text-sm">Maximum</span>
          <span>IDR {formatNumber(values[1])}</span>
        </div>
      </div>
      <div className="relative inset-0 w-full">
        <Slider
          className="slider horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          value={values}
          max={2500000}
          min={0}
          pearling={true}
          step={50000}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-center items-center gap-x-6">
        <Button
          variant="secondary"
          className="mt-4 w-full text-[#007bff]"
          onClick={() => setValues([0, 2500000])}
        >
          Reset
        </Button>
        <Button variant="primary" className="mt-4 w-full" onClick={onSubmit}>
          Terapkan
        </Button>
      </div>
    </div>
  );
};

export default FilterPrice;
