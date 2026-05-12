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
import GetAllClientForSelect from '../_services/get-all-client-for-select';
import {useState, useTransition} from 'react';
import {CreateShipmentItem} from '../_actions';
import {toast} from 'sonner';

interface ShipmentItemDialogProps {
  type: 'add' | 'edit';
  shipmentId?: string;
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
function ShipmentItemDialog(props: ShipmentItemDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<shipmentItemFormData>({
    resolver: zodResolver(shipmentItems),
    defaultValues: {
      clientId: props.data?.clientId,
      items: props.data?.items
    }
  });
  function onSubmit(data: shipmentItemFormData) {
    if (!props.shipmentId) return;
    console.log(data);
    if (props.type == 'add') {
      startTransition(async () => {
        const {message, error} = await CreateShipmentItem(props.shipmentId!, data);
        if (error) toast.error(message);
        else {
          toast.success(message);
          reset();
          setOpen(false);
        }
      });
    } else {
    }
  }
  const {fields, append, remove} = useFieldArray({name: 'items', control: control});
  const {data, isLoading, isError, error: remoteError} = GetAllClientForSelect();
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
            <Controller control={control} name='clientId' render={({field, fieldState: {invalid, error}}) => <CustomSelect isLoading={isLoading} isError={isError} errorMessage={error?.message || remoteError?.message} onChange={field.onChange} value={field.value} ref={field.ref} invalid={invalid} required label='اسم العميل' placeHolder='اختر العميل' options={data || []} />} />
            {fields.map((field, index) => (
              <div key={field.id} className='flex items-end gap-x-2'>
                <Controller control={control} name={`items.${index}.name`} render={({field, fieldState: {invalid}}) => <CustomInput disabled={isPending} type='controller' field={field} error={undefined} invalid={invalid} required hasLabel label='الغرض' placeHolder='ادخل الغرض' />} />
                <Controller control={control} name={`items.${index}.quantity`} render={({field, fieldState: {invalid}}) => <CustomInput disabled={isPending} type='controller' inputType='number' field={field} error={undefined} invalid={invalid} required hasLabel label='الكمية' placeHolder='ادخل الكمية' />} />
                <Controller
                  control={control}
                  name={`items.${index}.isBreakable`}
                  render={({field, fieldState: {invalid}}) => (
                    <CustomSelect
                      disabled={isPending}
                      onChange={v => field.onChange(v == 'true')}
                      value={field.value ? 'true' : 'false'}
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
                <Button disabled={isPending} variant={'destructive'} onClick={() => remove(index)}>
                  حذف
                </Button>
              </div>
            ))}
            <CustomButton disable={isPending} text='اضافة غرض' icon={<PlusCircle className='min-w-5 min-h-5' />} onClick={() => append({name: '', quantity: 0, isBreakable: false})} className='bg-black text-white' />
            {fields.length == 0 && errors.items?.root?.message && <p className='text-red-500 text-sm'>{errors.items.root.message}</p>}
            <div className='flex justify-end gap-x-2 mt-2'>
              <DialogClose>
                <CustomButton disable={isPending} text='الغاء' icon={<ArrowRight className='min-w-5 min-h-5' />} className=' flex-row-reverse' type='secondary' />
              </DialogClose>
              <CustomButton disable={isPending} text={isPending ? 'جاري ' + (props.type == 'add' ? 'اضافة' : 'تعديل') :  props.type == 'add' ? 'اضافة' : 'تعديل'} icon={<PlusCircle className='min-w-5 min-h-5' />} type='primary' className='bg-black text-white' IsSubmit />
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ShipmentItemDialog;
