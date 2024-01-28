'use client';

import { CassetteTape, Ghost, Tags, User, UserCog } from 'lucide-react';
import React from 'react';
import NavItem from './NavItem';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const items = [
    {
      title: 'Events',
      icon: <CassetteTape className="h-6 w-6 mr-2" />,
      href: `/organizer/events`,
    },
    {
      title: 'Users',
      icon: <UserCog className="h-6 w-6 mr-2" />,
      href: `/organizer/users`,
    },
  ];

  const router = useRouter();

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className="bg-[#007bff] h-screen p-4 text-neutral-100 flex flex-col justify-between">
      <div className="transition ease-in-out duration-[0.3s]">
        <h2
          className="font-semibold text-2xl mb-6 mt-2 cursor-pointer hover:text-neutral-200"
          onClick={() => onClick('/organizer')}
        >
          Admin Panel
        </h2>
        <NavItem items={items} />
      </div>
      <div className="">
        <Button variant="link" className="w-full text-white">
          Logout
        </Button>
      </div>
    </div>
  );
}
