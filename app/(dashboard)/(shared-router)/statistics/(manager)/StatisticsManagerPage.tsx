import PageDashboardHeader from '@/components/dashboard/header';
import {Suspense} from 'react';
import {CardsSkeleton, TableSkeleton} from './_components/skeletons';
import {StatisticsCards} from './_components/statistics-cards';
import ShipmentTableAndPagination from './_components/shipment-table-and-pagination';
import StatisticsRealTime from '../(admin)/_components/statistics-real-time';

interface StatisticsManagerPageProps {
  searchParams: {page?: string};
}

const StatisticsManagerPage = async ({searchParams}: StatisticsManagerPageProps) => {
  const {page} = await searchParams;
  return (
    <div>
      <StatisticsRealTime />
      <PageDashboardHeader title='الصفحة الرئيسية' description='نظرة عامة على أداء عمليات الشحن، مع إحصائيات مختصرة عن الشحنات الحالية والمتوقفة، عدد العملاء، وعدد المسارات المسجلة.' breadcrumbList={[{text: 'الرئيسية', path: '#'}]} />
      <Suspense fallback={<CardsSkeleton />}>
        <StatisticsCards />
      </Suspense>
      <PageDashboardHeader title='الشحنات الحالية' description='عرض جميع الشحنات النشطة قيد التنفيذ، مع متابعة حالتها الحالية وآخر تحديثات التتبع المرتبطة بها.' />
      <Suspense fallback={<TableSkeleton />}>
        <ShipmentTableAndPagination page={page} />
      </Suspense>
    </div>
  );
};

export default StatisticsManagerPage;
