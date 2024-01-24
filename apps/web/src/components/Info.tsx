import { ChevronLeft, ChevronRight, MedalIcon, Megaphone } from 'lucide-react';
import React from 'react';

const Info = () => {
  return (
    <div className="md:flex gap-2 mt-4 justify-between items-center">
      <div className="flex items-center bg-gradient-to-r from-blue-400 to-blue-600 rounded-md p-4 text-white ">
        <div className="rounded-full bg-white p-2">
          <MedalIcon className="w-5 h-5 text-blue-400" />
        </div>
        <p className="ml-4">
          <span className="font-semibold">Jaminan Harga Termurah! </span> Nemu
          yang lebih murah ditempat yang lain? Klaim 2x selisihnya*
        </p>
        <ChevronRight className="w-6 h-6 mr-4" />
      </div>
      <div className="max-sm:mt-4 sm:mt-4 md:mt-0 flex items-center bg-gradient-to-l from-green-400 to-green-600 rounded-md p-4 text-white ">
        <div className="rounded-full bg-white p-2">
          <Megaphone className="w-5 h-5 text-blue-400" />
        </div>
        <p className="ml-4">
          <span className="font-semibold">Benefit Silver! </span> Kamu berhak
          menikmati penawaran khusus. Pilih aktivitas terbaik Anda!
        </p>
        <ChevronRight className="w-6 h-6 mr-4" />
      </div>
    </div>
  );
};

export default Info;
