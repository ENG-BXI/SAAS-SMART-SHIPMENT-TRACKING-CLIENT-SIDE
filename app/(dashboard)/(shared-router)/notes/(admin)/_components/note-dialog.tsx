'use client';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {ArrowRight, File} from 'lucide-react';
import {FieldGroup} from '@/components/ui/field';
import CustomButton from '@/components/custom-button';
import CustomInput from '@/components/custom-input';
import CustomSelect from '@/components/custom-select';
import {useState} from 'react';
import {noteFormData} from '@/app/(dashboard)/(shared-router)/notes/(manager)/_schemas/note-schema';

interface NoteDialogProps {
  data?: noteFormData;
}

function NoteDialog(props: NoteDialogProps) {
  const [CreatedDate, setCreatedDate] = useState(props.data?.createdDate || '');
  const [type, setType] = useState(props.data?.type || '');
  const [note, setNote] = useState(props.data?.note || '');
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className='w-full justify-start text-[15px]'>
          <File className='min-w-6 min-h-6' /> عرض التفاصيل
        </Button>
      </DialogTrigger>
      <DialogContent dir='rtl'>
        <DialogHeader>
          <DialogTitle>تفاصيل الملاحظة</DialogTitle>
          <DialogDescription>عرض تفاصيل الملاحظة</DialogDescription>
        </DialogHeader>
        <form>
          <FieldGroup className='gap-y-2'>
            {/* //TODO : Covert This to Calendar */}
            <CustomInput type='state' value={CreatedDate} setValue={setCreatedDate} disabled required hasLabel label='تاريخ الانشاء' placeHolder='ادخل تاريخ الانشاء' />

            <CustomSelect
              value={type}
              onChange={setType}
              disabled
              required
              label='نوع الملاحظة'
              placeHolder='اختر نوع الملاحظة'
              options={[
                {value: 'شكوى', label: 'شكوى'},
                {value: 'استفسار', label: 'استفسار'},
                {value: 'اقتراح', label: 'اقتراح'},
                {value: 'اخري', label: 'اخري'}
              ]}
            />

            <CustomInput type='state' inputType='textarea' value={note} setValue={setNote} disabled required hasLabel label='الملاحظة' placeHolder='ادخل الملاحظة' />
            <div className='flex justify-end gap-x-2 mt-2'>
              <DialogClose>
                <CustomButton text='اغلاق' icon={<ArrowRight className='min-w-5 min-h-5' />} className=' flex-row-reverse' type='secondary' />
              </DialogClose>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NoteDialog;
