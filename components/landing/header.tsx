'use client';

import Link from 'next/link';
import {ArrowUpRight, Infinity, Menu, X} from 'lucide-react';
import {cn} from '@/lib/utils';
import {useEffect, useState} from 'react';
import {usePathname} from '@/i18n/navigation';
import {useLocale, useTranslations} from 'next-intl';

import CustomSelect, {IOption} from '@/components/custom-select';
import {ModeToggle} from '@/components/theme-toggle';
import useSwitchLanguage from '@/hooks/use-switch-language';
import {LocalsNames, routing} from '@/i18n/routing';

interface HeaderProps {
  className?: string;
}

const Header = ({className}: HeaderProps) => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('landingHeader');
  const {switchLocale} = useSwitchLanguage();

  const isHomePage = pathname === '/';

  const navLinks = [
    {
      label: t('nav.home'),
      href: isHomePage ? '#hero' : '/#hero'
    },
    {
      label: t('nav.services'),
      href: isHomePage ? '#services' : '/#services'
    },
    {
      label: t('nav.explore'),
      href: isHomePage ? '#explore' : '/#explore'
    },
    {
      label: t('nav.faq'),
      href: isHomePage ? '#faq' : '/#faq'
    }
  ];

  const localOptions: IOption[] = routing.locales.map(val => ({
    label: LocalsNames[val].toUpperCase(),
    value: val
  }));

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setAtTop(currentScroll < 80);
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
    <header className={cn('fixed left-0 top-0 z-50 w-full transition-transform duration-500', hidden ? 'translate-y-[-120%]' : 'translate-y-0', className)}>
      <div className={cn('relative z-50 mx-auto flex items-center justify-between text-white transition-all duration-500 ease-out', atTop ? 'w-full bg-black/40 px-4 py-4 backdrop-blur-sm sm:px-6 md:px-20' : scrolled ? 'mt-4 w-[92%] max-w-7xl rounded-full border border-white/10 bg-black/80 px-4 py-3 shadow-2xl backdrop-blur-xl sm:px-6' : 'w-full px-4 py-4 sm:px-6 md:px-20')}>
        {/* Logo */}
        <Link href='/' className='flex shrink-0 items-center gap-2'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-custom-primary-color'>
            <Infinity className='h-6 w-6 text-white' />
          </div>

          <span className='text-lg font-bold tracking-tight'>
            S3
            <span className='ml-1 hidden font-medium text-zinc-300 sm:inline'>Tracking System</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Actions */}
        <div className='flex items-center gap-2 sm:gap-3'>
          {/* Language */}
          <div className='relative z-60 hidden md:block'>
            <CustomSelect className='w-24' value={locale} onChange={newLocale => switchLocale(newLocale)} options={localOptions} />
          </div>

          {/* Theme */}
          <ModeToggle />

          {/* Login */}
          <Link href='/login' className='hidden h-10 items-center justify-center rounded-full border border-white/20 px-4 text-sm font-semibold transition hover:bg-white/10 sm:flex'>
            {t('actions.login')}
          </Link>

          {/* Register */}
          <Link href='/register-company' className='hidden items-center gap-2 rounded-full bg-custom-primary-color px-4 py-2.5 text-sm font-semibold transition hover:opacity-90 sm:flex'>
            {t('actions.register')}
            <ArrowUpRight className='h-4 w-4' />
          </Link>

          {/* Mobile Button */}
          <button onClick={() => setMobileMenu(prev => !prev)} className='flex h-10 w-10 items-center justify-center rounded-full border border-white/20 lg:hidden'>
            {mobileMenu ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={cn('mx-4 overflow-hidden rounded-3xl border border-white/10 bg-black/90 backdrop-blur-xl transition-all duration-300 lg:hidden', mobileMenu ? 'mt-3 max-h-[600px] opacity-100' : 'max-h-0 opacity-0')}>
        <div className='flex flex-col gap-6 p-5'>
          {/* Mobile Navigation */}
          <nav>
            <ul className='flex flex-col gap-4 text-sm text-zinc-300'>
              {navLinks.map(item => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setMobileMenu(false)} className='block transition hover:text-white'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Actions */}
          <div className='flex flex-col gap-3 border-t border-white/10 pt-5'>
            {/* Language */}
            <CustomSelect className='w-full text-white' value={locale} onChange={newLocale => switchLocale(newLocale)} options={localOptions} />

            {/* Login */}
            <Link href='/login' onClick={() => setMobileMenu(false)} className='flex h-11 items-center justify-center rounded-full border border-white/20 text-sm font-semibold text-white transition hover:bg-white/10'>
              {t('actions.login')}
            </Link>

            {/* Register */}
            <Link href='/register-company' onClick={() => setMobileMenu(false)} className='flex h-11 items-center justify-center gap-2 rounded-full bg-custom-primary-color text-sm font-semibold text-white'>
              {t('actions.register')}
              <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
