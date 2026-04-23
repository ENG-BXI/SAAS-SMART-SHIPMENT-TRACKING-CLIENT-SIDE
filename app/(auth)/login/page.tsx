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
const Login = () => {
  const [isPending, startTransition] = useTransition();
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
      }
      if (res?.success) {
        toast.success(res.message);
        if (res.user) {
          location.reload();
        }
      }
    });
  }
  return (
    <Card className='min-w-md'>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Welcome back to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name='email'
              render={({field, fieldState: {invalid, error}}) => {
                return <CustomInput type='controller' field={field} invalid={invalid} error={error} required />;
              }}
            />
            <Controller
              control={form.control}
              name='password'
              render={({field, fieldState: {invalid, error}}) => {
                return <CustomInput type='controller' inputType='password' field={field} invalid={invalid} error={error} />;
              }}
            />
            <CustomButton IsSubmit text={`${isPending ? 'Logging in...' : 'Login'}`} disable={isPending} className='w-full' />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
