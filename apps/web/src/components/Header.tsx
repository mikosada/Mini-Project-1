'use client';
import Link from 'next/link';
import Logo from './Logo';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { verifyToken } from '../../../api/src/middleware/verifyToken';

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
          {isLoggedIn ? null : (
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
