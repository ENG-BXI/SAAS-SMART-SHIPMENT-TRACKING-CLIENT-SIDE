'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
// import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import {cn} from '@/lib/utils';

interface SliderCardProps {
  image: string;
  title: string;
  className?: string;
}
export interface SliderItem {
  id: number;
  title: string;
  image: string;
}
export function SliderCard({image, title, className}: SliderCardProps) {
  return (
    <div className={cn('relative h-150 overflow-hidden rounded-3xl', className)}>
      <Image src={image} alt={title} fill sizes='100' priority className='object-cover transition duration-500 hover:scale-105' />
      <div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent' />
      <h3 className='absolute bottom-10 left-10 text-2xl font-bold text-white'>{title}</h3>
    </div>
  );
}
export const sliderData: SliderItem[] = [
  {
    id: 1,
    title: 'Container Shipping',
    image: '/assets/login-image.jpg'
  },
  {
    id: 2,
    title: 'Global Cargo Tracking',
    image: '/assets/login-image.jpg'
  },
  {
    id: 3,
    title: 'Efficient Freight Solutions',
    image: '/assets/login-image.jpg'
  },
  {
    id: 4,
    title: 'Container Shipping',
    image: '/assets/login-image.jpg'
  },
  {
    id: 5,
    title: 'Global Cargo Tracking',
    image: '/assets/login-image.jpg'
  },
  {
    id: 6,
    title: 'Efficient Freight Solutions',
    image: '/assets/login-image.jpg'
  },
];

const ImageSlider = () => {
  return (
    <Carousel
      //   plugins={[
      //     Autoplay({
      //       delay: 4000
      //     })
      //   ]}
      opts={{
        align: 'center',
        loop: true
      }}
      className='w-full'
    >
      <CarouselContent className=''>
        {sliderData.map(item => (
          <CarouselItem key={item.id} className='pl-6 basis-1/2'>
            <SliderCard {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className='-left-6 h-14 w-14 rounded-full bg-orange-500 text-white hover:bg-orange-600' />

      <CarouselNext className='-right-6 h-14 w-14 rounded-full bg-orange-500 text-white hover:bg-orange-600' />
    </Carousel>
  );
};

export default ImageSlider;
