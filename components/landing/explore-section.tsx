'use client';
import {ArrowUpRight} from 'lucide-react';
import Image from 'next/image';
import {useState} from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import {useTranslations} from 'next-intl';

import 'yet-another-react-lightbox/styles.css';

const previewImages = ['/assets/screenshot/home.png', '/assets/screenshot/create-shipment.png', '/assets/screenshot/shipment-details.png'];

interface PreviewItem {
  title: string;
  description: string;
  image: string;
}

function ExploreSection() {
  const t = useTranslations('landingPage.explore');
  const previewItems = (t.raw('items') as Omit<PreviewItem, 'image'>[]).map((item, index) => ({
    ...item,
    image: previewImages[index]
  }));

  return (
    <section id='explore' className='container mx-auto my-28 px-5'>
      <div className='mb-12 text-center'>
        <h6 className='mb-2 text-xl text-custom-primary-color'>{t('eyebrow')}</h6>

        <h2 className='section__title mx-auto max-w-3xl'>{t('title')}</h2>

        <p className='mx-auto mt-4 max-w-2xl text-muted-foreground'>{t('description')}</p>
      </div>

      <PreviewCard large {...previewItems[0]} previewItems={previewItems} />

      <div className='mt-5 grid gap-5 md:grid-cols-2'>
        {previewItems.slice(1).map(pre => {
          return <PreviewCard key={pre.title} {...pre} previewItems={previewItems} />;
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
  previewItems: PreviewItem[];
  large?: boolean;
}

function PreviewCard({title, description, image, previewItems, large}: PreviewCardProps) {
  const [open, setOpen] = useState(false);
  const currentIndex = previewItems.findIndex(item => item.image === image);

  return (
    <>
      <div onClick={() => setOpen(true)} className={`group cursor-zoom-in overflow-hidden rounded-3xl border bg-card transition duration-500 hover:-translate-y-1 hover:shadow-xl ${large ? 'h-162.5' : 'h-107.5'}`}>
        <div className='relative h-[75%] overflow-hidden'>
          <Image src={image} alt={title} fill className='object-cover object-top transition duration-700 group-hover:scale-105' />
        </div>

        <div className='flex justify-between items-center pe-5'>
          <div className='p-6'>
            <h3 className='mb-2 text-2xl font-semibold'>{title}</h3>

            <p className='text-muted-foreground'>{description}</p>
          </div>
          <div className='flex min-w-12 min-h-12 items-center justify-center rounded-full bg-custom-primary-color/10 transition group-hover:bg-custom-primary-color'>
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
