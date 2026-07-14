'use client';
import Link from 'next/link';
import {ArrowUpRight, Facebook, Twitter, Instagram, Youtube, PhoneCall} from 'lucide-react';

import FooterBrand from './footer-brand';

const platformLinks = [
  {
    label: 'About Us',
    href: '#about'
  },
  {
    label: 'Services',
    href: '#services'
  },
  {
    label: 'Explore',
    href: '#explore'
  },
  {
    label: 'FAQ',
    href: '#faq'
  }
];

const companyLinks = [
  {
    label: 'Register Company',
    href: '/register'
  },
  {
    label: 'Login',
    href: '/login'
  }
];

export const Footer = () => {
  return (
    <footer className='overflow-hidden border-t border-zinc-900 bg-[#0B0B0B] pt-16 pb-8 font-sans text-white'>
      <div className='mx-auto max-w-7xl px-6 md:px-12'>
        <div className='grid grid-cols-1 gap-12 pb-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8'>
          {/* Brand */}
          <div className='flex flex-col justify-between space-y-8 lg:col-span-3'>
            <div className='flex items-center gap-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-custom-primary-color'>
                <svg width='18' height='18' viewBox='0 0 24 24' fill='white'>
                  <path d='M2 21L22 12L2 3V10L16 12L2 14V21Z' />
                </svg>
              </div>
              <span className='text-xl font-bold'>
                S3 <span className='font-medium text-zinc-300'>Tracking System</span>
              </span>
            </div>
            <div className='flex gap-5 text-zinc-400'>
              {[Facebook, Twitter, Instagram, Youtube, PhoneCall].map((Icon, index) => (
                <Link key={index} href='#' className='transition hover:text-custom-primary-color'>
                  <Icon className='h-4 w-4' />
                </Link>
              ))}
            </div>
          </div>
          {/* Navigation */}
          <div className='space-y-4 lg:col-span-2'>
            <h4 className='text-sm font-bold uppercase tracking-wider'>Platform</h4>
            <ul className='space-y-3 text-sm text-zinc-400'>
              {platformLinks.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className='transition hover:text-white'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Company */}
          <div className='space-y-4 lg:col-span-2'>
            <h4 className='text-sm font-bold uppercase tracking-wider'>Company</h4>

            <ul className='space-y-3 text-sm text-zinc-400'>
              {companyLinks.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className='transition hover:text-white'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div className='space-y-6 lg:col-span-5 lg:pl-12'>
            <div className='flex justify-between'>
              <h3 className='text-3xl font-normal md:text-4xl'>Get in Touch</h3>

              <Link href='/register-company'>
                <ArrowUpRight className='h-8 w-8 text-zinc-500 transition hover:text-white' />
              </Link>
            </div>

            <div className='space-y-5'>
              <div>
                <span className='text-xs uppercase text-zinc-500'>Email</span>

                <a href='mailto:abdalrhman.muneer.info@gmail.com' className='block text-lg font-medium transition hover:text-custom-primary-color'>
                  abdalrhman.muneer.info@gmail.com
                </a>
              </div>

              <div>
                <span className='text-xs uppercase text-zinc-500'>Phone</span>

                <a href='tel:+967776935953' className='block text-lg font-medium transition hover:text-custom-primary-color'>
                  +967776935953
                </a>
              </div>

              <div>
                <span className='text-xs uppercase text-zinc-500'>Location</span>

                <p className='text-lg text-zinc-200'>Yemen</p>
              </div>
            </div>

            <Link href='/register-company' className='inline-flex items-center gap-2 rounded-full bg-custom-primary-color px-7 py-3 text-sm font-semibold transition hover:opacity-90'>
              Start Your Company
              <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
        </div>
      </div>
      <FooterBrand />
      <div className='mt-8 border-t border-zinc-900 pt-8 text-center'>
        <p className='text-xs tracking-wide text-zinc-500'>
          Copyright {new Date().getFullYear()} S3 Tracking System by{' '}
          <Link className='text-custom-primary-color hover:underline' target='_blank' href={'https://abdulrhman-portfolio-code.vercel.app/'}>
            Abdulrhman Muneer
          </Link>
        </p>
      </div>
    </footer>
  );
};
