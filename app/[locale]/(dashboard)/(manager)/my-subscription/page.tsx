import PageDashboardHeader from '@/components/dashboard/header';

import CurrentSubscription from './_components/current-subscription';
import PricingPlans from './_components/pricing-plans';
import FAQSection from './_components/faq-section';
import GetSubscriptionInfo from './_services/get-subscription-info';
import {cookies} from 'next/headers';
import {formattedDate} from '@/lib/utils';
import GetAllSubscription from '@/services/get-all-subscription';
import MySubscriptionRealTimeListen from './_components/subscription-real-time-listen';
import {getTranslations} from 'next-intl/server';

export default async function MySubscriptionPage() {
  const t = await getTranslations('subscriptionPage.header');
  const tPrice = await getTranslations('subscriptionPage.pricing');
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const [subscriptionInfo, subscription] = await Promise.all([GetSubscriptionInfo(token), GetAllSubscription(token)]);
  const isYearly = subscriptionInfo.type.durationByMonth >= 12;
  const startDate = formattedDate(subscriptionInfo.startDate);
  const endDate = formattedDate(subscriptionInfo.endDate);
  const isPending = subscriptionInfo.status == 'pending';
  const isInActive = subscriptionInfo.status == 'inactive';

  return (
    <div className='w-full pb-10 font-sans'>
      <MySubscriptionRealTimeListen />

      <PageDashboardHeader
        title={t('title')}
        description={t('description')}
        breadcrumbList={[
          {text: t('breadcrumb.home'), path: '/'},
          {text: t('breadcrumb.settings'), path: '/settings'},
          {text: t('breadcrumb.subscriptions'), path: '/my-subscription'}
        ]}
      />
      <CurrentSubscription startDate={startDate} endDate={endDate} price={subscriptionInfo.type.price} status={subscriptionInfo.status} isYearly={isYearly} />
      {!isPending && !isInActive && (
        <>
          <div className='mb-6 flex flex-col gap-1 border-b pb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>{tPrice('title')}</h3>
            <p className='text-muted-foreground text-sm'>{tPrice('description')}</p>
          </div>
          <PricingPlans currentPlan={subscriptionInfo.type.type} status={subscriptionInfo.status} plans={subscription} />
        </>
      )}

      <FAQSection />
    </div>
  );
}
