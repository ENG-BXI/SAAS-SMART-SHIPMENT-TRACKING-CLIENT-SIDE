'use client';

import {Button} from '@/app/_components/ui/button';
import {Input} from '@/app/_components/ui/input';
import {useRef} from 'react';

function UploadImage() {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className='flex flex-col gap-y-3 w-md'>
      <h3>رفع المرفقات</h3>
      <p className='text-muted-foreground text-sm'>الحد الأقصى لحجم الملف المسموح به هو 2 ميجابايت، وتشمل الصيغ المدعومة .jpg و .png و .pdf.</p>
      {/* {ref.current && ref.current.files && ref.current.files[0].name} */}
      <div className='flex gap-x-3'>
        <Input ref={ref} className='hidden' type='file' />
        <Button onClick={() => ref.current?.click()}>تصفح الملفات</Button>
      </div>
    </div>
  );
}

export default UploadImage;
