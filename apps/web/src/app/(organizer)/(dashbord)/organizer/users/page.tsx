'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { AttendeeRegistration } from './components/attendees';
import { Transactions } from './components/transactions';

export default function Users() {
  const [registrations, setRegistrations] = useState([]);

  useEffect;

  return (
    <>
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-gray-200 shadow-md overflow-hidden">
        <div className="p-6">
          <AttendeeRegistration />
          <Transactions />
        </div>
      </div>
    </>
  );
}
