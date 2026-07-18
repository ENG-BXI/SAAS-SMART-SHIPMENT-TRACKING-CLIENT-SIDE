'use client';

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel';

import Image from 'next/image';
import {cn} from '@/lib/utils';
import {useLocale, useTranslations} from 'next-intl';
import Autoplay from 'embla-carousel-autoplay';
import {useMemo} from 'react';

interface SliderCardProps {
  image: string;
  title: string;
  description: string;
  className?: string;
}

export interface SliderItem {
  title: string;
  description: string;
  image: string;
}

export function SliderCard({image, title, description, className}: SliderCardProps) {
  return (
    <div className={cn('cursor-grab active:cursor-grabbing  select-none group relative h-105 overflow-hidden rounded-3xl', className)}>
      <Image src={image} alt={title} fill sizes='(max-width: 768px) 100vw, 50vw' className='object-cover transition-transform duration-700 group-hover:scale-110' />

      <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent' />

      <div className='absolute bottom-8 left-8 right-8 text-white'>
        <h3 className='select-none text-2xl font-bold tracking-tight'>{title}</h3>

        <p className='select-none mt-3 max-w-md translate-y-5 text-sm leading-7 text-white/80 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>{description}</p>
      </div>
    </div>
  );
}

const sliderImages = ['/assets/smart-shipment-mangement.jpg', '/assets/shipment-track.jpg', '/assets/manage-driver.jpg', '/assets/manage-clients.jpg', '/assets/saas.jpg'];

const ImageSlider = () => {
  const locale = useLocale();
  const t = useTranslations('landingPage.imageSlider');
  const sliderData = (t.raw('items') as Omit<SliderItem, 'image'>[]).map((item, index) => ({
    ...item,
    image: sliderImages[index]
  }));
  const isRtl = locale == 'ar' || locale == 'ur';
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true
      }),
    []
  );
  return (
    <Carousel id='image-slider' opts={{align: 'start', loop: true, direction: isRtl ? 'rtl' : 'ltr'}} plugins={[autoplay]} className='w-full'>
      <CarouselContent className='-ml-6'>
        {sliderData.map((item, index) => (
          <CarouselItem key={`${item.title}-${index}`} className='basis-full pl-6 md:basis-1/2'>
            <SliderCard {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className='left-2 h-14 w-14 rounded-full bg-custom-primary-color text-white shadow-lg hover:bg-custom-primary-color/80' />
      <CarouselNext className='right-3 h-14 w-14 rounded-full bg-custom-primary-color text-white shadow-lg hover:bg-custom-primary-color/80' />
    </Carousel>
  );
};

export default ImageSlider;
