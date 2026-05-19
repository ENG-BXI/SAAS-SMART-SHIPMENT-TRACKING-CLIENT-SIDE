import {cookies} from 'next/headers';
import {getCurrentShipments} from '@/app/(dashboard)/(manager)/shipments/services/current-shipment.services';
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';
import {TableEmpty} from '@/components/table-empty';
import {formattedDate} from '@/lib/utils';
import CustomPagination from '@/components/custom-pagination';

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

export default ShipmentTableAndPagination;