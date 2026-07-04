'use client';

import CustomButton from '@/components/custom-button';
import CustomInput from '@/components/custom-input';
import {Button} from '@/components/ui/button';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {FieldGroup} from '@/components/ui/field';
import {zodResolver} from '@hookform/resolvers/zod';
import {ArrowRight, CalendarClock, DollarSign, File, Info, PlusCircle} from 'lucide-react';
import {Controller, useForm} from 'react-hook-form';
import {toast} from 'sonner';
import {useState, useTransition} from 'react';
import {createSubscriptionType, editSubscriptionType} from '../_actions';
import {SubscriptionTypeFormData, subscriptionTypeSchema} from '../_schemas/subscription-schema';
import {useTranslations} from 'next-intl';

type SubscriptionDialogProps = {type: 'add'} | {type: 'edit'; id: string; data: SubscriptionTypeFormData};

function SubscriptionDialog({...props}: SubscriptionDialogProps) {
  const t = useTranslations('adminSubscriptionsPage.dialog');
  const tShared = useTranslations('shared');
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<SubscriptionTypeFormData>({
    resolver: zodResolver(subscriptionTypeSchema),
    defaultValues:
      props.type == 'edit'
        ? props.data
        : {
            type: '',
            price: 1,
            durationByMonth: 1
          }
  });

  function getTitle() {
    switch (props.type) {
      case 'add':
        return t('add.title');
      case 'edit':
        return t('edit.title');
    }
  }

  function getDescription() {
    switch (props.type) {
      case 'add':
        return t('add.description');
      case 'edit':
        return t('edit.description');
    }
  }

  function onSubmit(data: SubscriptionTypeFormData) {
    if (props.type == 'add') {
      startTransition(async () => {
        const {error, message} = await createSubscriptionType(data);
        if (error) toast.error(message);
        else {
          toast.success(message);
          form.reset({
            type: '',
            price: 0,
            durationByMonth: 1
          });
          setOpen(false);
        }
      });
    } else if (props.type == 'edit') {
      startTransition(async () => {
        const {error, message} = await editSubscriptionType(props.id, data);
        if (error) toast.error(message);
        else {
          toast.success(message);
          setOpen(false);
        }
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={e => setOpen(e)}>
      <DialogTrigger asChild>
        {props.type == 'add' ? (
          <Button className='bg-custom-primary-color'>
            <PlusCircle className='min-h-5 min-w-5' /> {getTitle()}
          </Button>
        ) : (
          <Button variant='ghost' className='w-full justify-start text-[15px]'>
            <File className='min-h-6 min-w-6' /> {getTitle()}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <div className='max-w-min rounded-full bg-[#dbecfa] p-2 text-[#175CD3]'>
              <Info />
            </div>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogDescription>{getDescription()}</DialogDescription>
          </DialogHeader>

          <FieldGroup className='mb-3 gap-y-2'>
            <Controller name='type' control={form.control} render={({field, fieldState}) => <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label={t('fields.planType.label')} required placeHolder={t('fields.planType.placeholder')} />} />
            <Controller name='price' control={form.control} render={({field, fieldState}) => <CustomInput disabled={isPending} inputType='number' type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label={t('fields.price.label')} required placeHolder={t('fields.price.placeholder')} />} />
            <Controller name='durationByMonth' control={form.control} render={({field, fieldState}) => <CustomInput disabled={isPending} inputType='number' type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label={t('fields.duration.label')} required placeHolder={t('fields.duration.placeholder')} />} />
          </FieldGroup>

          <div className='mb-4 rounded-lg border border-custom-primary-color/15 bg-[#F3FCF6] p-3'>
            <div className='flex items-start gap-x-2 text-xs leading-relaxed text-[#085D3A]'>
              <CalendarClock className='mt-0.5 h-4 w-4 shrink-0' />
              <p>{t('hints.duration')}</p>
            </div>
            <div className='mt-2 flex items-center gap-x-2 text-xs font-medium text-gray-700'>
              <DollarSign className='h-4 w-4 text-[#1B8354]' />
              {t('hints.price')}
            </div>
          </div>

          <DialogFooter>
            <DialogClose>
              <CustomButton text={tShared('buttons.cancel')} icon={<ArrowRight />} type='secondary' className='flex-row-reverse' />
            </DialogClose>
            <CustomButton disable={isPending} IsSubmit text={props.type == 'add' ? tShared('buttons.add') : tShared('buttons.edit')} icon={<PlusCircle />} className='bg-black' />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SubscriptionDialog;
