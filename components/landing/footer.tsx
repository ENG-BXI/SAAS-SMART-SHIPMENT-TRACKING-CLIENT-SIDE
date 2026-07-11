import React from 'react';
import Link from 'next/link';
import {ArrowUpRight, Facebook, Twitter, Instagram, Youtube, PhoneCall} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className='bg-[#0B0B0B] text-white pt-16 pb-8 border-t border-zinc-900 font-sans'>
      <div className='max-w-7xl mx-auto px-6 md:px-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16'>
          <div className='lg:col-span-3 flex flex-col justify-between space-y-8'>
            <div className='flex items-center gap-2'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='text-custom-primary-color fill-current'>
                <path d='M2 21L22 12L2 3V10L16 12L2 14V21Z' />
              </svg>
              <span className='font-bold text-xl tracking-tight text-white'>
                S3 <span className='text-zinc-200 font-medium'>Tracking</span>
              </span>
            </div>

            <div className='flex items-center gap-5 text-zinc-400'>
              <Link href='#' aria-label='Facebook' className='hover:text-custom-primary-color transition-colors'>
                <Facebook className='h-4 w-4' />
              </Link>
              <Link href='#' aria-label='Twitter' className='hover:text-custom-primary-color transition-colors'>
                <Twitter className='h-4 w-4' />
              </Link>
              <Link href='#' aria-label='Instagram' className='hover:text-custom-primary-color transition-colors'>
                <Instagram className='h-4 w-4' />
              </Link>
              <Link href='#' aria-label='Youtube' className='hover:text-custom-primary-color transition-colors'>
                <Youtube className='h-4 w-4' />
              </Link>
              <Link href='#' aria-label='Whatsapp' className='hover:text-custom-primary-color transition-colors'>
                <PhoneCall className='h-4 w-4' />
              </Link>
            </div>
          </div>

          <div className='lg:col-span-2 flex flex-col space-y-4'>
            <h4 className='text-sm font-bold tracking-wider text-white uppercase'>Services</h4>
            <ul className='space-y-3'>
              <li>
                <Link href='/services/air' className='text-zinc-400 hover:text-white text-sm transition-colors'>
                  Air Freight
                </Link>
              </li>
              <li>
                <Link href='/services/truck' className='text-zinc-400 hover:text-white text-sm transition-colors'>
                  Truck Freight
                </Link>
              </li>
              <li>
                <Link href='/services/warehousing' className='text-zinc-400 hover:text-white text-sm transition-colors'>
                  Warehousing
                </Link>
              </li>
              <li>
                <Link href='/services/rail' className='text-zinc-400 hover:text-white text-sm transition-colors'>
                  Rail Freight
                </Link>
              </li>
              <li>
                <Link href='/services/ship' className='text-zinc-400 hover:text-white text-sm transition-colors'>
                  Ship freight
                </Link>
              </li>
              <li>
                <Link href='/services/customs' className='text-zinc-400 hover:text-white text-sm transition-colors'>
                  Customs Brokerage
                </Link>
              </li>
            </ul>
          </div>

          <div className='lg:col-span-2 flex flex-col space-y-4'>
            <h4 className='text-sm font-bold tracking-wider text-white uppercase'>Company</h4>
            <ul className='space-y-3'>
              <li>
                <Link href='/' className='text-zinc-400 hover:text-white text-sm transition-colors'>
                  Home
                </Link>
              </li>
              <li>
                <Link href='/about' className='text-zinc-400 hover:text-white text-sm transition-colors'>
                  About us
                </Link>
              </li>
              <li>
                <Link href='/team' className='text-zinc-400 hover:text-white text-sm transition-colors'>
                  Our team
                </Link>
              </li>
              <li>
                <Link href='/careers' className='text-zinc-400 hover:text-white text-sm transition-colors'>
                  Careers
                </Link>
              </li>
              <li>
                <Link href='/blog' className='text-zinc-400 hover:text-white text-sm transition-colors'>
                  Blog
                </Link>
              </li>
              <li>
                <Link href='/contact' className='text-zinc-400 hover:text-white text-sm transition-colors'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className='lg:col-span-5 flex flex-col justify-between space-y-6 lg:pl-12'>
            <div className='flex items-start justify-between'>
              <h3 className='text-3xl md:text-4xl font-normal tracking-tight text-white'>Get in Touch</h3>
              <div className='text-zinc-500 hover:text-white cursor-pointer p-1 transition-colors'>
                <ArrowUpRight className='h-8 w-8 stroke-[1.5]' />
              </div>
            </div>

            <div className='space-y-5'>
              <div>
                <span className='text-xs text-zinc-500 uppercase tracking-wider block mb-1'>Email</span>
                <a href='mailto:contact@S3 Tracking.com' className='text-lg md:text-xl font-medium hover:text-custom-primary-color transition-colors'>
                  contact@S3TrackingSystem.com
                </a>
              </div>

              <div>
                <span className='text-xs text-zinc-500 uppercase tracking-wider block mb-1'>Phone</span>
                <a href='tel:+9293339296' className='text-lg md:text-xl font-medium hover:text-custom-primary-color transition-colors'>
                  +999999999
                </a>
              </div>

              <div>
                <span className='text-xs text-zinc-500 uppercase tracking-wider block mb-1'>Office Location</span>
                <p className='text-lg md:text-xl font-medium text-zinc-200'>100 S Main St, New York, NY</p>
              </div>
            </div>
          </div>
        </div>
        <div className='border-t border-zinc-900 pt-8 mt-4 text-center'>
          <p className='text-xs tracking-wide text-zinc-500'>Copyright 2025 S3 Tracking by Abdo</p>
        </div>
      </div>
    </footer>
  );
};
