'use client';

import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {cn} from '@/lib/utils';
import {useEffect, useState} from 'react';
import {usePathname} from '@/i18n/navigation';

interface HeaderProps {
  className?: string;
}

const Header = ({className}: HeaderProps) => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  const navLinks = [
    {
      label: 'Home',
      href: isHomePage ? '#hero' : '/#hero'
    },
    {
      label: 'Services',
      href: isHomePage ? '#services' : '/#services'
    },
    {
      label: 'Explore',
      href: isHomePage ? '#explore' : '/#explore'
    },
    {
      label: 'FAQ',
      href: isHomePage ? '#faq' : '/#faq'
    }
  ];

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setScrolled(currentScroll > 80);

      if (currentScroll > lastScroll && currentScroll > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn('fixed left-0 top-0 z-100 w-full transition-transform duration-500', hidden ? 'translate-y-[-120%]' : 'translate-y-0', className)}>
      <div className={cn('mx-auto flex items-center justify-between text-white transition-all duration-500 ease-out', scrolled ? 'mt-5 w-[90%] max-w-7xl rounded-full border border-white/10 bg-black/40 px-6 py-4 backdrop-blur-xl' : 'w-full px-6 py-5 md:px-20')}>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-custom-primary-color'>
            <svg width='18' height='18' viewBox='0 0 24 24' fill='white'>
              <path d='M2 21L22 12L2 3V10L16 12L2 14V21Z' />
            </svg>
          </div>

          <span className='text-lg font-bold tracking-tight'>
            S3
            <span className='ml-1 font-medium text-zinc-300'>Tracking System</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className='hidden lg:block'>
          <ul className='flex items-center gap-8 text-sm text-zinc-300'>
            {navLinks.map(item => (
              <li key={item.href}>
                <Link href={item.href} className='transition hover:text-white'>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <Link href='/register-company' className='group flex items-center gap-2 rounded-full bg-custom-primary-color px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90'>
          Register Now
          <ArrowUpRight className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
        </Link>
      </div>
    </header>
  );
};

export default Header;
