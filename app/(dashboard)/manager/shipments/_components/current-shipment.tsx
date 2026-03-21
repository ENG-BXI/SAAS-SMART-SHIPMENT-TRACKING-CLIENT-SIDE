'use client';
import {memo} from 'react';
import CustomButton from '@/components/custom-button';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {Eye, File, Filter, Pencil, PlusCircle} from 'lucide-react';
import {useState} from 'react';
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import CustomPagination from '@/components/custom-pagination';
import {ICurrentShipmentForTable} from '../_interfaces/current-shipment-for-table';
import ShipmentDialog from './shipment-dialog';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import DeleteDialog from '@/components/dashboard/delete-dialog';

const listOfCurrentShipments: ICurrentShipmentForTable[] = [
  {
    id: 1,
    shipmentNumber: '1',
    departureDate: '2026-03-21',
    currentPoint: 'المكلا',
    way: 'المكلا - عدن',
    shipmentDriver: 'السائق 1',
    shipmentDriverId: '1',
    wayId: '1'
  },
  {
    id: 2,
    shipmentNumber: '1',
    departureDate: '2026-03-21',
    currentPoint: 'عدن',
    way: 'المكلا - عدن',
    shipmentDriver: 'السائق 1',
    shipmentDriverId: '1',
    wayId: '1'
  },
  {
    id: 3,
    shipmentNumber: '1',
    departureDate: '2026-03-21',
    currentPoint: 'المكلا',
    way: 'المكلا - عدن',
    shipmentDriver: 'السائق 1',
    shipmentDriverId: '1',
    wayId: '1'
  }
];
function CurrentShipments() {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  return (
    <div>
      <PageDashboardHeader title='الشحنات' description='عرض وإدارة جميع الشحنات المسجلة على النظام، مع إمكانية متابعة حالتها وسجل التحديثات المرتبطة بكل شحنة.' breadcrumbList={[{text: 'الشحنات', path: '/'}]} />
      <DashboardSearchAndActionPage
        value={search}
        setValue={setSearch}
        action={
          <div className='self-start flex gap-x-1'>
            <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
            <ShipmentDialog type='add' />
          </div>
        }
      />
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
          {listOfCurrentShipments?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            listOfCurrentShipments?.map(shipment => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.shipmentNumber}</TableCell>
                <TableCell>{shipment.departureDate}</TableCell>
                <TableCell>{shipment.way}</TableCell>
                <TableCell>{shipment.currentPoint}</TableCell>
                <TableCell>{shipment.shipmentDriver}</TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      {type: 'link', link: `/manager/shipments/${shipment.id}`, text: 'عرض التفاصيل'},
                      {type: 'dialog', item: <ShipmentDialog type='edit' data={{shipmentNumber: shipment.shipmentNumber, way: shipment.wayId, shipmentDriver: shipment.shipmentDriverId}} />},
                      {
                        type: 'dialog',
                        item: <DeleteDialog title='توقيف الشحنة' triggerText='توقيف الشحنة' description='هل انت متاكد من توقيف الشحنة' onclick={() => {}} open={open} setOpen={setOpen} />
                      },
                      {
                        type: 'dialog',
                        item: <DeleteDialog title='حدف الشحنة' triggerText='حدف الشحنة' description='هل انت متاكد من حدف الشحنة' onclick={() => {}} open={open} setOpen={setOpen} />
                      }
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <CustomPagination pageSize={10} totalCount={100} currentPage={1} setPage={() => {}} hasNext={true} hasPrevious={true} />
    </div>
  );
}
export default memo(CurrentShipments) as unknown as typeof CurrentShipments;
