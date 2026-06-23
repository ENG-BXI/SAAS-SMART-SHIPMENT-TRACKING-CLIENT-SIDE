import Link from 'next/link';
import React from 'react';
import PageDashboardHeader from '@/components/dashboard/header';
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Clock3} from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const PendingPage = async () => {
  const t = await getTranslations('pendingPage');
  return (
    <div className='w-full pb-10 font-sans'>
      <PageDashboardHeader
        title={t('title')}
        description={t('description')}
        breadcrumbList={[
          {text: t('breadcrumb.home'), path: '/'},
          {text: t('breadcrumb.mySubscription'), path: '/my-subscription'},
          {text: t('breadcrumb.pending'), path: '/pending'}
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
                <CardTitle>{t('card.title')}</CardTitle>
                <CardDescription>{t('card.description')}</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className='space-y-6'>
            <div className='rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-900'>
              <p className='text-sm font-medium'>{t('card.alert.title')}</p>
              <p className='mt-2 text-sm leading-7 text-slate-700'>{t('card.alert.description')}</p>
            </div>

            <div className='space-y-4 text-slate-700'>
              <p className='text-base font-semibold text-slate-900'>{t('card.stepsTitle')}</p>
              <ul className='space-y-3 list-inside list-disc text-sm leading-7'>
                <li>{t('card.steps.step1')}</li>
                <li>{t('card.steps.step2')}</li>
                <li>{t('card.steps.step3')}</li>
              </ul>
            </div>

            <div className='rounded-3xl bg-slate-50 p-6 text-sm leading-7 text-slate-600'>
              <p className='font-semibold text-slate-900'>{t('card.info.title')}</p>
              <p>{t('card.info.text')}</p>
            </div>
          </CardContent>

          <CardFooter className='flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between'>
            <Link href='/my-subscription'>
              <Button className='bg-black text-white'>{t('card.actions.viewSubscriptions')}</Button>
            </Link>
            <Link href='/'>
              <Button variant='outline'>{t('card.actions.home')}</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className='overflow-hidden'>
          <CardHeader>
            <CardTitle>{t('statusCard.title')}</CardTitle>
            <CardDescription>{t('statusCard.description')}</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4 text-sm text-slate-700'>
            <div className='rounded-3xl border border-slate-200 bg-white p-5'>
              <p className='font-semibold text-slate-900'>{t('statusCard.current.title')}</p>
              <p className='mt-2'>{t('statusCard.current.text')}</p>
            </div>
            <div className='rounded-3xl border border-slate-200 bg-white p-5'>
              <p className='font-semibold text-slate-900'>{t('statusCard.expected.title')}</p>
              <p className='mt-2'>{t('statusCard.expected.text')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PendingPage;
