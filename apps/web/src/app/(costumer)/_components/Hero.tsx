import React from 'react';
import { InputSearch } from './InputSearch';
import { LocationSearch } from './LocationSearch';

interface HeroSeachProps {
  onSearch: (categoryName: string) => void;
}

const Hero = ({ onSearch }: HeroSeachProps) => {
  return (
    <div className="flex items-center justify-between">
      <InputSearch
        type="search"
        id="search"
        placeholder="Cari Event"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="md:flex hidden">
        <LocationSearch />
      </div>
    </div>
  );
};

export default Hero;
