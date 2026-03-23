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

interface UserDialogProps {
  type: 'add' | 'edit';
  id?: string;
  triggerTitle: string;
  data?: createUserFormData | editUserFormData;
}
function getTitle(type: 'add' | 'edit') {
  switch (type) {
    case 'add':
      return 'إضافة مستخدم جديد';
    case 'edit':
      return 'تعديل بيانات المستخدم';
  }
}
function getDescription(type: 'add' | 'edit') {
  switch (type) {
    case 'add':
      return 'إضافة مستخدم جديد إلى النظام وتحديد دوره وصلاحياته. سيتمكن المستخدم من الوصول إلى الميزات المسموح له بها حسب الدور المحدد.';
    case 'edit':
      return 'تعديل بيانات المستخدم المسجل مسبقًا وتحديث دوره وصلاحياته.';
  }
}
function onSubmit() {
  console.log('submit');
}
function UserDialog(props: UserDialogProps) {
  const schema = props.type == 'add' ? createUserSchema : editUserSchema;
  const {control, handleSubmit} = useForm<createUserFormData | editUserFormData>({
    // TODO Fix This Error
    resolver: zodResolver(schema),
    defaultValues: {
      name: props.data?.name || '',
      email: props.data?.email || '',
      password: '',
      role: props.data?.role || enUserRole.employee
    }
  });
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
            <Controller control={control} name='name' render={({field, fieldState: {invalid, error}}) => <CustomInput type='controller' field={field} error={error} invalid={invalid} required hasLabel label='اسم العميل' placeHolder='ادخل اسم العميل' />} />
            <Controller control={control} name='email' render={({field, fieldState: {invalid, error}}) => <CustomInput type='controller' field={field} error={error} invalid={invalid} required hasLabel label='البريد الالكتروني' placeHolder='ادخل البريد الالكتروني' />} />
            <Controller control={control} name='password' render={({field, fieldState: {invalid, error}}) => <CustomInput type='controller' field={field} error={error} invalid={invalid} required hasLabel label='كلمة المرور' placeHolder='ادخل كلمة المرور' />} />
            <Controller
              control={control}
              name='role'
              render={({field, fieldState: {invalid, error}}) => (
                <CustomSelect
                  // Because Select Input Uses string data type and enUserRole is Numbers data type
                  onChange={val => field.onChange(parseInt(val))}
                  value={field.value.toString()}
                  ref={field.ref}
                  errorMessage={error?.message}
                  invalid={invalid}
                  required
                  label='الصلاحية'
                  placeHolder='اختر الصلاحية'
                  options={Object.entries(userRoleName).map(([key, value]) => {
                    return {value: key, label: value};
                  })}
                />
              )}
            />
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

export default UserDialog;
