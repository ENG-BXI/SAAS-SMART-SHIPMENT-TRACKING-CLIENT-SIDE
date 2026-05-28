import React from 'react';
import PageDashboardHeader from '@/components/dashboard/header';

import {FAQS} from './_components/plans-data';
import CurrentSubscription from './_components/current-subscription';
import PricingPlans from './_components/pricing-plans';
import FAQSection from './_components/faq-section';
import GetSubscriptionInfo from './_services/get-subscription-info';
import {cookies} from 'next/headers';
import {formattedDate} from '@/lib/utils';
import GetAllSubscription from '@/services/get-all-subscription';

export default async function MySubscriptionPage() {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const [subscriptionInfo, subscription] = await Promise.all([GetSubscriptionInfo(token), GetAllSubscription(token)]);
  const isYearly = subscriptionInfo.type.durationByMonth >= 12;
  const startDate = formattedDate(subscriptionInfo.startDate);
  const endDate = formattedDate(subscriptionInfo.endDate);
  return (
    <div className='w-full pb-10 font-sans' dir='rtl'>
      <PageDashboardHeader
        title='اشتراكاتي'
        description='إدارة تفاصيل اشتراك شركتك الحالي، ومراجعة نوع الباقة والسعر وفترة الاشتراك، واستكشاف خيارات التجديد المتاحة.'
        breadcrumbList={[
          {text: 'الرئيسية', path: '/'},
          {text: 'إدارة النظام', path: '/settings'},
          {text: 'اشتراكاتي', path: '/my-subscription'}
        ]}
      />

      <CurrentSubscription startDate={startDate} endDate={endDate} price={subscriptionInfo.type.price} status={subscriptionInfo.status} isYearly={isYearly} />

      <div className='mb-6 flex flex-col gap-1 border-b pb-4'>
        <h3 className='text-lg font-semibold text-gray-900'>الباقات والخطط المتاحة</h3>
        <p className='text-muted-foreground text-sm'>راجع الباقات المتاحة لشركتك مع معلومات أوضح عن المزايا وفترات الاشتراك لتسهيل اختيار الأنسب.</p>
      </div>

      <PricingPlans currentPlan={subscriptionInfo.type.type} status={subscriptionInfo.status} plans={subscription} />

      <FAQSection faqs={FAQS} />

      {/* <UpgradeDialog 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
        selectedPlan={selectedPlan} 
        currentPlan={currentPlan} 
        isSubmitting={isSubmitting} 
        isSuccess={isSuccess} 
        onConfirm={handleConfirmUpgrade} 
      /> */}
    </div>
  );
}
