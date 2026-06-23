'use client';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {ArrowRight, File} from 'lucide-react';
import {FieldGroup} from '@/components/ui/field';
import CustomButton from '@/components/custom-button';
import CustomInput from '@/components/custom-input';
import CustomSelect from '@/components/custom-select';
import {useState} from 'react';
import { useTranslations } from 'next-intl';
import {noteFormData} from '@/app/[locale]/(dashboard)/(shared-router)/notes/(manager)/_schemas/note-schema';
import {NOTE_TYPE, NOTE_TYPE_NAMES} from '@/lib/Constant/note-type';

interface NoteDialogProps {
  data?: noteFormData;
}

function NoteDialog(props: NoteDialogProps) {
  const t = useTranslations('adminNotesPage.dialog');
  const [type, setType] = useState(props.data?.type || '');
  const [note, setNote] = useState(props.data?.text || '');
  const typeOption = Object.entries(NOTE_TYPE).map(([, val]) => ({label: NOTE_TYPE_NAMES[val], value: val}));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className='w-full justify-start text-[15px]'>
          <File className='min-w-6 min-h-6' /> {t('viewDetails')}
        </Button>
      </DialogTrigger>
      <DialogContent dir='ltr'>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <form>
          <FieldGroup className='gap-y-2'>
            <CustomSelect value={type} onChange={setType} disabled required label={t('field.type')} placeHolder={t('field.typePlaceholder')} options={typeOption} />
            <CustomInput type='state' inputType='textarea' value={note} setValue={setNote} disabled required hasLabel label={t('field.note')} placeHolder={t('field.notePlaceholder')} />
            <div className='flex justify-end gap-x-2 mt-2'>
              <DialogClose>
                <CustomButton text={t('close')} icon={<ArrowRight className='min-w-5 min-h-5' />} className=' flex-row-reverse' type='secondary' />
              </DialogClose>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NoteDialog;
