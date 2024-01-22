import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition hidden md:flex">
        <Image src="/logo.png" alt="Logo" height={100} width={100} />
      </div>
    </Link>
  );
};

export default Logo;
