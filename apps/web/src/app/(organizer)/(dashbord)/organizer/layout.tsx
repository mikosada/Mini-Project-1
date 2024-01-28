import React from 'react';
import { Sidebar } from '../../_components/Sidebar';

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-6xl 2xl:max-w-screen-xl mx-auto bg-neutral-50">
      <div className="flex gap-x-7">
        <div className="w-64 shrink-0 hidden md:block">
          {/* Sidebar */}
          <Sidebar />
        </div>
        <div className="w-full py-14 pr-8 pl-4">{children}</div>
      </div>
    </main>
  );
}
