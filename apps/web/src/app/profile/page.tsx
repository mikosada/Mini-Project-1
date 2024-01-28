'use client';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function profile() {
  const storagedToken =
    typeof window !== 'undefined' ? localStorage.getItem('jwtToken') : null;

  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

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

        const res = response.data;
        console.log(res);

        setUsername(res.data.username);
        setEmail(res.data.email);
        setId(res.data.id);
        setRole(res.data.role);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <>
      <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <h3 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          Your Profile
        </h3>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          hello,
        </p>
      </div>
    </>
  );
}
