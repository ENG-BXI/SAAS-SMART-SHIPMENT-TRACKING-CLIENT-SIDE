'use client';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose} from '@/components/ui/dialog';
import {shipmentItemFormData, shipmentItems} from '../_schemas/shipment-item';
import CustomInput from '@/components/custom-input';
import CustomSelect from '@/components/custom-select';
import {Button} from '@/components/ui/button';
import {FieldGroup} from '@/components/ui/field';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {ArrowRight, File, PlusCircle} from 'lucide-react';
import CustomButton from '@/components/custom-button';

interface ShipmentItemDialogProps {
  type: 'add' | 'edit';
  id?: string;
  triggerTitle: string;
  data?: shipmentItemFormData;
}
function getTitle(type: 'add' | 'edit') {
  switch (type) {
    case 'add':
      return 'تحديد العميل ومحتويات الشحنة';
    case 'edit':
      return 'تعديل بيانات العميل ومحتويات الشحنة';
  }
}
function getDescription(type: 'add' | 'edit') {
  switch (type) {
    case 'add':
      return 'اختيار عميل مسجل مسبقًا وربطه بهذه الشحنة، مع تحديد أغراض الشحنة وإمكانية إضافة أكثر من غرض حسب الحاجة.';
    case 'edit':
      return 'تعديل بيانات العميل المسجل مسبقًا وربطه بهذه الشحنة، مع تحديد أغراض الشحنة وإمكانية إضافة أكثر من غرض حسب الحاجة.';
  }
}
function onSubmit() {
  console.log('submit');
}
function ShipmentItemDialog(props: ShipmentItemDialogProps) {
  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm<shipmentItemFormData>({
    //TODO : Fix This Error
    resolver: zodResolver(shipmentItems),
    defaultValues: {
      personName: props.data?.personName || '',
      items: props.data?.items || [{item: '', quantity: 0, isBreakable: 'false'}]
    }
  });
  const {fields, append, remove} = useFieldArray({name: 'items', control: control});
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
            <Controller
              control={control}
              name='personName'
              render={({field, fieldState: {invalid, error}}) => (
                <CustomSelect
                  onChange={field.onChange}
                  value={field.value}
                  ref={field.ref}
                  invalid={invalid}
                  errorMessage={error?.message}
                  required
                  label='اسم العميل'
                  placeHolder='اختر العميل'
                  options={[
                    {value: '1', label: 'العميل 1'},
                    {value: '2', label: 'العميل 2'},
                    {value: '3', label: 'العميل 3'}
                  ]}
                />
              )}
            />
            {fields.map((field, index) => (
              <div key={field.id} className='flex items-end gap-x-2'>
                <Controller control={control} name={`items.${index}.item`} render={({field, fieldState: {invalid}}) => <CustomInput type='controller' field={field} error={undefined} invalid={invalid} required hasLabel label='الغرض' placeHolder='ادخل الغرض' />} />
                <Controller control={control} name={`items.${index}.quantity`} render={({field, fieldState: {invalid}}) => <CustomInput type='controller' inputType='number' field={field} error={undefined} invalid={invalid} required hasLabel label='الكمية' placeHolder='ادخل الكمية' />} />
                <Controller
                  control={control}
                  name={`items.${index}.isBreakable`}
                  render={({field, fieldState: {invalid}}) => (
                    <CustomSelect
                      onChange={field.onChange}
                      value={field.value}
                      ref={field.ref}
                      invalid={invalid}
                      errorMessage={undefined}
                      required
                      label='قابل للكسر'
                      placeHolder='اختر قابل للكسر'
                      options={[
                        {value: 'true', label: 'نعم'},
                        {value: 'false', label: 'لا'}
                      ]}
                    />
                  )}
                />
                <Button variant={'destructive'} onClick={() => remove(index)}>
                  حذف
                </Button>
              </div>
            ))}
            <CustomButton text='اضافة غرض' icon={<PlusCircle className='min-w-5 min-h-5' />} onClick={() => append({item: '', quantity: 0, isBreakable: 'false'})} className='bg-black text-white' />
            {fields.length == 0 && errors.items?.root?.message && <p className='text-red-500 text-sm'>{errors.items.root.message}</p>}
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

export default ShipmentItemDialog;
