'use client';
import Link from 'next/link';
import Logo from '../../../components/Logo';
import { Button } from '../../../components/ui/button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Popover } from '@headlessui/react';

export const Header = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const storagedToken =
    typeof window !== 'undefined' ? localStorage.getItem('jwtToken') : null;

  const verify = async () => {
    try {
      const token = storagedToken;
      if (token) {
        const response = await axios.post(
          'http://localhost:8000/api/auth/keepLogin',
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const res = response.status;

        if (res === 200) {
          setLoggedIn(true);
        } else {
          console.log('Error token or expired session');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <nav className="w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          {isLoggedIn ? (
            <>
              <button className="opacity-0"></button>
              <Link href="/profile">
                <Button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" variant="primary" asChild>
                <Link href="/register">Daftar</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
