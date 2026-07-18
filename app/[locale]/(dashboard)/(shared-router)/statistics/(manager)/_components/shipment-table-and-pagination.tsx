import {cookies} from 'next/headers';
import {getCurrentShipments} from '@/app/[locale]/(dashboard)/(manager)/shipments/services/current-shipment.services';
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';
import {TableEmpty} from '@/components/table-empty';
import {formattedDate} from '@/lib/utils';
import CustomPagination from '@/components/custom-pagination';
import {getTranslations} from 'next-intl/server';

async function ShipmentTableAndPagination({page}: {page?: string}) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const currentShipment = await getCurrentShipments(token, '', page);
  const t = await getTranslations('managerDashboard.table');
  const tEmpty = await getTranslations('tableEmpty');
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
            <TableHead className=''></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentShipment.data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>
                <TableEmpty text={tEmpty('finishedShipments')} />
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

export default ShipmentTableAndPagination;
