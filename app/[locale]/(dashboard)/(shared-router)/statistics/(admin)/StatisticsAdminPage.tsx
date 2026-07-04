import CardStat from '@/components/dashboard/card-stat';
import PageDashboardHeader from '@/components/dashboard/header';
import {ChartLineLabel} from './_components/charts';
import {GetAdminStatistics} from './_services/get-admin-statistics';
import StatisticsRealTime from './_components/statistics-real-time';
import {getTranslations} from 'next-intl/server';

const StatisticsAdminPage = async () => {
  const t = await getTranslations('statisticsAdminPage');
  const adminStatistics = await GetAdminStatistics();
  return (
    <div>
      <StatisticsRealTime />
      <PageDashboardHeader title={t('header.title')} description={t('header.description')} breadcrumbList={[{text: t('header.breadcrumb'), path: '#'}]} />
      <div className='flex flex-wrap gap-4 mb-5'>
        <CardStat title={t('cards.companies')} value={adminStatistics.numberOfCompanies} />
        <CardStat title={t('cards.subscriptionRequests')} value={adminStatistics.numberOfSubscriptionRequest} />
        <CardStat title={t('cards.visitors')} value={adminStatistics.numberOfVisited} />
        <CardStat title={t('cards.notes')} value={adminStatistics.numberOfNotes} />
        <CardStat title={t('cards.expiringCompanies')} value={adminStatistics.numberOfWillSubscriptionFinish} />
        <CardStat title={t('cards.pausedCompanies')} value={adminStatistics.numberOfPausedCompanies} />
      </div>
      <ChartLineLabel chartData={adminStatistics.numberOfCompanyByMonth} />
    </div>
  );
};

export default StatisticsAdminPage;
