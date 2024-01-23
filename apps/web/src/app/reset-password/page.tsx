'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

const page = () => {
  const searchParam = useSearchParams();
  const token = searchParam.get('tkn');
  return <div className="pt-40">Token: {token}</div>;
};

export default page;
