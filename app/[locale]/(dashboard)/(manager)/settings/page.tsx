import PageDashboardHeader from '@/components/dashboard/header';
import LanguageSection from './_components/language-section';
import UserSection from './_components/user-section';
import SubscriptionSection from './_components/subscription-section';
import {getTranslations} from 'next-intl/server';

const Page = async () => {
  const t = await getTranslations('settingsPage');
  return (
    <div>
      <PageDashboardHeader title={t('header.title')} description={t('header.description')} breadcrumbList={[{text: t('header.breadcrumb'), path: '/settings'}]} />
      <div className='p-3 w-full max-w-200'>
        <LanguageSection />
        <PageDashboardHeader title={t('accountSettings.title')} titleClassName='font-semibold text-lg' description={t('accountSettings.description')} />
        <UserSection />
        <PageDashboardHeader title={t('subscriptionSettings.title')} titleClassName='font-semibold text-lg' description={t('subscriptionSettings.description')} />
        <SubscriptionSection />
      </div>
    </div>
  );
};

export default Page;
