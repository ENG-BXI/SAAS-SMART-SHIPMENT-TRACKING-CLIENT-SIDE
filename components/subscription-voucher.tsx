'use client';

import {useState} from 'react';

import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/styles.css';

import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Eye, ReceiptText} from 'lucide-react';
import Image from 'next/image';

interface Props {
  url: string;
}

function SubscriptionVoucher({url}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='group relative overflow-hidden rounded-3xl border bg-card shadow-sm transition hover:shadow-md'>
        {/* image preview */}
        <div className='relative h-52 w-full overflow-hidden bg-muted'>
          <Image src={url} alt='سند الدفع' fill className='h-full w-full object-cover transition duration-300 group-hover:scale-105' />

          <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100'>
            <Button onClick={() => setOpen(true)} variant='secondary' className='rounded-xl'>
              <Eye className='me-2 h-4 w-4' />
              عرض السند
            </Button>
          </div>
        </div>

        {/* footer */}
        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center gap-3'>
            <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10'>
              <ReceiptText className='h-5 w-5 text-primary' />
            </div>

            <div>
              <p className='font-semibold'>سند الدفع</p>

              <p className='text-sm text-muted-foreground'>إثبات الاشتراك</p>
            </div>
          </div>

          <Badge variant='secondary'>مرفق</Badge>
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        plugins={[Zoom]}
        slides={[
          {
            src: url
          }
        ]}
        zoom={{
          maxZoomPixelRatio: 5
        }}
      />
    </>
  );
}

export default SubscriptionVoucher;
