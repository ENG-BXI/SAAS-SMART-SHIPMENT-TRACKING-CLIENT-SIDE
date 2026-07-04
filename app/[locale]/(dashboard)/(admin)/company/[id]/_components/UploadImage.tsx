'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useRef} from 'react';
import { useTranslations } from 'next-intl';

function UploadImage() {
  const t = useTranslations('shared.uploadImage');
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className='flex flex-col gap-y-3 w-md'>
      <h3>{t('title')}</h3>
      <p className='text-muted-foreground text-sm'>{t('description')}</p>
      {/* {ref.current && ref.current.files && ref.current.files[0].name} */}
      <div className='flex gap-x-3'>
        <Input ref={ref} className='hidden' type='file' />
        <Button onClick={() => ref.current?.click()}>{t('browseFiles')}</Button>
      </div>
    </div>
  );
}

export default UploadImage;
