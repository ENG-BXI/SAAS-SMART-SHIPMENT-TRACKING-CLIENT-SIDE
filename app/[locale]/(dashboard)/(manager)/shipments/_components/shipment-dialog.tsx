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
import {AddShipmentAction, UpdateShipmentAction} from '../actions';
import {useState, useTransition} from 'react';
import {toast} from 'sonner';
import useGetAllWaysAsOptions from '../services/get-all-ways-as-options';
import useGetAllDriversAsOptions from '../services/get-all-driver-as-options';
import CustomCalender from '@/components/custom-calender';
import { useTranslations } from 'next-intl';
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

function ShipmentDialog(props: ShipmentDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const t = useTranslations('shipments.dialog');
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
    else {
      startTransition(async () => {
        if (!props.id) return;
        const { message, error } = await UpdateShipmentAction(props.id,data);
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
            <PlusCircle className='min-w-5 min-h-5' /> {t(getTitle(props.type))}
          </Button>
        ) : (
          <Button variant={'ghost'} className='w-full justify-start text-[15px]'>
            <File className='min-w-6 min-h-6' /> {t(getTitle(props.type))}
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
            <Controller control={control} name='shipmentNumber' render={({field, fieldState: {invalid, error}}) => <CustomInput disabled={isPending} type='controller' field={field} error={error} invalid={invalid} required hasLabel label={t('fields.shipmentNumber')} placeHolder={t('placeholders.shipmentNumber')} />} />
            <Controller
              control={control}
              name='wayId'
              render={({field, fieldState: {invalid, error}}) => {
                return <CustomSelect disabled={isPending} onChange={field.onChange} value={field.value} ref={field.ref} invalid={invalid} isLoading={wayIsLoading} isError={isWayError} error={wayError?.message} errorMessage={error?.message} required label={t('fields.way')} placeHolder={t('placeholders.way')} options={ways || []} />;
              }}
            />
            <Controller
              control={control}
              name='driverId'
              render={({field, fieldState: {invalid, error}}) => {
                return <CustomSelect disabled={isPending} isLoading={driverIsLoading} isError={isDriverError} error={driverError?.message} onChange={field.onChange} value={field.value} ref={field.ref} invalid={invalid} errorMessage={error?.message} required label={t('fields.driver')} placeHolder={t('placeholders.driver')} options={drivers || []} />;
              }}
            />
            <Controller
              control={control}
              name='launchDate'
              render={({field, fieldState: {invalid, error}}) => {
                return <CustomCalender disabled={isPending} value={field.value} onChange={field.onChange} invalid={invalid} errorMessage={error?.message} required label={t('fields.launchDate')} placeHolder={t('placeholders.launchDate')} />;
              }}
            />
            <div className='flex justify-end gap-x-2'>
              <DialogClose>
                <CustomButton text={t('actions.cancel')} icon={<ArrowRight className='min-w-5 min-h-5' />} className='flex-row-reverse' type='secondary' />
              </DialogClose>
              <CustomButton disable={isPending} text={props.type === 'add' ? (isPending ? t('add.loading') : t('add.button')) : isPending ? t('edit.loading') : t('edit.button')} icon={<PlusCircle className='min-w-5 min-h-5' />} type='primary' className='bg-black text-white' IsSubmit />
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ShipmentDialog;
