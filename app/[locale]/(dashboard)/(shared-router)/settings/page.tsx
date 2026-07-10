import PageDashboardHeader from '@/components/dashboard/header';
import LanguageSection from './_components/language-section';
import UserSection from './_components/user-section';
import SubscriptionSection from './_components/subscription-section';
import {getTranslations} from 'next-intl/server';
import {getUser} from '@/lib/utils';
import {cookies} from 'next/headers';

const Page = async () => {
  const t = await getTranslations('settingsPage');
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const user = getUser(token!);
  const isAdmin = user?.role == 'admin';
  return (
    <div>
      <PageDashboardHeader title={t('header.title')} description={t('header.description')} breadcrumbList={[{text: t('header.breadcrumb'), path: '/settings'}]} />
      <div className='p-3 w-full max-w-200'>
        <LanguageSection />
        <PageDashboardHeader title={t('accountSettings.title')} titleClassName='font-semibold text-lg' description={t('accountSettings.description')} />
        <UserSection />
        {!isAdmin && (
          <>
            <PageDashboardHeader title={t('subscriptionSettings.title')} titleClassName='font-semibold text-lg' description={t('subscriptionSettings.description')} />
            <SubscriptionSection />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
