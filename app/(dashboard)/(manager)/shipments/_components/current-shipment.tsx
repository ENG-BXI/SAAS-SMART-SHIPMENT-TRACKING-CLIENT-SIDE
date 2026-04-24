import {memo, Suspense} from 'react';
import CustomButton from '@/components/custom-button';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {Filter} from 'lucide-react';
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import CustomPagination from '@/components/custom-pagination';
import ShipmentDialog from './shipment-dialog';
import {cookies} from 'next/headers';
import {getCurrentShipments} from '../services/current-shipment.services';
import {formattedDate} from '@/lib/utils';

interface CurrentShipmentsProps {
  search?: string;
  page?: string;
}
async function CurrentShipments({search, page}: CurrentShipmentsProps) {
  return (
    <div>
      <PageDashboardHeader title='الشحنات' description='عرض وإدارة جميع الشحنات المسجلة على النظام، مع إمكانية متابعة حالتها وسجل التحديثات المرتبطة بكل شحنة.' breadcrumbList={[{text: 'الشحنات', path: '/'}]} />
      <DashboardSearchAndActionPage
        searchParamsKey='cs'
        action={
          <div className='self-start flex gap-x-1'>
            <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
            <ShipmentDialog type='add' />
          </div>
        }
      />
      {/* Improve Loading Component and Add skelton */}
      <Suspense fallback={<div>Loading...</div>}>
        <TableAndPagination search={search} page={page} />
      </Suspense>
    </div>
  );
}
export default memo(CurrentShipments) as unknown as typeof CurrentShipments;

async function TableAndPagination({search, page}: CurrentShipmentsProps) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const data = await getCurrentShipments(token, search, page);
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
          {data?.data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.map(shipment => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.shipmentNumber}</TableCell>
                <TableCell>{formattedDate(shipment.launchDate)}</TableCell>
                <TableCell>{shipment.way.name}</TableCell>
                <TableCell>{shipment.currentPoint?.name}</TableCell>
                <TableCell>{shipment.driver.userName}</TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      {type: 'link', link: `/shipments/${shipment.id}`, text: 'عرض التفاصيل'},
                      {type: 'dialog', item: <ShipmentDialog type='edit' data={{shipmentNumber: shipment.shipmentNumber, wayId: shipment.way.id, driverId: shipment.driver.id, launchDate: shipment.launchDate}} />}
                      // {
                      //   type: 'dialog',
                      //   item: <DeleteDialog title='توقيف الشحنة' triggerText='توقيف الشحنة' description='هل انت متاكد من توقيف الشحنة' onclick={() => {}} open={open} setOpen={setOpen} />
                      // },
                      // {
                      //   type: 'dialog',
                      //   item: <DeleteDialog title='حدف الشحنة' triggerText='حدف الشحنة' description='هل انت متاكد من حدف الشحنة' onclick={() => {}} open={open} setOpen={setOpen} />
                      // }
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <CustomPagination searchParamsKey='c' pageSize={data.pageSize} totalCount={data.totalCount} currentPage={data.currentPage} hasNext={data.hasNext} hasPrevious={data.hasPrevious} totalPages={data.totalPages} />
    </>
  );
}
