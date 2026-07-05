'use client';
import {FieldGroup} from '@/components/ui/field';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginSchema, loginFormData} from './_schema/login-schema';
import CustomInput from '@/components/custom-input';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import CustomButton from '@/components/custom-button';
import {useTransition} from 'react';
import {loginAction} from './_action/login-action';
import {toast} from 'sonner';
import {useTranslations} from 'next-intl';
const Login = () => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('login');
  const form = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  function onSubmit(data: loginFormData) {
    startTransition(async () => {
      const res = await loginAction(data.email, data.password);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success('Login successful');
      }
    });
  }
  return (
    <Card className='min-w-md'>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name='email'
              render={({field, fieldState: {invalid, error}}) => {
                return <CustomInput type='controller' field={field} invalid={invalid} error={error} required hasLabel label={t('fields.email.label')} placeHolder={t('fields.email.placeholder')} />;
              }}
            />
            <Controller
              control={form.control}
              name='password'
              render={({field, fieldState: {invalid, error}}) => {
                return <CustomInput type='controller' inputType='password' field={field} invalid={invalid} error={error} required hasLabel label={t('fields.password.label')} placeHolder={t('fields.password.placeholder')} />;
              }}
            />
            <CustomButton IsSubmit text={isPending ? t('actions.submitting') : t('actions.submit')} disable={isPending} className='w-full' />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
