import PageDashboardHeader from '@/components/dashboard/header';
import {Suspense} from 'react';
import AllSubscriptions from './_components/all-subscriptions';
import GetAllSubscription from '../../../../../services/get-all-subscription';
import {cookies} from 'next/headers';
import SubscriptionDialog from './_components/subscription-dialog';
import SubscriptionRealTimeListen from './_components/subscription-real-time-listen';
import { getTranslations } from 'next-intl/server';

const Page = async () => {
  const t = await getTranslations('adminSubscriptionsPage');
  return (
    <div>
      <SubscriptionRealTimeListen />
      <PageDashboardHeader
        title={t('header.title')}
        description={t('header.description')}
        breadcrumbList={[
          {text: t('header.breadcrumb.home'), path: '#'},
          {text: t('header.breadcrumb.subscriptions'), path: '#'}
        ]}
        hasAction
        actions={<SubscriptionDialog type='add' />}
      />
      <Suspense fallback={<div className='p-10 text-center'>Loading ...</div>}>
        <Subscriptions />
      </Suspense>
    </div>
  );
};

export default Page;

async function Subscriptions() {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const subscription = await GetAllSubscription(token);

  return <AllSubscriptions subscriptions={subscription} />;
}
