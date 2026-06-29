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
import {cn, formattedDate} from '@/lib/utils';
import PauseShipmentDialog from './pause-shipment-dialog';
import ResumeShipmentDialog from './resume-shipment-dialog';
import DeleteShipmentDialog from './delete-shipment-dialog';
import {SHIPMENT_STATUS} from '@/lib/Constant/enum';
import {Badge} from '@/components/ui/badge';

import {CurrentShipmentTableSkeleton} from './skeletons';
import { getTranslations } from 'next-intl/server';

interface CurrentShipmentsProps {
  search?: string;
  page?: string;
}
async function CurrentShipments({ search, page }: CurrentShipmentsProps) {
  const t = await getTranslations('shipments.current.page');
  const tShared = await getTranslations('shared.buttons');
  return (
    <div>
      <PageDashboardHeader
        title={t('title')}
        description={t('description')}
        breadcrumbList={[
          {text: t('breadcrumb.home'), path: '/'},
          {text: t('breadcrumb.shipments'), path: '/shipments'}
        ]}
      />
      <DashboardSearchAndActionPage
        searchParamsKey='cs'
        action={
          <div className='self-start flex gap-x-1'>
            <CustomButton text={tShared('filter')} type='secondary' icon={<Filter />} />
            <ShipmentDialog type='add' />
          </div>
        }
      />
      <Suspense fallback={<CurrentShipmentTableSkeleton />}>
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
  const t = await getTranslations('shipments.current.table.headers');
  const tState = await getTranslations('shipments.current.status');
  const tActions = await getTranslations('shipments.current.table.actions');
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-start'>{t('shipmentNumber')}</TableHead>
            <TableHead className='text-start'>{t('launchDate')}</TableHead>
            <TableHead className='text-start'>{t('route')}</TableHead>
            <TableHead className='text-start'>{t('currentPoint')}</TableHead>
            <TableHead className='text-start'>{t('driver')}</TableHead>
            <TableHead className='text-start'>{t('status')}</TableHead>
            <TableHead className='text-start'>{t('actions')}</TableHead>
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
                  <Badge className={cn(shipment.isPaused ? 'bg-gray-500' : 'bg-green-500')}>{shipment.isPaused ? tState('paused') : tState('current')}</Badge>
                </TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      {type: 'link', link: `/shipments/${shipment.id}`, text: tActions('viewDetails')},
                      {type: 'dialog', item: <ShipmentDialog type='edit' id={shipment.id} data={{shipmentNumber: shipment.shipmentNumber, wayId: shipment.way.id, driverId: shipment.driver.id, launchDate: shipment.launchDate}} />},
                      shipment.isPaused ? {type: 'dialog', item: <ResumeShipmentDialog id={shipment.id} />} : {type: 'dialog', item: <PauseShipmentDialog id={shipment.id} />},
                      {
                        type: 'dialog',
                        item: <DeleteShipmentDialog id={shipment.id} />
                      }
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
