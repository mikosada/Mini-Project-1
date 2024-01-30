'use client';

import React from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import { useCardModal } from '@/hooks/use-card-modal';
import FilterPrice from './FilterPrice';

export const FilterModal = () => {
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div className="w-full space-y-6">
          <FilterPrice />
        </div>
      </DialogContent>
    </Dialog>
  );
};
