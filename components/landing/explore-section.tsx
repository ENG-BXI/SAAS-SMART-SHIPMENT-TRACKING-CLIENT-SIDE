'use client';
import {ArrowUpRight} from 'lucide-react';
import Image from 'next/image';
import {useState} from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/styles.css';

const previewItems = [
  {
    title: 'لوحة التحكم',
    description: 'تابع الإحصائيات، الشحنات، العملاء والسائقين من لوحة تحكم واحدة.',
    image: '/assets/screenshot/home.png'
  },
  {
    title: 'إنشاء الشحنات',
    description: 'أنشئ شحنة جديدة، اختر الخط، السائق، والعملاء خلال ثوانٍ.',
    image: '/assets/screenshot/create-shipment.png'
  },
  {
    title: 'تتبع الشحنة',
    description: 'اعرض حالة الشحنة، النقطة الحالية، والمحطات القادمة للعملاء.',
    image: '/assets/screenshot/shipment-details.png'
  }
];

function ExploreSection() {
  return (
    <section id='explore' className='container mx-auto my-28 px-5'>
      <div className='mb-12 text-center'>
        <h6 className='mb-2 text-xl text-custom-primary-color'>واجهات المنصة</h6>

        <h2 className='section__title mx-auto max-w-3xl'>استكشف النظام قبل استخدامه</h2>

        <p className='mx-auto mt-4 max-w-2xl text-muted-foreground'>جميع الصور التالية مأخوذة من النظام الحقيقي لتوضيح تجربة إدارة الشحنات والعملاء والسائقين.</p>
      </div>

      <PreviewCard large {...previewItems[0]} />

      <div className='mt-5 grid gap-5 md:grid-cols-2'>
        {previewItems.slice(1).map(pre => {
          return <PreviewCard key={pre.title} {...pre} />;
        })}
      </div>
    </section>
  );
}

export default ExploreSection;

interface PreviewCardProps {
  title: string;
  description: string;
  image: string;
  large?: boolean;
}

function PreviewCard({title, description, image, large}: PreviewCardProps) {
  const [open, setOpen] = useState(false);
  const currentIndex = previewItems.findIndex(item => item.image === image);

  return (
    <>
      <div onClick={() => setOpen(true)} className={`group cursor-zoom-in overflow-hidden rounded-3xl border bg-card transition duration-500 hover:-translate-y-1 hover:shadow-xl ${large ? 'h-[650px]' : 'h-[430px]'}`}>
        <div className='relative h-[75%] overflow-hidden'>
          <Image src={image} alt={title} fill className='object-cover object-top transition duration-700 group-hover:scale-105' />
        </div>

        <div className='flex justify-between items-center pe-5'>
          <div className='p-6'>
            <h3 className='mb-2 text-2xl font-semibold'>{title}</h3>

            <p className='text-muted-foreground'>{description}</p>
          </div>
          <div className='flex size-12 items-center justify-center rounded-full bg-custom-primary-color/10 transition group-hover:bg-custom-primary-color'>
            <ArrowUpRight className='text-custom-primary-color transition group-hover:text-white' />
          </div>
        </div>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={previewItems.map(pre => ({
          src: pre.image
        }))}
        index={currentIndex}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 4,
          scrollToZoom: true,
          zoomInMultiplier: 1.5
        }}
        carousel={{
          finite: true
        }}
      />
    </>
  );
}
