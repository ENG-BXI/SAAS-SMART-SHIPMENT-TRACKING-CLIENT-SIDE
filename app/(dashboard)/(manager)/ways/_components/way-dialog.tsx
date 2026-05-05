'use client';

import {Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {wayFormData, waySchema} from '../_schemas/way-schema';
import {Button} from '@/components/ui/button';
import {ArrowRight, File, PlusCircle} from 'lucide-react';
import {FieldGroup} from '@/components/ui/field';
import CustomButton from '@/components/custom-button';
import {zodResolver} from '@hookform/resolvers/zod';
import CustomInput from '@/components/custom-input';
import {ReorderList} from '@/components/shadix-ui/components/reorder-list';
import {useState, useTransition} from 'react';
import {CreateWay} from '../_actions';
import Cookies from 'universal-cookie';
import { toast } from 'sonner';

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

interface Props {
  ['data-id']?: string;
}
const cookie = new Cookies();
function WayDialog(props: WayDialogProps) {
  const [isPending, startTransitions] = useTransition();
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors}
  } = useForm<wayFormData>({
    // TODO Fix This Error
    resolver: zodResolver(waySchema),
    defaultValues: {
      name: props.data?.name || '',
      points: props.data?.points || [{name: '', order: 1}]
    }
  });
  const {fields, append, remove, replace} = useFieldArray({name: 'points', control: control});

  const token = cookie.get('token');
  function handleReorderFinish(reorderedElements: React.ReactElement[]) {
    const currentPoints = getValues('points');

    const newPoints = reorderedElements.map((el, index) => {
      console.log(el);
      const fieldId = (el.props as Props)['data-id'];
      const fieldIndex = fields.findIndex(f => f.id === fieldId);
      return {
        ...currentPoints[fieldIndex],
        order: index + 1
      };
    });

    replace(newPoints);
  }
  async function onSubmit(data: wayFormData) {
    startTransitions(async () => {
      const {error, message, } = await CreateWay(token, data);
      if (!error) {
        toast.success(message);
        setOpen(false);
      } else {
        toast.error(message);
      }
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Controller control={control} name='name' render={({field, fieldState: {invalid, error}}) => <CustomInput disabled={isPending} type='controller' field={field} error={error} invalid={invalid} required hasLabel label='اسم العميل' placeHolder='ادخل اسم العميل' />} />
            <ReorderList withDragHandle onReorderFinish={handleReorderFinish} itemClassName='rounded-lg'>
              {fields.map((field, index) => (
                <div key={field.id} data-id={field.id} className='flex items-end gap-x-2'>
                  <Controller control={control} name={`points.${index}.name`} render={({field, fieldState: {invalid}}) => <CustomInput disabled={isPending}  type='controller' field={field} error={undefined} invalid={invalid} required hasLabel label='اسم النقطة' placeHolder='ادخل اسم النقطة' />} />
                  <Controller control={control} name={`points.${index}.order`} render={({field, fieldState: {invalid}}) => <CustomInput disabled={isPending} type='controller' inputType='number' field={field} error={undefined} invalid={invalid} required label='ترتيب النقطة' placeHolder='ادخل ترتيب النقطة' />} />
                  <Button disabled={isPending} variant={'destructive'} onClick={() => remove(index)}>
                    حذف
                  </Button>
                </div>
              ))}
            </ReorderList>
            <CustomButton disable={isPending} text='اضافة غرض' icon={<PlusCircle className='min-w-5 min-h-5' />} onClick={() => append({name: '', order: fields.length + 1})} className='bg-black text-white' />
            {fields.length == 0 && errors.points?.root?.message && <p className='text-red-500 text-sm'>{errors.points.root.message}</p>}
            <div className='flex justify-end gap-x-2 mt-2'>
              <DialogClose>
                <CustomButton disable={isPending} text='الغاء' icon={<ArrowRight className='min-w-5 min-h-5' />} className=' flex-row-reverse' type='secondary' />
              </DialogClose>
              <CustomButton disable={isPending} text={props.type == 'add' ? (isPending ? 'جاري الاضافة...' : 'اضافة') : isPending ? 'جاري التعديل...' : 'تعديل'} icon={<PlusCircle className='min-w-5 min-h-5' />} type='primary' className='bg-black text-white' IsSubmit />
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default WayDialog;
