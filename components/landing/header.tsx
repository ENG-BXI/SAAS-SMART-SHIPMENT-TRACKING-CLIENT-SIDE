'use client';

import Link from 'next/link';
import {ArrowUpRight, Infinity} from 'lucide-react';
import {cn} from '@/lib/utils';
import {useEffect, useState} from 'react';
import {usePathname} from '@/i18n/navigation';
import {useLocale, useTranslations} from 'next-intl';

import CustomSelect, {IOption} from '@/components/custom-select';
import {ModeToggle} from '@/components/theme-toggle';
import useSwitchLanguage from '@/hooks/use-switch-language';
import {LocalsNames, routing} from '@/i18n/routing';
import SideBarLogo from '../sideBar/side-bar-logo';

interface HeaderProps {
  className?: string;
}

const Header = ({className}: HeaderProps) => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [atTop, setAtTop] = useState(true);
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
    <header className={cn('fixed left-0 top-0 z-40 w-full transition-transform duration-500', hidden ? 'translate-y-[-120%]' : 'translate-y-0', className)}>
      <div className={cn('relative z-40 mx-auto flex items-center justify-between text-white transition-all duration-500 ease-out', atTop ? 'w-full bg-black/40 px-6 py-5 backdrop-blur-sm md:px-20' : scrolled ? 'mt-5 w-[90%] max-w-7xl rounded-full border border-white/10 bg-black/80 px-6 py-4 shadow-2xl backdrop-blur-xl' : 'w-full bg-transparent px-6 py-5 md:px-20')}>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-custom-primary-color'>
            <div className='bg-custom-primary-color rounded-lg p-0.5'>
              <Infinity className='text-white' />
            </div>
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

        {/* Actions */}
        <div className='flex items-center gap-3'>
          {/* Language */}
          <div className='relative z-50 hidden sm:block'>
            <CustomSelect className='w-24' value={locale} onChange={newLocale => switchLocale(newLocale)} options={localOptions} />
          </div>

          {/* Theme */}
          <ModeToggle />

          {/* Login */}
          <Link href='/login' className='hidden sm:flex h-10 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition hover:bg-white/10'>
            {t('actions.login')}
          </Link>

          {/* Register */}
          <Link href='/register-company' className='group flex items-center gap-2 rounded-full bg-custom-primary-color px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90'>
            {t('actions.register')}
            <ArrowUpRight className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
