'use client';
import React from 'react';
import Image from 'next/image';

export const CtaBanner = () => {
  return (
    <div className='w-full relative pt-20'>
      <div className='mx-auto relative flex justify-center'>
        <div className='w-full relative md:h-40 h-20 sm:h-20 container '>
          <Image src={'/assets/footer.webp'} alt={'CtaImage'} fill priority className='md:object-fill sm:object-contain lg:object-contain' />
        </div>
      </div>

      <div className='bg-custom-primary-color w-full py-12 text-white relative z-0'>
        <div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6'>
          <h3 className='text-xl md:text-3xl font-semibold tracking-wide text-center md:text-left'>Ready to ship your cargo Worldwide?</h3>
          <button onClick={() => {}} className='border-2 border-white/60 bg-transparent hover:bg-white hover:text-custom-primary-color text-white px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap'>
            Book Shipment
          </button>
        </div>
      </div>
    </div>
  );
};
