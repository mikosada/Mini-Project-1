import React from 'react';
import { InputSearch } from './InputSearch';
import { LocationSearch } from './LocationSearch';

const Hero = () => {
  return (
    <div className="flex items-center justify-between">
      <InputSearch type="search" id="search" placeholder="Cari Event" />
      <div className="md:flex hidden">
        <LocationSearch />
      </div>
    </div>
  );
};

export default Hero;
