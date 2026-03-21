'use client';
import CustomPagination from '@/components/custom-pagination';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';
import {useState} from 'react';
import ShipmentItemDialog from './_components/shipment-item-dialog';
import {ShipmentDetailsInfo} from './_components/shipment-details-info';
import ShipmentDetailsHeader from './_components/shipment-details-header';
import DeleteDialog from '@/components/dashboard/delete-dialog';
interface IShipmentItemForTable {
  id: string;
  personName: string;
  item: string;
  quantity: number;
  isBreakable: string;
}
const listOfShipmentItem: IShipmentItemForTable[] = [
  {
    id: '1',
    personName: 'محمد احمد',
    item: 'اغراض منزلية',
    quantity: 10,
    isBreakable: 'true'
  },
  {
    id: '2',
    personName: 'محمد احمد',
    item: 'اغراض منزلية',
    quantity: 10,
    isBreakable: 'true'
  },
  {
    id: '3',
    personName: 'محمد احمد',
    item: 'اغراض منزلية',
    quantity: 10,
    isBreakable: 'true'
  },
  {
    id: '4',
    personName: 'محمد احمد',
    item: 'اغراض منزلية',
    quantity: 10,
    isBreakable: 'true'
  },
  {
    id: '5',
    personName: 'محمد احمد',
    item: 'اغراض منزلية',
    quantity: 10,
    isBreakable: 'true'
  },
  {
    id: '6',
    personName: 'محمد احمد',
    item: 'اغراض منزلية',
    quantity: 10,
    isBreakable: 'true'
  },
  {
    id: '7',
    personName: 'محمد احمد',
    item: 'اغراض منزلية',
    quantity: 10,
    isBreakable: 'true'
  }
];
const Page = () => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  return (
    <div>
      <PageDashboardHeader
        title='تفاصيل الشحنة'
        description='عرض معلومات الشحنة وحالتها الحالية، مع الاطلاع على سجل التتبع الكامل والتحديثات المرتبطة بها.'
        breadcrumbList={[
          {text: 'الشحنات', path: '/manager/shipments'},
          {text: 'تفاصيل الشحنة', path: '1'}
        ]}
      />
      <ShipmentDetailsHeader />
      <div className='grid gap-5 my-5 grid-cols-[2fr_3fr]'>
        <ShipmentDetailsInfo title='تاريخ الانطلاق' value='2/12/2025' />
        <ShipmentDetailsInfo title='رقم السائق' value='+967776935953' />
        <ShipmentDetailsInfo title='تاريخ الوصول' value='2/12/2025' />
        <ShipmentDetailsInfo title='المسار' value='خط عمان' />
        <ShipmentDetailsInfo title='عدد العملاء' value='25' />
        <ShipmentDetailsInfo title='عدد الاغراض' value='230' />
        <ShipmentDetailsInfo title='النقطة الحالية' value='شحن' />
      </div>
      <PageDashboardHeader title='اغراض الشحنة' description='عرض قائمة الأغراض المرفقة ضمن الشحنة، مع تفاصيل كل غرض من حيث الوصف والكمية وأي ملاحظات مرتبطة به.' hasAction actions={<ShipmentItemDialog triggerTitle='اضافة عميل للشحنة' type='add' />} />
      <DashboardSearchAndActionPage value={search} setValue={setSearch} />
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
          {listOfShipmentItem?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            listOfShipmentItem?.map(shipment => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.personName}</TableCell>
                <TableCell>{shipment.item}</TableCell>
                <TableCell>{shipment.quantity}</TableCell>
                <TableCell>{shipment.isBreakable == 'true' ? 'نعم' : 'لا'}</TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      {type: 'link', link: `/manager/shipments/${shipment.id}`, text: 'عرض التفاصيل'},
                      {type: 'dialog', item: <ShipmentItemDialog triggerTitle='تعديل بيانات العميل ' type='edit' data={{personName: shipment.personName, items: [{item: shipment.item, quantity: shipment.quantity, isBreakable: shipment.isBreakable}]}} />},
                      {type: 'dialog', item: <DeleteDialog title='حدف الغرض' triggerText='حدف الغرض' description='هل انت متاكد من حدف الغرض' onclick={() => {}} open={open} setOpen={setOpen} />}
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
};

export default Page;
