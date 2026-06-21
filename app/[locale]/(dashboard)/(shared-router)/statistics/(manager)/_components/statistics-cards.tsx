import CardStat from '@/components/dashboard/card-stat';
import GetManagerStatistics from '@/app/[locale]/(dashboard)/(shared-router)/statistics/(manager)/services/get-manager-statistics';
import {cookies} from 'next/headers';

export async function StatisticsCards() {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const statistics = await GetManagerStatistics(token);
  return (
    <div className='flex flex-wrap gap-4 mb-5'>
      <CardStat title='عدد الشنحات' value={statistics.numberOfShipments} />
      <CardStat title='عدد الشحنات الحالية' value={statistics.numberOfCurrentShipments} />
      <CardStat title='عدد الشحنات المنتهية' value={statistics.numberOfFinishedShipments} />
      <CardStat title='عدد العملاء' value={statistics.numberOfClients} />
      <CardStat title='عدد المسارات' value={statistics.numberOfWays} />
    </div>
  );
}
