import React from 'react';
import { Header } from '../../components/Header';

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
