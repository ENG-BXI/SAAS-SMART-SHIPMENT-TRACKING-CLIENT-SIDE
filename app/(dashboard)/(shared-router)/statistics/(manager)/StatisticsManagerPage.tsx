import CardStat from '@/components/dashboard/card-stat';
import PageDashboardHeader from '@/components/dashboard/header';
import {TableEmpty} from '@/components/table-empty';
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';
import {getCurrentShipments} from '@/app/(dashboard)/(manager)/shipments/services/current-shipment.services';
import {cookies} from 'next/headers';
import CustomPagination from '@/components/custom-pagination';
import {Suspense} from 'react';
import { formattedDate } from '@/lib/utils';

interface StatisticsManagerPageProps {
  searchParams: {page?: string};
}
const StatisticsManagerPage = async ({searchParams}: StatisticsManagerPageProps) => {
  const {page} = await searchParams;
  return (
    <div>
      <PageDashboardHeader title='الصفحة الرئيسية' description='نظرة عامة على أداء عمليات الشحن، مع إحصائيات مختصرة عن الشحنات الحالية والمتوقفة، عدد العملاء، وعدد المسارات المسجلة.' breadcrumbList={[{text: 'الرئيسية', path: '#'}]} />
      <div className='flex flex-wrap gap-4 mb-5'>
        <CardStat title='عدد الشنحات' value='45' />
        <CardStat title='عدد الشحنات الحالية' value='45' />
        <CardStat title='عدد الشحنات المنتهية' value='45' />
        <CardStat title='عدد العملاء' value='45' />
        <CardStat title='عدد المسارات' value='45' />
      </div>
      <PageDashboardHeader title='الشحنات الحالية' description='عرض جميع الشحنات النشطة قيد التنفيذ، مع متابعة حالتها الحالية وآخر تحديثات التتبع المرتبطة بها.' />
      <Suspense fallback={<h2>Loading ....</h2>}>
        <ShipmentTableAndPagination page={page} />
      </Suspense>
    </div>
  );
};

export default StatisticsManagerPage;

async function ShipmentTableAndPagination({page}: {page?: string}) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const currentShipment = await getCurrentShipments(token, '', page);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-start'>رقم الشحنة</TableHead>
            <TableHead className='text-start'>تاريخ الانطلاق</TableHead>
            <TableHead className='text-start'>المسار</TableHead>
            <TableHead className='text-start'>النقطة الحالية</TableHead>
            <TableHead className='text-start'>سائق الشحنة</TableHead>
            <TableHead className=''></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentShipment.data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            currentShipment.data?.map(shipment => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.shipmentNumber}</TableCell>
                <TableCell>{formattedDate(shipment.launchDate)}</TableCell>
                <TableCell>{shipment.way.name}</TableCell>
                <TableCell>{shipment.currentPoint?.name}</TableCell>
                <TableCell>{shipment.driver.userName}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <CustomPagination currentPage={currentShipment.currentPage} pageSize={currentShipment.pageSize} totalPages={currentShipment.totalPages} totalCount={currentShipment.totalCount} hasNext={currentShipment.hasNext} hasPrevious={currentShipment.hasPrevious} />
    </>
  );
}
