import CardStat from '@/components/dashboard/card-stat';
import PageDashboardHeader from '@/components/dashboard/header';
import {TableEmpty} from '@/components/table-empty';
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';
import {ICurrentShipmentForTable} from '../../../(manager)/shipments/_interfaces/current-shipment-for-table';

const listOfShipments: ICurrentShipmentForTable[] = [
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
    currentPoint: 'البيضاء',
    way: 'المكلا - عدن',
    shipmentDriver: 'السائق 1',
    shipmentDriverId: '1',
    wayId: '1'
  },
  {
    id: 3,
    shipmentNumber: '1',
    departureDate: '2026-03-21',
    currentPoint: 'البيضاء',
    way: 'المكلا - عدن',
    shipmentDriver: 'السائق 1',
    shipmentDriverId: '1',
    wayId: '1'
  }
];
const StatisticsManagerPage = () => {
  return (
    <div>
      <PageDashboardHeader title='الصفحة الرئيسية' description='نظرة عامة على أداء عمليات الشحن، مع إحصائيات مختصرة عن الشحنات الحالية والمتوقفة، عدد العملاء، وعدد المسارات المسجلة.' breadcrumbList={[{text: 'الرئيسية', path: '#'}]} />
      <div className='flex flex-wrap gap-4 mb-5'>
        <CardStat title='عدد الشنحات' value='45' />
        <CardStat title='عدد الشحنات الحالية' value='45' />
        <CardStat title='عدد الشحنات المنتهية' value='45' />
        <CardStat title='عدد العملاء' value='45' />
        <CardStat title='عدد المسارات' value='45' />
      </div>
      <PageDashboardHeader title='الشحنات الحالية' description='عرض جميع الشحنات النشطة قيد التنفيذ، مع متابعة حالتها الحالية وآخر تحديثات التتبع المرتبطة بها.' />
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
          {listOfShipments?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            listOfShipments?.map(shipment => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.shipmentNumber}</TableCell>
                <TableCell>{shipment.departureDate}</TableCell>
                <TableCell>{shipment.way}</TableCell>
                <TableCell>{shipment.currentPoint}</TableCell>
                <TableCell>{shipment.shipmentDriver}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StatisticsManagerPage;
