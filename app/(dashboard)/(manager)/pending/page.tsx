import Link from 'next/link';
import React from 'react';
import PageDashboardHeader from '@/components/dashboard/header';
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Clock3} from 'lucide-react';

const PendingPage = () => {
  return (
    <div className='w-full pb-10 font-sans' dir='rtl'>
      <PageDashboardHeader
        title='شركتك قيد المراجعة'
        description='تم استلام بيانات شركتك بنجاح، ويتم الآن مراجعة طلب الاشتراك من قبل الفريق المختص.'
        breadcrumbList={[
          {text: 'الرئيسية', path: '/'},
          {text: 'اشتراكاتي', path: '/my-subscription'},
          {text: 'تحت المراجعة', path: '/pending'}
        ]}
      />

      <div className='grid gap-6 xl:grid-cols-[1.35fr_0.9fr]'>
        <Card className='overflow-hidden'>
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-900'>
                <Clock3 className='h-6 w-6' />
              </div>
              <div>
                <CardTitle>طلب الاشتراك قيد المراجعة</CardTitle>
                <CardDescription>فريق الدعم يراجع بيانات شركتك ويضمن أن جميع المعلومات صحيحة.</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className='space-y-6'>
            <div className='rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-900'>
              <p className='text-sm font-medium'>نحن نقدر صبرك.</p>
              <p className='mt-2 text-sm leading-7 text-slate-700'>التحقق من البيانات قد يستغرق بعض الوقت. ستصلك إشعارات عند اكتمال المراجعة أو إذا احتجنا معلومات إضافية.</p>
            </div>

            <div className='space-y-4 text-slate-700'>
              <p className='text-base font-semibold text-slate-900'>ما الذي يحدث الآن؟</p>
              <ul className='space-y-3 list-inside list-disc text-sm leading-7'>
                <li>مراجعة بيانات الشركة ومعلومات الاشتراك.</li>
                <li>التحقق من الوثائق والمستندات المطلوبة إن وجدت.</li>
                <li>تأمين موافقة الحساب لإعادة تفعيل حساب الشركة.</li>
              </ul>
            </div>

            <div className='rounded-3xl bg-slate-50 p-6 text-sm leading-7 text-slate-600'>
              <p className='font-semibold text-slate-900'>نصيحة</p>
              <p>إذا كان لديك استفسار أو أردت تحديث معلومات إضافية، يمكنك العودة إلى صفحة الاشتراك أو التواصل مع الدعم في أي وقت.</p>
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
            <CardTitle>المراجعة متوقعة</CardTitle>
            <CardDescription>لا توجد حاجة لاتخاذ أي إجراء الآن، وسنبلغك بأي تحديثات جديدة.</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4 text-sm text-slate-700'>
            <div className='rounded-3xl border border-slate-200 bg-white p-5'>
              <p className='font-semibold text-slate-900'>الحالة الحالية</p>
              <p className='mt-2'>الطلب قيد المراجعة من قبل فريق الدعم.</p>
            </div>
            <div className='rounded-3xl border border-slate-200 bg-white p-5'>
              <p className='font-semibold text-slate-900'>الموعد المتوقع</p>
              <p className='mt-2'>سيتم الرد خلال 24 ساعة عمل أو أقل.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PendingPage;
