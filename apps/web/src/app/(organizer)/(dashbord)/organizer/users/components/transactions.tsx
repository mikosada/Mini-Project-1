import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Transactions {
  user: {
    id: number;
    username: string;
    email: string;
  };
  event: {
    id: number;
    rating: any;
    review: string;
    status: string;
    createdAt: string;
  };
}

export const Transactions = () => {
  const [transactions, setTransaction] = useState<Transactions[]>([]);

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    const { data } = await axios.get(
      'http://localhost:8000/api/dashboard/transaction',
    );
    setTransaction(data.data);
  };

  return (
    <>
      <h1 className="font-bold text-2xl">Transactions</h1>
      <table className="w-full border-collapse mt-10">
        <thead>
          <tr>
            <th className="border bg-gray-200">Transaction ID</th>
            <th className="border bg-gray-200">Username</th>
            <th className="border bg-gray-200">Email</th>
            <th className="border bg-gray-200">Rating</th>
            <th className="border bg-gray-200">Review</th>
            <th className="border bg-gray-200">Status</th>
            <th className="border bg-gray-200">Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr>
              <td className="border px-8 py-4">{transaction.event.id}</td>
              <td className="border px-8 py-4">{transaction.user.username}</td>
              <td className="border px-8 py-4">{transaction.user.email}</td>
              <td className="border px-8 py-4">{transaction.event.rating}</td>
              <td className="border px-8 py-4">{transaction.event.review}</td>
              <td className="border px-8 py-4">{transaction.event.status}</td>
              <td className="border px-8 py-4">
                {transaction.event.createdAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
