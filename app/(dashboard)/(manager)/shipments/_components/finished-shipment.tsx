import CustomButton from '@/components/custom-button';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {Filter} from 'lucide-react';
import {memo, Suspense} from 'react';
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import CustomPagination from '@/components/custom-pagination';
import {getFinishedShipments} from '../services/finish-shipment.services';
import {cookies} from 'next/headers';
import {formattedDate} from '@/lib/utils';
interface FinishedShipmentsProps {
  search?: string;
  page?: string;
}
function FinishedShipments({search, page}: FinishedShipmentsProps) {
  return (
    <div className='mt-4'>
      <PageDashboardHeader title='الشحنات المنتهية' description='عرض الشحنات التي تم إغلاقها أو إكمالها، مع إمكانية مراجعة الحالة النهائية وسجل التتبع الكامل لكل شحنة.' />
      <DashboardSearchAndActionPage
        searchParamsKey='fs'
        action={
          <div className='flex gap-x-1'>
            <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
          </div>
        }
        className='justify-start'
      />
      <Suspense fallback={<h2>Loading...</h2>}>
        <TableAndPagination search={search} page={page} />
      </Suspense>
    </div>
  );
}

export default memo(FinishedShipments) as unknown as typeof FinishedShipments;

async function TableAndPagination({search, page}: FinishedShipmentsProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const data = await getFinishedShipments(token, search, page);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-start'>رقم الشحنة</TableHead>
            <TableHead className='text-start'>تاريخ الانطلاق</TableHead>
            <TableHead className='text-start'>تاريخ الوصول</TableHead>
            <TableHead className='text-start'>المسار</TableHead>
            <TableHead className='text-start'>النقطة الحالية</TableHead>
            <TableHead className='text-start'>سائق الشحنة</TableHead>
            <TableHead className=''></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.map(shipment => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.shipmentNumber}</TableCell>
                <TableCell>{formattedDate(shipment.launchDate)}</TableCell>
                <TableCell>{'shipment.arrivalDate'}</TableCell>
                <TableCell>{shipment.way.name}</TableCell>
                <TableCell>{shipment.currentPoint?.name}</TableCell>
                <TableCell>{shipment.driver.userName}</TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      {type: 'link', link: `/manager/shipments/${shipment.id}`, text: 'عرض التفاصيل'}
                      // {type: 'dialog', item: <DeleteDialog title='حدف الشحنة' triggerText='حدف الشحنة' description='هل انت متاكد من حدف الشحنة' onclick={() => {}} open={open} setOpen={setOpen} />}
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <CustomPagination searchParamsKey='f' pageSize={data.pageSize} totalCount={data.totalCount} currentPage={data.currentPage} hasNext={data.hasNext} hasPrevious={data.hasPrevious} totalPages={data.totalPages} />
    </>
  );
}
