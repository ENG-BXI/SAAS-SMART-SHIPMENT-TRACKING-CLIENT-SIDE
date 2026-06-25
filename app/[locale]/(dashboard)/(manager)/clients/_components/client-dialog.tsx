'use client';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {clientFormData, clientSchema} from '../_schemas/client-schema';
import {Button} from '@/components/ui/button';
import {ArrowRight, File, Loader2, PlusCircle} from 'lucide-react';
import {FieldGroup} from '@/components/ui/field';
import CustomSelect from '@/components/custom-select';
import CustomButton from '@/components/custom-button';
import {zodResolver} from '@hookform/resolvers/zod';
import CustomInput from '@/components/custom-input';
import {useState, useTransition} from 'react';
import {toast} from 'sonner';
import {AddClient, UpdateClient} from '../actions';
import {useTranslations} from 'next-intl';

interface ClientDialogProps {
  type: 'add' | 'edit' | 'view';
  id?: string;
  triggerTitle: string;
  data?: clientFormData;
}
function getTitle(type: 'add' | 'edit' | 'view') {
  switch (type) {
    case 'add':
      return 'add.title';
    case 'edit':
      return 'edit.title';
    case 'view':
      return 'view.title';
  }
}
function getDescription(type: 'add' | 'edit' | 'view') {
  switch (type) {
    case 'add':
      return 'add.description';
    case 'edit':
      return 'edit.description';
    case 'view':
      return 'view.description';
  }
}

function ClientDialog(props: ClientDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const t = useTranslations('clientsPage.dialog');
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<clientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: props.data?.name || '',
      contactWays: props.data?.contactWays || [{text: '', contactType: 'phoneNumber', isPrimary: 'false'}]
    }
  });

  const {fields, append, remove} = useFieldArray({name: 'contactWays', control: control});

  function onSubmit(data: clientFormData) {
    startTransition(async () => {
      let result;
      if (props.type == 'add') {
        result = await AddClient(data);
      } else {
        result = await UpdateClient({id: props.id!, data});
      }
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(result?.message);
        reset();
        setOpen(false);
      }
    });
  }
  const isDisabled = props.type == 'view' || isPending;
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
            <Controller control={control} name='name' render={({field, fieldState: {invalid, error}}) => <CustomInput disabled={isDisabled} type='controller' field={field} error={error} invalid={invalid} required hasLabel label={t('fields.name')} placeHolder={t('placeholders.name')} />} />
            {fields.map((field, index) => (
              <div key={field.id} className='flex items-end gap-x-2'>
                <Controller control={control} name={`contactWays.${index}.text`} render={({field, fieldState: {invalid}}) => <CustomInput disabled={isDisabled} type='controller' field={field} error={undefined} invalid={invalid} required hasLabel label={t('fields.contactWays')} placeHolder={t('placeholders.contactWays')} />} />
                <Controller
                  control={control}
                  name={`contactWays.${index}.contactType`}
                  render={({field, fieldState: {invalid}}) => (
                    <CustomSelect
                      disabled={isDisabled}
                      onChange={field.onChange}
                      value={field.value}
                      ref={field.ref}
                      invalid={invalid}
                      errorMessage={undefined}
                      required
                      label={t('fields.contactType')}
                      placeHolder={t('placeholders.contactType')}
                      options={[
                        {value: 'phoneNumber', label: t('options.contactType.phoneNumber')},
                        {value: 'email', label: t('options.contactType.email')}
                      ]}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`contactWays.${index}.isPrimary`}
                  render={({field, fieldState: {invalid}}) => (
                    <CustomSelect
                      disabled={isDisabled}
                      onChange={field.onChange}
                      value={field.value}
                      ref={field.ref}
                      invalid={invalid}
                      errorMessage={undefined}
                      required
                      label={t('fields.isPrimary')}
                      placeHolder={t('placeholders.isPrimary')}
                      options={[
                        {value: 'true', label: t('options.isPrimary.true')},
                        {value: 'false', label: t('options.isPrimary.false')}
                      ]}
                    />
                  )}
                />
                {props.type !== 'view' && (
                  <Button disabled={isPending} variant={'destructive'} onClick={() => remove(index)}>
                    {t('actions.remove')}
                  </Button>
                )}
              </div>
            ))}
            {props.type !== 'view' && <CustomButton disable={isDisabled} text={t('actions.addContactWay')} icon={<PlusCircle className='min-w-5 min-h-5' />} onClick={() => append({text: '', contactType: 'phoneNumber', isPrimary: 'false'})} className='bg-black text-white' />}
            {fields.length == 0 && errors.contactWays?.root?.message && <p className='text-red-500 text-sm'>{errors.contactWays.root.message}</p>}
            <div className='flex justify-end gap-x-2 mt-2'>
              <DialogClose>
                <CustomButton text={t('actions.cancel')} icon={<ArrowRight className='min-w-5 min-h-5' />} className=' flex-row-reverse' type='secondary' />
              </DialogClose>
              {props.type !== 'view' && <CustomButton disable={isPending} text={isPending ? (props.type === 'add' ? t('add.loading') : t('edit.loading')) : props.type === 'add' ? t('add.button') : t('edit.button')} icon={isPending ? <Loader2 className='animate-spin' /> : <PlusCircle className='min-w-5 min-h-5' />} type='primary' className='bg-black text-white' IsSubmit />}
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ClientDialog;
