'use client';
import Link from 'next/link';
import Logo from './Logo';
import { Button } from './ui/button';

export const Header = () => {
  return (
    <nav className="w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="ghost" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" variant="primary" asChild>
            <Link href="/register">Daftar</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
