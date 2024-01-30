import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Attendee {
  id: number;
  username: string;
  email: string;
}

export const AttendeeRegistration = () => {
  const [registration, setRegistration] = useState<Attendee[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setRegistration(generateDummy());
    } else {
      getAttendee();
    }
  }, []);

  const getAttendee = async () => {
    const { data } = await axios.get(
      'http://localhost:8000/api/dashboard/attendees',
    );
    setRegistration(data.data);
  };

  //dummy data
  const generateDummy = (): Attendee[] => {
    return [
      { id: 1, username: 'john_doe', email: 'john@example.com' },
      { id: 2, username: 'jane_smith', email: 'jane@example.com' },
    ];
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="font-bold text-2xl mb-4">Attendee Registration</h2>
        <ul>
          {registration.map((registration) => (
            <li key={registration.id}>
              {registration.username}
              <span className="mx-5"></span>
              {registration.email}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
