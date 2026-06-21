'use client';

import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import CustomInput from '@/components/custom-input';
import CustomButton from '@/components/custom-button';
import {Button} from '@/components/ui/button';
import {ArrowRight, File, Info, PlusCircle} from 'lucide-react';
import {ICompany, ICreateCompany, IEditCompany} from '../_interfaces/company';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {CreateCompanyFormSchema, EditCompanyFormSchema} from '../_schemas/companyForm';
import {FieldGroup} from '@/components/ui/field';
import {toast} from 'sonner';
import {useState, useTransition} from 'react';
import {createCompany, editCompany} from '../_action';
import CustomSelect from '@/components/custom-select';
import useGetSubscriptionTypeAsOptions from '../_services/get-all-subscription-type-as-options';
type ICompanyDialog = {type: 'edit'; id: string; data: ICompany} | {type: 'add'};

function CompanyDialog({...props}: ICompanyDialog) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<ICreateCompany | IEditCompany>({
    resolver: zodResolver(props.type == 'add' ? CreateCompanyFormSchema : EditCompanyFormSchema),
    defaultValues:
      props.type == 'edit'
        ? props.data
        : {
            companyEmail: '',
            location: '',
            name: '',
            subscriptionType: ''
          }
  });
  const { data: SubscriptionData, isLoading: isSubscriptionLoading, isError: isSubscriptionError, error: subscriptionError } = useGetSubscriptionTypeAsOptions(open);
  function getTitle() {
    switch (props.type) {
      case 'add':
        return 'اضافة شركة جديدة';
      case 'edit':
        return 'تعديل شركة ';
    }
  }
  function getDescription() {
    switch (props.type) {
      case 'add':
        return 'إنشاء شركة جديدة لتمكينها من استخدام النظام وإدارة عمليات الشحن الخاصة بها.';
      case 'edit':
        return 'تعديل بيانات الشركة وحالة تفعيلها. أي تغيير سيتم تطبيقه فورًا على جميع المستخدمين التابعين للشركة.';
    }
  }
  function onSubmit(company: ICreateCompany | IEditCompany) {
    if (props.type == 'add') {
      startTransition(async () => {
        const {error, message} = await createCompany(company as ICreateCompany);
        if (error) toast.error(message);
        else {
          toast.success(message);
          form.reset({
            name: '',
            location: '',
            companyEmail: '',
            companyPassword: '',
            confirmPassword: ''
          });
        }
      });
    } else if (props.type == 'edit') {
      startTransition(async () => {
        const {error, message} = await editCompany(props.id, company as IEditCompany);
        if (error) toast.error(message);
        else {
          toast.success(message);
          form.reset({
            name: '',
            location: '',
            companyEmail: '',
            companyPassword: '',
            confirmPassword: ''
          });
        }
      });
    }

    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={e => setOpen(e)}>
      <DialogTrigger asChild>
        {props.type == 'add' ? (
          <Button className='bg-custom-primary-color'>
            <PlusCircle className='min-w-5 min-h-5' /> {getTitle()}
          </Button>
        ) : (
          <Button variant={'ghost'} className='w-full justify-start text-[15px]'>
            <File className='min-w-6 min-h-6' /> {getTitle()}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent dir='rtl'>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <div className='bg-[#dbecfa] max-w-min p-2 rounded-full text-[#175CD3]'>
              <Info />
            </div>
            <DialogTitle className=''>{getTitle() + ' ' + form.getValues('name')}</DialogTitle>
            <DialogDescription>{getDescription()}</DialogDescription>
          </DialogHeader>

          <FieldGroup className='gap-y-2 mb-3'>
            <Controller
              name='name'
              control={form.control}
              render={({field, fieldState}) => {
                return <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label='اسم الشركة' required placeHolder='مثال: الخط السريع للشحن' />;
              }}
            />
            <Controller
              control={form.control}
              name='subscriptionType'
              render={({field, fieldState: {invalid, error}}) => {
                return <CustomSelect disabled={isPending} onChange={field.onChange} value={field.value} ref={field.ref} invalid={invalid} isLoading={isSubscriptionLoading} isError={isSubscriptionError} error={subscriptionError?.message} errorMessage={error?.message} placeHolder='اختر باقه الاشتراك' required label='باقه الاشتراك' options={SubscriptionData || []} />;
              }}
            />
            <Controller
              name='location'
              control={form.control}
              render={({field, fieldState}) => {
                return <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label='موقع الشركة' required placeHolder='مثال: الرياض، السعودية' />;
              }}
            />
            <Controller
              name='companyEmail'
              control={form.control}
              render={({field, fieldState}) => {
                return <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label='ايميل الشركة' required placeHolder='مثال: example@gmail.com' />;
              }}
            />
            <Controller
              name='companyPassword'
              control={form.control}
              render={({field, fieldState}) => {
                return <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label='كلمة السر' required placeHolder='***********' />;
              }}
            />
            {props.type == 'add' && (
              <Controller
                name='confirmPassword'
                control={form.control}
                render={({field, fieldState}) => {
                  return <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label='تاكيد كلمة السر ' required placeHolder='***********' />;
                }}
              />
            )}
          </FieldGroup>

          <DialogFooter>
            <DialogClose>
              <CustomButton text='الغاء' icon={<ArrowRight />} type='secondary' className='flex-row-reverse' />
            </DialogClose>
            <CustomButton disable={isPending} IsSubmit text={props.type == 'add' ? 'اضافة' : 'تعديل'} icon={<PlusCircle />} className='bg-black' />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CompanyDialog;
