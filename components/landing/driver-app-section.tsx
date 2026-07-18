'use client';

import Image from 'next/image';
import {CheckCircle2, Download} from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import {Carousel, CarouselContent, CarouselItem} from '@/components/ui/carousel';
import {useMemo} from 'react';
import {useLocale, useTranslations} from 'next-intl';

const mobileScreens = ['/assets/mobile-home.png', '/assets/mobile-shipment-details.png', '/assets/mobile-shipment.png'];

const DriverAppSection = () => {
  const locale = useLocale();
  const t = useTranslations('landingPage.driverApp');
  const features = t.raw('features') as string[];
  const isRtl = locale === 'ar' || locale === 'ur';

  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 2500,
        stopOnInteraction: false
      }),
    []
  );

  return (
    <section className='relative overflow-hidden pt-5 pb-20'>
      <div className='mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2'>
        {/* Content */}
        <div className='space-y-8'>
          <div className='inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300'>{t('eyebrow')}</div>

          <h2 className='text-4xl font-bold leading-tight md:text-5xl'>
            {t('titleLine1')}
            <br />
            <span className='text-custom-primary-color'>{t('titleLine2')}</span>
          </h2>

          <p className='max-w-xl text-lg leading-8 text-zinc-400'>{t('description')}</p>

          <div className='grid gap-4'>
            {features.map(item => (
              <div key={item} className='flex items-center gap-3 text-zinc-500'>
                <CheckCircle2 className='h-5 w-5 text-custom-primary-color' />
                <span className='text-wrap'>{item}</span>
              </div>
            ))}
          </div>

          <div className='pt-4'>
            <a href='#' className='inline-flex items-center gap-3 rounded-full bg-custom-primary-color px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90'>
              <Download className='h-5 w-5' />
              {t('download')}
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className='relative flex justify-center'>
          <div className='absolute h-125 w-full max-w-62.5 rounded-full bg-custom-primary-color/20 blur-3xl' />

          <div className='relative rounded-[3rem] border border-white/10 bg-black p-3 shadow-2xl'>
            <Carousel
              plugins={[autoplay]}
              opts={{
                align: 'start',
                loop: true,
                direction: isRtl ? 'rtl' : 'ltr'
              }}
              className='max-w-75'
            >
              <CarouselContent>
                {mobileScreens.map(image => (
                  <CarouselItem key={image}>
                    <Image src={image} alt={t('screenAlt')} width={330} height={700} className='h-155 w-full rounded-[2.5rem] object-cover' />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriverAppSection;
