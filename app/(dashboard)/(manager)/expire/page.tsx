import Link from 'next/link';
import React from 'react';
import PageDashboardHeader from '@/components/dashboard/header';
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {AlertCircle} from 'lucide-react';

function ExpirePage() {
  return (
    <div className='w-full pb-10 font-sans' dir='rtl'>
      <PageDashboardHeader
        title='انتهى اشتراك الشركة'
        description='حساب شركتك مغلق مؤقتاً حتى يتم تجديد الاشتراك أو تحديث الباقة.'
        breadcrumbList={[
          {text: 'الرئيسية', path: '/'},
          {text: 'اشتراكاتي', path: '/my-subscription'},
          {text: 'انتهى الاشتراك', path: '/expire'}
        ]}
      />

      <div className='grid gap-6 xl:grid-cols-[1.35fr_0.9fr]'>
        <Card className='overflow-hidden'>
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-900'>
                <AlertCircle className='h-6 w-6' />
              </div>
              <div>
                <CardTitle>انتهى اشتراك شركتك</CardTitle>
                <CardDescription>الرجاء تجديد الاشتراك للوصول إلى لوحة التحكم وبيانات الشركة مرة أخرى.</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className='space-y-6'>
            <div className='rounded-3xl border border-red-200 bg-red-50 p-6 text-red-900'>
              <p className='text-sm font-medium'>الوصول مقفل حتى التجديد</p>
              <p className='mt-2 text-sm leading-7 text-slate-700'>الاشتراك الحالي لم يعد صالحاً، ولا يمكن استخدام خدمات المنصة حتى يتم تجديده.</p>
            </div>

            <div className='space-y-4 text-slate-700'>
              <p className='text-base font-semibold text-slate-900'>خطوات التجديد</p>
              <ul className='space-y-3 list-inside list-disc text-sm leading-7'>
                <li>راجع تفاصيل الاشتراك المتاحة في صفحة اشتراكاتي.</li>
                <li>اختر الباقة الأنسب وابدأ عملية التجديد سريعاً.</li>
                <li>بعد التجديد، ستعود جميع ميزات الشركة للعمل تلقائياً.</li>
              </ul>
            </div>

            <div className='rounded-3xl bg-slate-50 p-6 text-sm leading-7 text-slate-600'>
              <p className='font-semibold text-slate-900'>معلومة</p>
              <p>إذا كنت تحتاج مساعدة في التجديد، يمكنك الانتقال إلى صفحة الاشتراك أو التواصل مع فريق الدعم.</p>
            </div>
          </CardContent>

          <CardFooter className='flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between'>
            <Link href='/my-subscription'>
              <Button className='bg-black text-white'>تجديد الاشتراك</Button>
            </Link>
            <Link href='/'>
              <Button variant='outline'>العودة إلى الصفحة الرئيسية</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className='overflow-hidden'>
          <CardHeader>
            <CardTitle>حالة الحساب</CardTitle>
            <CardDescription>لا يمكن الوصول إلى وظائف لوحة التحكم حتى يتم التجديد.</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4 text-sm text-slate-700'>
            <div className='rounded-3xl border border-slate-200 bg-white p-5'>
              <p className='font-semibold text-slate-900'>الاشتراك الحالي</p>
              <p className='mt-2'>منتهي وغير صالح للاستخدام.</p>
            </div>
            <div className='rounded-3xl border border-slate-200 bg-white p-5'>
              <p className='font-semibold text-slate-900'>الحل المقترح</p>
              <p className='mt-2'>انتقل إلى صفحة اشتراكاتي لتجديد الباقة أو التغيير إلى خطة جديدة.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ExpirePage;
