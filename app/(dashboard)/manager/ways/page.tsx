import CustomButton from '@/components/custom-button';
import CustomPagination from '@/components/custom-pagination';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Filter} from 'lucide-react';
import WayDialog from './_components/way-dialog';
import {ConcatListOfString} from '@/lib/utils';
import {pointFormData} from './_schemas/way-schema';
interface IWayForTable {
  id: string;
  name: string;
  points: pointFormData[];
}
const listOfWays: IWayForTable[] = [
  {
    id: '1',
    name: 'خط المكلا - عدن',
    points: [
      {name: 'المكلا', order: 1},
      {name: 'المكلا', order: 2},
      {name: 'عدن', order: 3}
    ]
  },
  {
    id: '2',
    name: 'خط المكلا - سيئون',
    points: [
      {name: 'المكلا', order: 1},
      {name: 'المكلا', order: 2},
      {name: 'سيئون', order: 3}
    ]
  },
  {
    id: '3',
    name: 'خط المكلا - تعز',
    points: [
      {name: 'المكلا', order: 1},
      {name: 'المكلا', order: 2},
      {name: 'تعز', order: 3}
    ]
  }
];
const Page = () => {
  return (
    <div>
      <PageDashboardHeader title='المسارات' description='إدارة المسارات المعتمدة لنقل الشحنات، مع تحديد نقاط الانطلاق والوصول وربطها بعمليات الشحن.' breadcrumbList={[{text: 'المسارات', path: '/manager/ways'}]} />
      <DashboardSearchAndActionPage
        action={
          <div className='self-start flex gap-x-1'>
            <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
            <WayDialog type='add' triggerTitle='اضافة مسار جديد' />
          </div>
        }
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-start'>اسم المسار</TableHead>
            <TableHead className='text-start'>عدد النقاط</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listOfWays?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            listOfWays?.map(way => (
              <TableRow key={way.id}>
                <TableCell className=''>{way.name}</TableCell>
                <TableCell className=''>{ConcatListOfString(way.points.map(point => point.name))}</TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      // TODO : add dialog for show Details
                      //   {type: 'link', link: `/manager/ways/${way.id}`, text: 'عرض التفاصيل'},
                      {type: 'dialog', item: <WayDialog type='edit' triggerTitle='تعديل بيانات المسار' data={{name: way.name, points: way.points}} />},
                      // {
                      //   type: 'dialog',
                      //   item: <DeleteDialog title='حذف المسار' triggerText='حذف المسار' description='هل انت متاكد من حذف المسار' onclick={() => {}} open={open} setOpen={setOpen} />
                      // }
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <CustomPagination pageSize={10} totalCount={100} currentPage={1} hasNext={true} hasPrevious={true} totalPages={10}  />
    </div>
  );
};

export default Page;
