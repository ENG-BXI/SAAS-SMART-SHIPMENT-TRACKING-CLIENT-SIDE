'use client';
import CustomButton from '@/components/custom-button';
import CustomInput from '@/components/custom-input';
import CustomSelect from '@/components/custom-select';
import {Card, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {DialogFooter} from '@/components/ui/dialog';
import {FieldGroup} from '@/components/ui/field';
import {Form} from '@/components/ui/form';
import {zodResolver} from '@hookform/resolvers/zod';
import {PlusCircle} from 'lucide-react';
import {Controller, useForm} from 'react-hook-form';
import z from 'zod';
import {useTransition} from 'react';
import {toast} from 'sonner';
import {requestSubscriptionCompany} from '@/actions/request-subscription-company';
import useGetSubscriptionTypeAsOptions from '@/app/[locale]/(dashboard)/(admin)/company/_services/get-all-subscription-type-as-options';
import {useTranslations} from 'next-intl';

const createCompanyFormSchema = z.object({
  name: z.string().min(3, 'company name must be great than 3 char'),
  location: z.string().min(3, 'location must be great than 3'),
  companyEmail: z.email().min(3, 'company email must be great than 3 char'),
  companyPassword: z.string().min(8, 'password must be great than 8 char').max(100, 'password must be less than 100 char'),
  confirmPassword: z.string().min(8, 'password must be great than 8 char').max(100, 'password must be less than 100 char'),
  subscriptionType: z.string().min(1, 'select subscription type')
  // Upload Bill
});
export type createCompanyFormData = z.infer<typeof createCompanyFormSchema>;
function RegisterCompanyForm() {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('homePage.registerCompanyForm');

  const formHook = useForm<createCompanyFormData>({
    resolver: zodResolver(createCompanyFormSchema),
    defaultValues: {
      name: '',
      location: '',
      companyEmail: '',
      companyPassword: '',
      confirmPassword: '',
      subscriptionType: ''
    }
  });
  const {data: SubscriptionData, isLoading: isSubscriptionLoading, isError: isSubscriptionError, error: subscriptionError} = useGetSubscriptionTypeAsOptions();
  function onSubmit(company: createCompanyFormData) {
    startTransition(async () => {
      const {error, message} = await requestSubscriptionCompany(company);
      if (error) toast.error(message);
      else {
        toast.success(message);
        formHook.reset({
          name: '',
          location: '',
          companyEmail: '',
          companyPassword: '',
          confirmPassword: ''
        });
      }
    });
  }
  return (
    <Card className='mx-auto mt-4 w-xl py-3 px-5'>
      <p className='mx-auto'>{t('tempNote')}</p>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <Form {...formHook}>
        <form onSubmit={formHook.handleSubmit(onSubmit)}>
          <FieldGroup className='gap-y-2 mb-3'>
            <Controller
              name='name'
              control={formHook.control}
              render={({field, fieldState}) => {
                return <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label={t('fields.name.label')} required placeHolder={t('fields.name.placeholder')} />;
              }}
            />
            <Controller
              control={formHook.control}
              name='subscriptionType'
              render={({field, fieldState: {invalid, error}}) => {
                return <CustomSelect disabled={isPending} onChange={field.onChange} value={field.value} ref={field.ref} invalid={invalid} isLoading={isSubscriptionLoading} isError={isSubscriptionError} error={subscriptionError?.message} errorMessage={error?.message} placeHolder={t('fields.subscriptionType.placeholder')} required label={t('fields.subscriptionType.label')} options={SubscriptionData || []} />;
              }}
            />
            <Controller
              name='location'
              control={formHook.control}
              render={({field, fieldState}) => {
                return <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label={t('fields.location.label')} required placeHolder={t('fields.location.placeholder')} />;
              }}
            />
            <Controller
              name='companyEmail'
              control={formHook.control}
              render={({field, fieldState}) => {
                return <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label={t('fields.companyEmail.label')} required placeHolder={t('fields.companyEmail.placeholder')} />;
              }}
            />
            <Controller
              name='companyPassword'
              control={formHook.control}
              render={({field, fieldState}) => {
                return <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label={t('fields.companyPassword.label')} required placeHolder={t('fields.companyPassword.placeholder')} />;
              }}
            />

            <Controller
              name='confirmPassword'
              control={formHook.control}
              render={({field, fieldState}) => {
                return <CustomInput disabled={isPending} type='controller' invalid={fieldState.invalid} error={fieldState.error} field={field} hasLabel label={t('fields.confirmPassword.label')} required placeHolder={t('fields.confirmPassword.placeholder')} />;
              }}
            />
          </FieldGroup>

          <DialogFooter>
            <CustomButton disable={isPending} IsSubmit text={isPending ? t('actions.submitting') : t('actions.submit')} icon={<PlusCircle />} className='bg-black' />
          </DialogFooter>
        </form>
      </Form>
    </Card>
  );
}
export default RegisterCompanyForm;
