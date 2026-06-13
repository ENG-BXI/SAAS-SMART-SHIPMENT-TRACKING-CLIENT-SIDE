import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import ShipmentItemDialog from './shipment-item-dialog';
import GetAllShipmentItem from '../_services/get-all-shipment-item';
import {cookies} from 'next/headers';
import CustomPagination from '@/components/custom-pagination';
import DeleteShipmentItemDialog from './delete-shipment-item-dialog';
interface ShipmentTableAndPaginationProps {
  id: string;
  search?: string;
  page?: string;
}
async function ShipmentTableAndPagination({id, search, page}: ShipmentTableAndPaginationProps) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const shipmentItemData = await GetAllShipmentItem(id, token, search, page);
  return (
    <>
      <Table>
        <TableHeader className='bg-[#FCFCFD]'>
          <TableRow>
            <TableHead className='text-start font-semibold'>اسم العميل</TableHead>
            <TableHead className='text-start font-semibold'>الغرض</TableHead>
            <TableHead className='text-start font-semibold'>الكمية</TableHead>
            <TableHead className='text-start font-semibold'>قابل للكسر</TableHead>
            <TableHead className='text-start font-semibold'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipmentItemData.data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            shipmentItemData.data?.map(shipmentItem => (
              <TableRow key={shipmentItem.id}>
                <TableCell>{shipmentItem.client.name}</TableCell>
                <TableCell>{shipmentItem.name}</TableCell>
                <TableCell>{shipmentItem.quantity}</TableCell>
                <TableCell>{shipmentItem.isBreakable ? 'نعم' : 'لا'}</TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      {type: 'dialog', item: <ShipmentItemDialog triggerTitle='تعديل بيانات الغرض' shipmentId={id} id={shipmentItem.id} type='edit' data={{clientId: shipmentItem.client.id, items: [{name: shipmentItem.name, quantity: shipmentItem.quantity, isBreakable: shipmentItem.isBreakable}]}} />},
                      {type: 'dialog', item: <DeleteShipmentItemDialog id={shipmentItem.id} shipmentId={id} />}
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <CustomPagination pageSize={shipmentItemData.pageSize} totalCount={shipmentItemData.totalCount} currentPage={shipmentItemData.currentPage} hasNext={shipmentItemData.hasNext} hasPrevious={shipmentItemData.hasPrevious} totalPages={shipmentItemData.totalPages} />
    </>
  );
}

export default ShipmentTableAndPagination;
