'use client'
import { memo } from 'react';
import CustomButton from '@/components/custom-button';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {Filter, Pencil, PlusCircle, Trash} from 'lucide-react';
import {useState} from 'react';
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import CustomPagination from '@/components/custom-pagination';
import {ICurrentShipmentForTable} from '../_interfaces/current-shipment-for-table';
const listOfCurrentShipments: ICurrentShipmentForTable[] = [
  {
    id: 1,
    shipmentNumber: '1',
    departureDate: '2026-03-21',
    currentPoint: 'المكلا',
    route: 'المكلا - عدن'
  },
  {
    id: 2,
    shipmentNumber: '1',
    departureDate: '2026-03-21',
    currentPoint: 'عدن',
    route: 'المكلا - عدن'
  },
  {
    id: 3,
    shipmentNumber: '1',
    departureDate: '2026-03-21',
    currentPoint: 'المكلا',
    route: 'المكلا - عدن'
  }
];
function CurrentShipments() {
  const [search, setSearch] = useState('');
  return (
    <div>
      <PageDashboardHeader title='الشحنات' description='عرض وإدارة جميع الشحنات المسجلة على النظام، مع إمكانية متابعة حالتها وسجل التحديثات المرتبطة بكل شحنة.' breadcrumbList={[{text: 'الشحنات', path: '/'}]} />
      <DashboardSearchAndActionPage
        value={search}
        setValue={setSearch}
        action={
          <div className='self-start flex gap-x-1'>
            <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
            <CustomButton text='اضافة شحنة جديدة' type='primary' icon={<PlusCircle className='' />} />
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
            <TableHead className=''></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listOfCurrentShipments?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            listOfCurrentShipments?.map(shipment => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.shipmentNumber}</TableCell>
                <TableCell>{shipment.departureDate}</TableCell>
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
export default memo(CurrentShipments) as unknown as typeof CurrentShipments;
