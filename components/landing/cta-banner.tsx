'use client'
import React from 'react';
import Image from 'next/image';

interface CtaBannerProps {
  title: string;
  buttonText: string;
  imageAlt?: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({title, buttonText, imageAlt = 'Fleet image'}) => {
  return (
    <div className='w-full relative pt-20'>
      {/* حاوية الصورة المتداخلة مع البانر */}
      <div className='mx-auto relative -mb-16 md:-mb-24 flex justify-center'>
        <div className='w-full relative h-45 sm:h-65 md:h-80'>
          <Image src={'/assets/login-image.jpg'} alt={imageAlt} fill priority className='object-cover' />
        </div>
      </div>

      {/* شريط الخلفية البرتقالي السفلي */}
      <div className='bg-custom-primary-color w-full py-12 text-white relative z-0'>
        <div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6'>
          <h3 className='text-xl md:text-3xl font-semibold tracking-wide text-center md:text-left'>{title}</h3>
          <button onClick={()=>{}} className='border-2 border-white/60 bg-transparent hover:bg-white hover:text-[#FF5700] text-white px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap'>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
