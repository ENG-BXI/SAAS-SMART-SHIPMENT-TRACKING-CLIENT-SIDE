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
import {CreateWay, UpdateWays} from '../_actions';
import Cookies from 'universal-cookie';
import {toast} from 'sonner';
import {useTranslations} from 'next-intl';

interface WayDialogProps {
  type: 'add' | 'edit';
  id?: string;
  triggerTitle: string;
  data?: wayFormData;
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

interface Props {
  ['data-id']?: string;
}
function WayDialog(props: WayDialogProps) {
  const [isPending, startTransitions] = useTransition();
  const [open, setOpen] = useState(false);
  const t = useTranslations('waysPage.dialog');
  const cookie = new Cookies();
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors}
  } = useForm<wayFormData>({
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
    if (props.type == 'add') {
      startTransitions(async () => {
        const {error, message} = await CreateWay(token, data);
        if (!error) {
          toast.success(message);
          setOpen(false);
        } else {
          toast.error(message);
        }
      });
    } else {
      startTransitions(async () => {
        if (!props.id) return;
        const {error, message} = await UpdateWays(props.id, token, data);
        if (!error) {
          toast.success(message);
          setOpen(false);
        } else {
          toast.error(message);
        }
      });
    }
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t(getTitle(props.type))}</DialogTitle>
          <DialogDescription>{t(getDescription(props.type))}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className='gap-y-2'>
            <Controller control={control} name='name' render={({field, fieldState: {invalid, error}}) => <CustomInput disabled={isPending} type='controller' field={field} error={error} invalid={invalid} required hasLabel label={t('fields.name')} placeHolder={t('placeholders.name')} />} />
            <ReorderList withDragHandle onReorderFinish={handleReorderFinish} itemClassName='rounded-lg'>
              {fields.map((field, index) => (
                <div key={field.id} data-id={field.id} className='flex items-end gap-x-2'>
                  <Controller control={control} name={`points.${index}.name`} render={({field, fieldState: {invalid}}) => <CustomInput disabled={isPending} type='controller' field={field} error={undefined} invalid={invalid} required hasLabel label={t('fields.pointName')} placeHolder={t('placeholders.pointName')} />} />
                  <Controller control={control} name={`points.${index}.order`} render={({field, fieldState: {invalid}}) => <CustomInput disabled={isPending} type='controller' inputType='number' field={field} error={undefined} invalid={invalid} required label={t('fields.pointOrder')} placeHolder={t('placeholders.pointOrder')} />} />
                  <Button disabled={isPending} variant={'destructive'} onClick={() => remove(index)}>
                    {t('actions.remove')}
                  </Button>
                </div>
              ))}
            </ReorderList>
            <CustomButton disable={isPending} text={t('actions.addPoint')} icon={<PlusCircle className='min-w-5 min-h-5' />} onClick={() => append({name: '', order: fields.length + 1})} className='bg-black text-white' />
            {fields.length == 0 && errors.points?.root?.message && <p className='text-red-500 text-sm'>{errors.points.root.message}</p>}
            <div className='flex justify-end gap-x-2 mt-2'>
              <DialogClose>
                <CustomButton disable={isPending} text={t('actions.cancel')} icon={<ArrowRight className='min-w-5 min-h-5' />} className=' flex-row-reverse' type='secondary' />
              </DialogClose>
              <CustomButton disable={isPending} text={props.type == 'add' ? (isPending ? t('add.loading') : t('add.button')) : isPending ? t('edit.loading') : t('edit.button')} icon={<PlusCircle className='min-w-5 min-h-5' />} type='primary' className='bg-black text-white' IsSubmit />
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default WayDialog;
