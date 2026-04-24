'use client';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Controller, useForm} from 'react-hook-form';
import {FieldGroup} from '@/components/ui/field';
import CustomInput from '@/components/custom-input';
import {zodResolver} from '@hookform/resolvers/zod';
import {shipmentFormData, shipmentSchema} from '../_schema/shipment-schema';
import {ArrowRight, File, PlusCircle} from 'lucide-react';
import CustomButton from '@/components/custom-button';
import CustomSelect from '@/components/custom-select';
import {AddShipmentAction} from '../actions';
import {useState, useTransition} from 'react';
import {toast} from 'sonner';
import useGetAllWaysAsOptions from '../services/get-all-ways-as-options';
import useGetAllDriversAsOptions from '../services/get-all-driver-as-options';
import CustomCalender from '@/components/custom-calender';
interface IShipment {
  shipmentNumber: string;
  wayId: string;
  driverId: string;
  launchDate: string;
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

function ShipmentDialog(props: ShipmentDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const {control, handleSubmit, reset} = useForm<shipmentFormData>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      shipmentNumber: props.data?.shipmentNumber || '',
      wayId: props.data?.wayId || '',
      driverId: props.data?.driverId || '',
      launchDate: new Date(props.data?.launchDate ?? new Date().toISOString())
    }
  });
  async function onSubmit(data: shipmentFormData) {
    if (props.type == 'add') {
      startTransition(async () => {
        const { message, error } = await AddShipmentAction(data);
        if (error) {
          toast.error(error);
        } else {
          toast.success(message);
          setOpen(false);
          reset();
        }
      });
    }
  }
  const {data: ways, isLoading: wayIsLoading, isError: isWayError, error: wayError} = useGetAllWaysAsOptions(open);
  const {data: drivers, isLoading: driverIsLoading, isError: isDriverError, error: driverError} = useGetAllDriversAsOptions(open);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Controller control={control} name='shipmentNumber' render={({field, fieldState: {invalid, error}}) => <CustomInput disabled={isPending} type='controller' field={field} error={error} invalid={invalid} required hasLabel label='رقم الشحنة' placeHolder='ادخل رقم الشحنة' />} />
            <Controller
              control={control}
              name='wayId'
              render={({field, fieldState: {invalid, error}}) => {
                return <CustomSelect disabled={isPending} onChange={field.onChange} value={field.value} ref={field.ref} invalid={invalid} isLoading={wayIsLoading} isError={isWayError} error={wayError?.message} errorMessage={error?.message} placeHolder='اختر المسار' required label='مسار الشحنة' options={ways || []} />;
              }}
            />
            <Controller
              control={control}
              name='driverId'
              render={({field, fieldState: {invalid, error}}) => {
                return <CustomSelect disabled={isPending} isLoading={driverIsLoading} isError={isDriverError} error={driverError?.message} onChange={field.onChange} value={field.value} ref={field.ref} invalid={invalid} errorMessage={error?.message} placeHolder='اختر السائق' required label='سائق الشحنة' options={drivers || []} />;
              }}
            />
            <Controller
              control={control}
              name='launchDate'
              render={({field, fieldState: {invalid, error}}) => {
                return <CustomCalender disabled={isPending} value={field.value} onChange={field.onChange} invalid={invalid} errorMessage={error?.message} required label='تاريخ الانطلاق' placeHolder='ادخل تاريخ الانطلاق' />;
              }}
            />
            <div className='flex justify-end gap-x-2'>
              <DialogClose>
                <CustomButton text='الغاء' icon={<ArrowRight className='min-w-5 min-h-5' />} className=' flex-row-reverse' type='secondary' />
              </DialogClose>
              <CustomButton disable={isPending} text={isPending ? '....جاري الاضافة' : 'اضافة شحنة'} icon={<PlusCircle className='min-w-5 min-h-5' />} type='primary' className='bg-black text-white' IsSubmit />
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ShipmentDialog;
