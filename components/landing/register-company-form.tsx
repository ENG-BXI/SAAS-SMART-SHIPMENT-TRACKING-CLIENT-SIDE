'use client';
import CustomButton from '@/components/custom-button';
import CustomInput from '@/components/custom-input';
import CustomSelect from '@/components/custom-select';
import {Separator} from '@/components/ui/separator';
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
  name: z.string().min(3),
  location: z.string().min(3),
  companyEmail: z.email(),
  companyPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
  subscriptionType: z.string().min(1)
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
  function onSubmit(data: createCompanyFormData) {
    startTransition(async () => {
      const {error, message} = await requestSubscriptionCompany(data);
      if (error) toast.error(message);
      else {
        toast.success(message);

        formHook.reset();
      }
    });
  }
  return (
    <div className='w-full max-w-4xl mx-auto space-y-10 my-15'>
      {/* Header */}
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold'>{t('title')}</h1>
        <p className='text-sm text-muted-foreground'>{t('description')}</p>
      </div>
      <Form {...formHook}>
        <form onSubmit={formHook.handleSubmit(onSubmit)} className='space-y-10'>
          {/* Company Information */}
          <section className='space-y-5'>
            <div className='space-y-1'>
              <h2 className='text-lg font-semibold'>{t('sections.companyInfo')}</h2>
              <p className='text-sm text-muted-foreground'>{t('sections.companyInfoDescription')}</p>
            </div>
            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <Controller name='name' control={formHook.control} render={({field, fieldState}) => <CustomInput disabled={isPending} type='controller' field={field} invalid={fieldState.invalid} error={fieldState.error} hasLabel required label={t('fields.name.label')} placeHolder={t('fields.name.placeholder')} />} />
              <Controller name='location' control={formHook.control} render={({field, fieldState}) => <CustomInput disabled={isPending} type='controller' field={field} invalid={fieldState.invalid} error={fieldState.error} hasLabel required label={t('fields.location.label')} placeHolder={t('fields.location.placeholder')} />} />
              <Controller name='subscriptionType' control={formHook.control} render={({field, fieldState}) => <CustomSelect disabled={isPending} value={field.value} onChange={field.onChange} ref={field.ref} invalid={fieldState.invalid} errorMessage={fieldState.error?.message} isLoading={isSubscriptionLoading} isError={isSubscriptionError} error={subscriptionError?.message} options={SubscriptionData || []} required label={t('fields.subscriptionType.label')} placeHolder={t('fields.subscriptionType.placeholder')} className='col-span-2' />} />
            </div>
          </section>
          {/* Account Information */}
          <section className='space-y-5'>
            <div className='space-y-1'>
              <h2 className='text-lg font-semibold'>{t('sections.accountInfo')}</h2>
              <p className='text-sm text-muted-foreground'>{t('sections.accountInfoDescription')}</p>
            </div>
            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <Controller name='companyEmail' control={formHook.control} render={({field, fieldState}) => <CustomInput disabled={isPending} type='controller' field={field} invalid={fieldState.invalid} error={fieldState.error} hasLabel required label={t('fields.companyEmail.label')} placeHolder={t('fields.companyEmail.placeholder')} className='col-span-2' />} />
              <Controller name='companyPassword' control={formHook.control} render={({field, fieldState}) => <CustomInput disabled={isPending} type='controller' field={field} invalid={fieldState.invalid} error={fieldState.error} hasLabel required label={t('fields.companyPassword.label')} placeHolder={t('fields.companyPassword.placeholder')} />} />
              <Controller name='confirmPassword' control={formHook.control} render={({field, fieldState}) => <CustomInput disabled={isPending} type='controller' field={field} invalid={fieldState.invalid} error={fieldState.error} hasLabel required label={t('fields.confirmPassword.label')} placeHolder={t('fields.confirmPassword.placeholder')} />} />
            </div>
          </section>
          {/* Submit */}
          <div className='flex justify-end pt-4'>
            <CustomButton disable={isPending} IsSubmit text={isPending ? t('actions.submitting') : t('actions.submit')} icon={<PlusCircle />} className='bg-black' />
          </div>
        </form>
      </Form>
    </div>
  );
}
export default RegisterCompanyForm;
