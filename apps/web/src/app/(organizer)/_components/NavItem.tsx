import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tags } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface NavItemProps {
  items: Array<{
    title: string;
    icon: JSX.Element;
    href: string;
  }>;
}

export const NavItem = (props: NavItemProps) => {
  const { items } = props;
  const router = useRouter();
  const pathname = usePathname();

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className="">
      {items.map((item, index) => (
        <div
          key={item.title}
          onClick={() => onClick(item.href)}
          className={`cursor-pointer flex justify-start items-center hover:bg-white rounded-md hover:text-blue-500 transition ease-in-out duration-[0.3s] px-4 py-2 mt-4 ${pathname === item.href ? 'bg-white text-blue-500' : 'text-neutral-100'}`}
        >
          {item.icon}
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default NavItem;
