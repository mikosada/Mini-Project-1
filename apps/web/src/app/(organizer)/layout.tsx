import { ModalProvider } from '@/components/providers/modal-provider';
import React from 'react';
import { Toaster } from 'sonner';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full">
      <Toaster />
      <ModalProvider />
      {children}
    </main>
  );
};

export default DashboardLayout;
