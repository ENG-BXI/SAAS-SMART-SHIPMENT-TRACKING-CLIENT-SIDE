import PageDashboardHeader from '@/components/dashboard/header';
import {Suspense} from 'react';
import {CardsSkeleton, TableSkeleton} from './_components/skeletons';
import {StatisticsCards} from './_components/statistics-cards';
import ShipmentTableAndPagination from './_components/shipment-table-and-pagination';
import StatisticsRealTime from '../(admin)/_components/statistics-real-time';
import { getTranslations } from 'next-intl/server';

interface StatisticsManagerPageProps {
  searchParams: {page?: string};
}

const StatisticsManagerPage = async ({searchParams}: StatisticsManagerPageProps) => {
  const { page } = await searchParams;
  const t = await getTranslations('managerDashboard.header');
  const tCurrent = await getTranslations('managerDashboard.currentShipments');

  return (
    <div>
      <StatisticsRealTime />
      <PageDashboardHeader title={t('title')} description={t('description')} breadcrumbList={[{text: 'الرئيسية', path: '#'}]} />
      <Suspense fallback={<CardsSkeleton />}>
        <StatisticsCards />
      </Suspense>
      <PageDashboardHeader title={tCurrent('title')} description={t('description')} />
      <Suspense fallback={<TableSkeleton />}>
        <ShipmentTableAndPagination page={page} />
      </Suspense>
    </div>
  );
};

export default StatisticsManagerPage;
