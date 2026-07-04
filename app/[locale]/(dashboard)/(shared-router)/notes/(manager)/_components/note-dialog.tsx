'use client';

import {Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Controller, useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import {ArrowRight, File, PlusCircle} from 'lucide-react';
import {FieldGroup} from '@/components/ui/field';
import CustomButton from '@/components/custom-button';
import {zodResolver} from '@hookform/resolvers/zod';
import CustomInput from '@/components/custom-input';
import CustomSelect from '@/components/custom-select';
import {noteFormData, noteSchema} from '../_schemas/note-schema';
import {useState, useTransition} from 'react';
import {CreateNote, UpdateNote} from '../_actions';
import {toast} from 'sonner';
import {NOTE_TYPE, NOTE_TYPE_NAMES} from '@/lib/Constant/note-type';
import {useTranslations} from 'next-intl';

interface NoteDialogProps {
  type: 'add' | 'edit';
  id?: string;
  triggerTitle: string;
  data?: noteFormData;
}
function getTitle(type: 'add' | 'edit') {
  switch (type) {
    case 'add':
      return 'add.title';
    case 'edit':
      return 'edit.title';
  }
}
function getDescription(type: 'add' | 'edit') {
  switch (type) {
    case 'add':
      return 'add.description';
    case 'edit':
      return 'edit.description';
  }
}
function NoteDialog(props: NoteDialogProps) {
  const t = useTranslations('notesPage.dialog');
  const {control, reset, handleSubmit} = useForm<noteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      type: props.data?.type || '',
      text: props.data?.text || ''
    }
  });
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const typeOption = Object.entries(NOTE_TYPE).map(([, val]) => ({label: t(`noteTypes.${val}`), value: val}));

  function onSubmit(data: noteFormData) {
    if (props.type == 'add') {
      startTransition(async () => {
        const {error, message} = await CreateNote(data);
        if (error) toast.error(message);
        else {
          toast.success(message);
          reset();
          setOpen(false);
        }
      });
    } else
      startTransition(async () => {
        if (!props.id) return;
        const {error, message} = await UpdateNote(props.id, data);
        if (error) toast.error(message);
        else {
          toast.success(message);
          reset();
          setOpen(false);
        }
      });
  }
  return (
    <Dialog
      open={open}
      onOpenChange={op => {
        setOpen(op);
      }}
    >
      <DialogTrigger asChild>
        {props.type == 'add' ? (
          <Button className='bg-custom-primary-color'>
            {props.triggerTitle}
            <PlusCircle className='min-w-5 min-h-5' />
          </Button>
        ) : (
          <Button variant={'ghost'} className='w-full justify-start text-[15px]'>
            <File className='min-w-6 min-h-6' /> {props.triggerTitle}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t(getTitle(props.type))}</DialogTitle>
          <DialogDescription>{t(getDescription(props.type))}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className='gap-y-2'>
            <Controller control={control} name='type' render={({field, fieldState: {invalid, error}}) => <CustomSelect disabled={isPending}  onChange={field.onChange} value={field.value.toString()} ref={field.ref} errorMessage={error?.message} invalid={invalid} required label={t('fields.type.label')} placeHolder={t('fields.type.placeholder')} options={typeOption} />} />
            <Controller control={control} name='text' render={({field, fieldState: {invalid, error}}) => <CustomInput disabled={isPending} type='controller' inputType='textarea' field={field} error={error} invalid={invalid} hasLabel label={t('fields.text.label')} placeHolder={t('fields.text.placeholder')} />} />
            <div className='flex justify-end gap-x-2 mt-2'>
              <DialogClose>
                <CustomButton disable={isPending} text={t('actions.cancel')} icon={<ArrowRight className='min-w-5 min-h-5' />} className=' flex-row-reverse' type='secondary' />
              </DialogClose>
              <CustomButton disable={isPending} text={props.type == 'add' ? t('actions.add') : t('actions.edit')} icon={<PlusCircle className='min-w-5 min-h-5' />} type='primary' className='bg-black text-white' IsSubmit />
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NoteDialog;
