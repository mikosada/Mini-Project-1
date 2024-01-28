'use client';

import React from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import { useCardModal } from '@/hooks/use-card-modal';
import Description from './description';

export const CardModal = () => {
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div className="w-full space-y-6">
          <Description />
        </div>
      </DialogContent>
    </Dialog>
  );
};
