import React from 'react';
import LeftSection from './LeftSection';
import RightSection from './RightSection';

export default function CurrentWeather() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 bg-background  bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl">
        <div className="md:w-1/2 w-full">
          <LeftSection />
        </div>
        <div className="md:w-1/2 w-full">
          <RightSection />
        </div>
      </div>
    </div>
  );
}
