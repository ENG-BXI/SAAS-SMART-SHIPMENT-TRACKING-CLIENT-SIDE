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
import Attachment from './attachment';

const createCompanyFormSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    name: z.string().min(3, t('nameMin')),
    location: z.string().min(3, t('locationMin')),
    companyEmail: z.email(t('emailInvalid')),
    companyPassword: z.string().min(8, t('passwordMin')),
    confirmPassword: z.string().min(8, t('confirmPasswordMin')),
    subscriptionType: z.string().min(1, t('subscriptionRequired')),
    receipt: z
      .custom<File>(file => file instanceof File, {
        message: t('receiptRequired')
      })
      .refine(file => file instanceof File && file.size <= 5 * 1024 * 1024, t('receiptMaxSize'))
      .refine(file => file instanceof File && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), t('receiptFileType'))
  });

export type createCompanyFormData = z.infer<ReturnType<typeof createCompanyFormSchema>>;

function RegisterCompanyForm() {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('registerCompanyPage.form');
  const tValidation = useTranslations('registerCompanyPage.validation');

  const formHook = useForm<createCompanyFormData>({
    resolver: zodResolver(createCompanyFormSchema(tValidation)),
    defaultValues: {
      name: '',
      location: '',
      companyEmail: '',
      companyPassword: '',
      confirmPassword: '',
      subscriptionType: '',
      receipt: undefined as unknown as File
    }
  });
  const {data: SubscriptionData, isLoading: isSubscriptionLoading, isError: isSubscriptionError, error: subscriptionError} = useGetSubscriptionTypeAsOptions();
  function onSubmit(data: createCompanyFormData) {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });
      const {error, message} = await requestSubscriptionCompany(formData);
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
              <h2 className='text-lg font-semibold'>{t('sections.companyInfo.title')}</h2>
              <p className='text-sm text-muted-foreground'>{t('sections.companyInfo.description')}</p>
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
              <h2 className='text-lg font-semibold'>{t('sections.accountInfo.title')}</h2>
              <p className='text-sm text-muted-foreground'>{t('sections.accountInfo.description')}</p>
            </div>
            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <Controller name='companyEmail' control={formHook.control} render={({field, fieldState}) => <CustomInput disabled={isPending} type='controller' field={field} invalid={fieldState.invalid} error={fieldState.error} hasLabel required label={t('fields.companyEmail.label')} placeHolder={t('fields.companyEmail.placeholder')} className='col-span-2' />} />
              <Controller name='companyPassword' control={formHook.control} render={({field, fieldState}) => <CustomInput disabled={isPending} type='controller' field={field} invalid={fieldState.invalid} error={fieldState.error} hasLabel required label={t('fields.companyPassword.label')} placeHolder={t('fields.companyPassword.placeholder')} />} />
              <Controller name='confirmPassword' control={formHook.control} render={({field, fieldState}) => <CustomInput disabled={isPending} type='controller' field={field} invalid={fieldState.invalid} error={fieldState.error} hasLabel required label={t('fields.confirmPassword.label')} placeHolder={t('fields.confirmPassword.placeholder')} />} />
            </div>
          </section>
          <Controller
            name='receipt'
            control={formHook.control}
            render={({field, fieldState}) => (
              <div className='space-y-2'>
                <div className='space-y-1'>
                  <h2 className='text-lg font-semibold'>{t('sections.receipt.title')}</h2>
                  <p className='text-sm text-muted-foreground'>{t('sections.receipt.description')}</p>
                </div>
                <Attachment value={field.value} onChange={field.onChange} accept='image/*' disabled={isPending} uploadLabel={t('attachment.upload')} removeLabel={t('attachment.remove')} />

                {fieldState.error && <p className='text-sm text-destructive'>{fieldState.error.message}</p>}
              </div>
            )}
          />
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
