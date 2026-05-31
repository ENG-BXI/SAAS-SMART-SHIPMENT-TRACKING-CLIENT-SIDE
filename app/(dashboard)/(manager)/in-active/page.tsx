import Link from 'next/link';
import React from 'react';
import PageDashboardHeader from '@/components/dashboard/header';
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {AlertTriangle} from 'lucide-react';

const InactivePage = () => {
  return (
    <div className='w-full pb-10 font-sans' dir='rtl'>
      <PageDashboardHeader
        title='تم إيقاف حسابك'
        description='تم تعطيل حسابك مؤقتاً. لا يمكنك الوصول إلى لوحة التحكم أو تنفيذ عمليات حتى إعادة التفعيل.'
        breadcrumbList={[
          {text: 'الرئيسية', path: '/'},
          {text: 'اشتراكاتي', path: '/my-subscription'},
          {text: 'غير نشط', path: '/in-active'}
        ]}
      />

      <div className='grid gap-6 xl:grid-cols-[1.35fr_0.9fr]'>
        <Card className='overflow-hidden'>
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-900'>
                <AlertTriangle className='h-6 w-6' />
              </div>
              <div>
                <CardTitle>حسابك غير نشط</CardTitle>
                <CardDescription>تم إيقاف حساب شركتك من قبل الفريق الإداري.</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className='space-y-6'>
            <div className='rounded-3xl border border-red-200 bg-red-50 p-6 text-red-900'>
              <p className='text-sm font-medium'>لا تقلق، سنساعدك في إعادة التفعيل.</p>
              <p className='mt-2 text-sm leading-7 text-slate-700'>إذا كنت تعتقد أن هذا خطأ، يمكنك التواصل مع الدعم أو مراجعة حالة الاشتراك للحصول على تفاصيل إضافية.</p>
            </div>

            <div className='space-y-4 text-slate-700'>
              <p className='text-base font-semibold text-slate-900'>سبب التعطيل</p>
              <ul className='space-y-3 list-inside list-disc text-sm leading-7'>
                <li>مراجعة بيانات الشركة من قبل الفريق الإداري.</li>
                <li>انتهاء صلاحية الاشتراك أو عدم استكمال الدفع.</li>
                <li>مشكلة في التوافق مع شروط الخدمة.</li>
              </ul>
            </div>

            <div className='rounded-3xl bg-slate-50 p-6 text-sm leading-7 text-slate-600'>
              <p className='font-semibold text-slate-900'>ماذا يمكنك فعله الآن؟</p>
              <p>راجع البريد الإلكتروني الخاص بك للحصول على أي تعليمات، أو تواصل مع الدعم لإعادة تفعيل حسابك في أسرع وقت.</p>
            </div>
          </CardContent>

          <CardFooter className='flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between'>
            <Link href='/my-subscription'>
              <Button className='bg-black text-white'>عرض اشتراكاتي</Button>
            </Link>
            <Link href='/'>
              <Button variant='outline'>العودة إلى الرئيسية</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className='overflow-hidden'>
          <CardHeader>
            <CardTitle>الحساب معطل</CardTitle>
            <CardDescription>لا يمكنك إجراء أية تغييرات أو الوصول إلى الموارد حتى يتم إعادة التفعيل.</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4 text-sm text-slate-700'>
            <div className='rounded-3xl border border-slate-200 bg-white p-5'>
              <p className='font-semibold text-slate-900'>الحالة الحالية</p>
              <p className='mt-2'>الحساب غير نشط مؤقتاً وجميع الصلاحيات معطلة.</p>
            </div>
            <div className='rounded-3xl border border-slate-200 bg-white p-5'>
              <p className='font-semibold text-slate-900'>الخطوات التالية</p>
              <p className='mt-2'>اتصل بالدعم أو راجع فريق الإدارة لتفعيل حسابك واستعادة الوصول.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InactivePage;
