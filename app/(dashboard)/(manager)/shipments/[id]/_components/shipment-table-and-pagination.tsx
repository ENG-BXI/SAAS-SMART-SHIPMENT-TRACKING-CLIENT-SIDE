import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import ShipmentItemDialog from './shipment-item-dialog';
import GetAllShipmentItem from '../_services/get-all-shipment-item';
import {cookies} from 'next/headers';
import CustomPagination from '@/components/custom-pagination';
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
            shipmentItemData.data?.map(shipment => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.client.name}</TableCell>
                <TableCell>{shipment.name}</TableCell>
                <TableCell>{shipment.quantity}</TableCell>
                <TableCell>{shipment.isBreakable ? 'نعم' : 'لا'}</TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      // TODO : Add View Dialog
                      {type: 'dialog', item: <ShipmentItemDialog triggerTitle='تعديل بيانات العميل ' type='edit' data={{clientId: shipment.client.id, items: [{name: shipment.name, quantity: shipment.quantity, isBreakable: shipment.isBreakable}]}} />}
                      // {type: 'dialog', item: <DeleteDialog title='حدف الغرض' triggerText='حدف الغرض' description='هل انت متاكد من حدف الغرض' onclick={() => {}} open={open} setOpen={setOpen} />}
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
