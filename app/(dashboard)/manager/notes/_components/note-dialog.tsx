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

interface NoteDialogProps {
  type: 'add' | 'edit';
  id?: string;
  triggerTitle: string;
  data?: noteFormData;
}
function getTitle(type: 'add' | 'edit') {
  switch (type) {
    case 'add':
      return 'إضافة مستخدم جديد';
    case 'edit':
      return 'تعديل بيانات المستخدم';
  }
}
function getDescription(type: 'add' | 'edit') {
  switch (type) {
    case 'add':
      return 'إضافة مستخدم جديد إلى النظام وتحديد دوره وصلاحياته. سيتمكن المستخدم من الوصول إلى الميزات المسموح له بها حسب الدور المحدد.';
    case 'edit':
      return 'تعديل بيانات المستخدم المسجل مسبقًا وتحديث دوره وصلاحياته.';
  }
}
function onSubmit() {
  console.log('submit');
}
function NoteDialog(props: NoteDialogProps) {
  const {control, handleSubmit} = useForm<noteFormData>({
    // TODO Fix This Error
    resolver: zodResolver(noteSchema),
    defaultValues: {
      createdDate: props.data?.createdDate || '',
      type: props.data?.type || '',
      note: props.data?.note || ''
    }
  });
  return (
    <Dialog>
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
      <DialogContent dir='rtl'>
        <DialogHeader>
          <DialogTitle>{getTitle(props.type)}</DialogTitle>
          <DialogDescription>{getDescription(props.type)}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className='gap-y-2'>
            {/* //TODO : Covert This to Calendar */}
            <Controller control={control} name='createdDate' render={({field, fieldState: {invalid, error}}) => <CustomInput type='controller' field={field} error={error} invalid={invalid} required hasLabel label='تاريخ الانشاء' placeHolder='ادخل تاريخ الانشاء' />} />
            <Controller
              control={control}
              name='type'
              render={({field, fieldState: {invalid, error}}) => (
                <CustomSelect
                  onChange={field.onChange}
                  value={field.value.toString()}
                  ref={field.ref}
                  errorMessage={error?.message}
                  invalid={invalid}
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
              )}
            />
            <Controller control={control} name='note' render={({field, fieldState: {invalid, error}}) => <CustomInput type='controller' inputType='textarea' field={field} error={error} invalid={invalid} hasLabel label='الملاحظة' placeHolder='ادخل الملاحظة' />} />
            <div className='flex justify-end gap-x-2 mt-2'>
              <DialogClose>
                <CustomButton text='الغاء' icon={<ArrowRight className='min-w-5 min-h-5' />} className=' flex-row-reverse' type='secondary' />
              </DialogClose>
              <CustomButton text={props.type == 'add' ? 'اضافة' : 'تعديل'} icon={<PlusCircle className='min-w-5 min-h-5' />} type='primary' className='bg-black text-white' IsSubmit />
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NoteDialog;
