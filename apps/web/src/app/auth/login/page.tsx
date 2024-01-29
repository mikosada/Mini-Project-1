'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const uniqueKey = new Date().getTime().toString();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/login',
        {
          email,
          password,
        },
      );

      localStorage.setItem('jwtToken', response.data.token);
      setLoggedIn(true);

      router.push('/');
    } catch (error: any) {
      error.response?.data || error.message;
    }
  };

  return (
    <div className="flex items-center justify-center my-20 ">
      <div className="bg gray-100 p-5 rounded shadow-md">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border rounded w-full py-2 px-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold my-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="border rounded w-full py-2 px-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-4">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded "
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
