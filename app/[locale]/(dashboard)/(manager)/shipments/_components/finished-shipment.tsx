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
import {FinishedShipmentTableSkeleton} from './skeletons';
import {getTranslations} from 'next-intl/server';
interface FinishedShipmentsProps {
  search?: string;
  page?: string;
}
async function FinishedShipments({search, page}: FinishedShipmentsProps) {
  const t = await getTranslations('shipments.finished.page');
  const tShared = await getTranslations('shared.buttons');

  return (
    <div className='mt-4'>
      <PageDashboardHeader title={t('title')} description={t('description')} />
      <DashboardSearchAndActionPage
        searchParamsKey='fs'
        action={
          <div className='flex gap-x-1'>
            <CustomButton text={tShared('filter')} type='secondary' icon={<Filter className='' />} />
          </div>
        }
        className='justify-start'
      />
      <Suspense fallback={<FinishedShipmentTableSkeleton />}>
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
  const tTable = await getTranslations('shipments.finished.table.headers');
  const tActionsTable = await getTranslations('shipments.finished.table.actions');
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{tTable('shipmentNumber')}</TableHead>
            <TableHead>{tTable('launchDate')}</TableHead>
            <TableHead>{tTable('endDate')}</TableHead>
            <TableHead>{tTable('route')}</TableHead>
            <TableHead>{tTable('currentPoint')}</TableHead>
            <TableHead>{tTable('driver')}</TableHead>
            <TableHead>{tTable('actions')}</TableHead>
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
                <TableCell>{formattedDate(shipment.endDate)}</TableCell>
                <TableCell>{shipment.way.name}</TableCell>
                <TableCell>{shipment.currentPoint?.name}</TableCell>
                <TableCell>{shipment.driver.userName}</TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      {type: 'link', link: `/shipments/${shipment.id}`, text: tActionsTable('viewDetails')}
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
