import React from 'react';
import { Header } from '../(costumer)/_components/Header';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div>{children}</div>;
    </>
  );
}
