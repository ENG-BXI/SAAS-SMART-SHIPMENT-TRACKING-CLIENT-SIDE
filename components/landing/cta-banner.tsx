'use client';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

export const CtaBanner = () => {
  const t = useTranslations('landingPage.ctaBanner');

  return (
    <section id='cta-banner' className='relative w-full pt-20'>
      <div className='container relative mx-auto flex justify-center'>
        <div className='relative h-24 w-full md:h-44'>
          <Image src='/assets/footer.webp' alt={t('imageAlt')} fill priority className='sm:object-contain' />
        </div>
      </div>

      <div className='relative z-0 w-full bg-custom-primary-color py-12 text-white'>
        <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row'>
          <div className=''>
            <h3 className='text-2xl font-bold tracking-tight md:text-4xl'>{t('title')}</h3>
            <p className='mt-3 text-sm leading-7 text-white/80 md:text-base'>{t('description')}</p>
          </div>

          <button onClick={() => {}} className='whitespace-nowrap rounded-full w-full md:w-min border-2 border-white/50 bg-transparent px-8 py-3 text-sm font-semibold transition-all duration-300 hover:bg-white hover:text-custom-primary-color'>
            {t('action')}
          </button>
        </div>
      </div>
    </section>
  );
};
