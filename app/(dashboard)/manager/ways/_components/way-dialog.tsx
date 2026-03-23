'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {wayFormData, waySchema} from '../_schemas/way-schema';
import {Button} from '@/components/ui/button';
import {ArrowRight, File, PlusCircle} from 'lucide-react';
import {FieldGroup} from '@/components/ui/field';
import CustomButton from '@/components/custom-button';
import {zodResolver} from '@hookform/resolvers/zod';
import CustomInput from '@/components/custom-input';

interface WayDialogProps {
  type: 'add' | 'edit';
  id?: string;
  triggerTitle: string;
  data?: wayFormData;
}
function getTitle(type: 'add' | 'edit') {
  switch (type) {
    case 'add':
      return 'إضافة مسار جديد';
    case 'edit':
      return 'تعديل بيانات المسار';
  }
}
function getDescription(type: 'add' | 'edit') {
  switch (type) {
    case 'add':
      return 'إنشاء مسار شحن جديد من خلال تحديد نقاط المسار بالترتيب الصحيح. يمكن إضافة أكثر من نقطة لتوضيح مسار الحركة واستخدامه لاحقًا في عمليات الشحن.';
    case 'edit':
      return 'تعديل بيانات المسار المسجل مسبقًا وتحديث نقاطه أو ترتيبها حسب الحاجة.';
  }
}
function onSubmit() {
  console.log('submit');
}
function WayDialog(props: WayDialogProps) {
  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm<wayFormData>({
    // TODO Fix This Error
    resolver: zodResolver(waySchema),
    defaultValues: {
      name: props.data?.name || '',
      points: props.data?.points || [{name: '', order: 1}]
    }
  });
  const {fields, append, remove} = useFieldArray({name: 'points', control: control});
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
            <Controller control={control} name='name' render={({field, fieldState: {invalid, error}}) => <CustomInput type='controller' field={field} error={error} invalid={invalid} required hasLabel label='اسم العميل' placeHolder='ادخل اسم العميل' />} />
            {fields.map((field, index) => (
              <div key={field.id} className='flex items-end gap-x-2'>
                <Controller control={control} name={`points.${index}.name`} render={({field, fieldState: {invalid}}) => <CustomInput type='controller' field={field} error={undefined} invalid={invalid} required hasLabel label='اسم النقطة' placeHolder='ادخل اسم النقطة' />} />
                <Controller control={control} name={`points.${index}.order`} render={({field, fieldState: {invalid}}) => <CustomInput type='controller' inputType='number' field={field} error={undefined} invalid={invalid} required label='ترتيب النقطة' placeHolder='ادخل ترتيب النقطة' />} />
                <Button variant={'destructive'} onClick={() => remove(index)}>
                  حذف
                </Button>
              </div>
            ))}
            <CustomButton text='اضافة غرض' icon={<PlusCircle className='min-w-5 min-h-5' />} onClick={() => append({name: '', order: fields.length + 1})} className='bg-black text-white' />
            {fields.length == 0 && errors.points?.root?.message && <p className='text-red-500 text-sm'>{errors.points.root.message}</p>}
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

export default WayDialog;
