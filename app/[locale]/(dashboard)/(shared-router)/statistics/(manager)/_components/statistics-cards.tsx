import CardStat from '@/components/dashboard/card-stat';
import GetManagerStatistics from '@/app/[locale]/(dashboard)/(shared-router)/statistics/(manager)/services/get-manager-statistics';
import {cookies} from 'next/headers';
import {getTranslations} from 'next-intl/server';

export async function StatisticsCards() {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const statistics = await GetManagerStatistics(token);
  const t = await getTranslations('managerDashboard.stats');
  return (
    <div className='flex flex-wrap gap-4 mb-5'>
      <CardStat title={t('shipments')} value={statistics.numberOfShipments} />
      <CardStat title={t('current')} value={statistics.numberOfCurrentShipments} />
      <CardStat title={t('finished')} value={statistics.numberOfFinishedShipments} />
      <CardStat title={t('clients')} value={statistics.numberOfClients} />
      <CardStat title={t('ways')} value={statistics.numberOfWays} />
    </div>
  );
}
