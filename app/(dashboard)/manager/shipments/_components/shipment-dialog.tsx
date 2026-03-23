'use client'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Controller, useForm} from 'react-hook-form';
import {FieldGroup} from '@/components/ui/field';
import CustomInput from '@/components/custom-input';
import {zodResolver} from '@hookform/resolvers/zod';
import {shipmentFormData, shipmentSchema} from '../_schema/shipment-schema';
import {ArrowRight, File, PlusCircle} from 'lucide-react';
import CustomButton from '@/components/custom-button';
import CustomSelect from '@/components/custom-select';
interface IShipment {
  shipmentNumber: string;
  way: string;
  shipmentDriver: string;
}
interface ShipmentDialogProps {
  type: 'add' | 'edit';
  id?: string;
  data?: IShipment;
}
function getTitle(type: 'add' | 'edit') {
  switch (type) {
    case 'add':
      return 'اضافة شحنة جديدة';
    case 'edit':
      return 'تعديل شحنة';
  }
}
function getDescription(type: 'add' | 'edit') {
  switch (type) {
    case 'add':
      return 'تسجيل شحنة جديدة وتحديد العميل والمسار لبدء التتبع.';
    case 'edit':
      return 'تعديل بيانات الشحنة وتحديث حالتها أو نقاط التتبع.';
  }
}

function onSubmit() {
  console.log('submit');
}
function ShipmentDialog(props: ShipmentDialogProps) {
  const {control, handleSubmit} = useForm<shipmentFormData>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      shipmentNumber: props.data?.shipmentNumber || '',
      way: props.data?.way || '0',
      shipmentDriver: props.data?.shipmentDriver || '0'
    }
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        {props.type == 'add' ? (
          <Button className='bg-custom-primary-color'>
            <PlusCircle className='min-w-5 min-h-5' /> {getTitle(props.type)}
          </Button>
        ) : (
          <Button variant={'ghost'} className='w-full justify-start text-[15px]'>
            <File className='min-w-6 min-h-6' /> {getTitle(props.type)}
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
            <Controller control={control} name='shipmentNumber' render={({field, fieldState: {invalid, error}}) => <CustomInput type='controller' field={field} error={error} invalid={invalid} required hasLabel label='رقم الشحنة' placeHolder='ادخل رقم الشحنة' />} />
            <Controller
              control={control}
              name='way'
              render={({field, fieldState: {invalid, error}}) => {
                return (
                  <CustomSelect
                    onChange={field.onChange}
                    value={field.value}
                    ref={field.ref}
                    invalid={invalid}
                    errorMessage={error?.message}
                    placeHolder='اختر المسار'
                    required
                    label='مسار الشحنة'
                    options={[
                      {value: '1', label: 'المسار 1'},
                      {value: '2', label: 'المسار 2'},
                      {value: '3', label: 'المسار 3'}
                    ]}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name='shipmentDriver'
              render={({field, fieldState: {invalid, error}}) => {
                return (
                  <CustomSelect
                    onChange={field.onChange}
                    value={field.value}
                    ref={field.ref}
                    invalid={invalid}
                    errorMessage={error?.message}
                    placeHolder='اختر السائق'
                    required
                    label='سائق الشحنة'
                    options={[
                      {value: '1', label: 'السائق 1'},
                      {value: '2', label: 'السائق 2'},
                      {value: '3', label: 'السائق 3'}
                    ]}
                  />
                );
              }}
            />
            <div className='flex justify-end gap-x-2'>
              <DialogClose>
                <CustomButton text='الغاء' icon={<ArrowRight className='min-w-5 min-h-5' />} className=' flex-row-reverse' type='secondary' />
              </DialogClose>
              <CustomButton text='اضافة شحنة' icon={<PlusCircle className='min-w-5 min-h-5' />} type='primary' className='bg-black text-white' IsSubmit />
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ShipmentDialog;
