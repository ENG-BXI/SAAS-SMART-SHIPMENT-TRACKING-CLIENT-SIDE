'use client';
import CustomButton from '@/components/custom-button';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {Filter, Pencil, Trash} from 'lucide-react';
import {memo, useState} from 'react';
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import CustomPagination from '@/components/custom-pagination';
import {IFinishedShipmentForTable} from '../_interfaces/finshed-shipment-for-table';
const listOfFinishedShipments: IFinishedShipmentForTable[] = [
  {
    id: 1,
    shipmentNumber: '1',
    departureDate: '2026-03-21',
    currentPoint: 'المكلا',
    route: 'المكلا - عدن',
    arrivalDate: '2026-03-21'
  },

  {
    id: 2,
    shipmentNumber: '1',
    departureDate: '2026-03-21',
    currentPoint: 'المكلا',
    route: 'المكلا - عدن',
    arrivalDate: '2026-03-21'
  },

  {
    id: 3,
    shipmentNumber: '1',
    departureDate: '2026-03-21',
    currentPoint: 'المكلا',
    route: 'المكلا - عدن',
    arrivalDate: '2026-03-21'
  },

  {
    id: 4,
    shipmentNumber: '1',
    departureDate: '2026-03-21',
    currentPoint: 'المكلا',
    route: 'المكلا - عدن',
    arrivalDate: '2026-03-21'
  },

  {
    id: 5,
    shipmentNumber: '1',
    departureDate: '2026-03-21',
    currentPoint: 'المكلا',
    route: 'المكلا - عدن',
    arrivalDate: '2026-03-21'
  },

  {
    id: 6,
    shipmentNumber: '1',
    departureDate: '2026-03-21',
    currentPoint: 'المكلا',
    route: 'المكلا - عدن',
    arrivalDate: '2026-03-21'
  }
];
function FinishedShipments() {
  const [search, setSearch] = useState('');
  return (
    <div className='mt-4'>
      <PageDashboardHeader title='الشحنات المنتهية' description='عرض الشحنات التي تم إغلاقها أو إكمالها، مع إمكانية مراجعة الحالة النهائية وسجل التتبع الكامل لكل شحنة.' />
      <DashboardSearchAndActionPage
        value={search}
        setValue={setSearch}
        action={
          <div className='flex gap-x-1'>
            <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
          </div>
        }
        className='justify-start'
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-start'>رقم الشحنة</TableHead>
            <TableHead className='text-start'>تاريخ الانطلاق</TableHead>
            <TableHead className='text-start'>تاريخ الوصول</TableHead>
            <TableHead className='text-start'>المسار</TableHead>
            <TableHead className='text-start'>النقطة الحالية</TableHead>
            <TableHead className=''></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listOfFinishedShipments?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            listOfFinishedShipments?.map(shipment => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.shipmentNumber}</TableCell>
                <TableCell>{shipment.departureDate}</TableCell>
                <TableCell>{shipment.arrivalDate}</TableCell>
                <TableCell>{shipment.route}</TableCell>
                <TableCell>{shipment.currentPoint}</TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      {type: 'dialog', item: <Pencil className='' />},
                      {type: 'dialog', item: <Trash className='' />}
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

export default memo(FinishedShipments) as unknown as typeof FinishedShipments;
