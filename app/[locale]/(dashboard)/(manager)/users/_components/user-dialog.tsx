'use client';

import {Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Controller, useForm} from 'react-hook-form';
import {createUserSchema, createUserFormData, editUserSchema, editUserFormData} from '../_schemas/user-schema';
import {Button} from '@/components/ui/button';
import {ArrowRight, File, PlusCircle} from 'lucide-react';
import {FieldGroup} from '@/components/ui/field';
import CustomButton from '@/components/custom-button';
import {zodResolver} from '@hookform/resolvers/zod';
import CustomInput from '@/components/custom-input';
import {enUserRole, userRoleName} from '@/lib/Constant/user-role';
import CustomSelect from '@/components/custom-select';
import {useState, useTransition} from 'react';
import {CreateUser, UpdateUser} from '../_actions';
import {toast} from 'sonner';
import { useTranslations } from 'next-intl';

interface UserDialogProps {
  type: 'add' | 'edit';
  id?: string;
  triggerTitle: string;
  data?: createUserFormData | editUserFormData;
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
function UserDialog(props: UserDialogProps) {
  const schema = props.type == 'add' ? createUserSchema : editUserSchema;
  const [open, setOpen] = useState(false);
  const t = useTranslations('usersPage.dialog');
  const {control, handleSubmit, reset} = useForm<createUserFormData | editUserFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: props.data?.name || '',
      email: props.data?.email || '',
      role: props.data?.role || enUserRole.EMPLOYEE
    }
  });
  const [isPending, startTransition] = useTransition();
  function onSubmit(data: createUserFormData | editUserFormData) {
    if (props.type == 'add') {
      startTransition(async () => {
        const {message, error} = await CreateUser(data as createUserFormData);
        if (error) toast.error(message);
        else {
          toast.success(message);
          reset();
          setOpen(false);
        }
      });
    } else
      startTransition(async () => {
        if (!props.id) return;
        const {message, error} = await UpdateUser(props.id, data as editUserFormData);
        if (error) toast.error(message);
        else {
          toast.success(message);
          reset();
          setOpen(false);
        }
      });
  }
  return (
    <Dialog
      open={open}
      onOpenChange={op => {
        setOpen(op);
      }}
    >
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
            <Controller control={control} name='name' render={({field, fieldState: {invalid, error}}) => <CustomInput type='controller' disabled={isPending} field={field} error={error} invalid={invalid} required hasLabel label={t('fields.name.label')} placeHolder={t('fields.name.placeholder')} />} />
            <Controller control={control} name='email' render={({field, fieldState: {invalid, error}}) => <CustomInput type='controller' disabled={isPending} field={field} error={error} invalid={invalid} required hasLabel label={t('fields.email.label')} placeHolder={t('fields.email.placeholder')} />} />
            <Controller control={control} name='password' render={({field, fieldState: {invalid, error}}) => <CustomInput type='controller' disabled={isPending} field={field} error={error} invalid={invalid} required hasLabel label={t('fields.password.label')} placeHolder={t('fields.password.placeholder')} />} />
            <Controller
              control={control}
              name='role'
              render={({field, fieldState: {invalid, error}}) => (
                <CustomSelect
                  // Because Select Input Uses string data type and enUserRole is Numbers data type
                  onChange={val => field.onChange(val)}
                  disabled={isPending}
                  value={field.value.toString()}
                  ref={field.ref}
                  errorMessage={error?.message}
                  invalid={invalid}
                  required
                  label={t('fields.role.label')}
                  placeHolder={t('fields.role.placeholder')}
                  options={Object.entries(userRoleName).map(([key, value]) => {
                    return {value: key, label: value};
                  })}
                />
              )}
            />
            <div className='flex justify-end gap-x-2 mt-2'>
              <DialogClose>
                <CustomButton disable={isPending} text={t('actions.cancel')} icon={<ArrowRight className='min-w-5 min-h-5' />} className=' flex-row-reverse' type='secondary' />
              </DialogClose>
              <CustomButton disable={isPending} text={props.type == 'add' ? t('actions.add') : t('actions.edit')} icon={<PlusCircle className='min-w-5 min-h-5' />} type='primary' className='bg-black text-white' IsSubmit />
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UserDialog;
