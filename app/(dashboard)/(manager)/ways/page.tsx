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
import GetAllWays from './services/get-all-c-ways';
import {cookies} from 'next/headers';
import {Suspense} from 'react';


interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}
const Page = async ({searchParams}: PageProps) => {
  const {page, search} = await searchParams;
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
      
      <Suspense fallback={<h1>loading...</h1>}>
        <WaysTableAndPagination page={page} search={search} />
      </Suspense>
    </div>
  );
};

export default Page;
async function WaysTableAndPagination({page, search}: {page?: string; search?: string}) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const ways = await GetAllWays({token, page, search});
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-start'>اسم المسار</TableHead>
            <TableHead className='text-start'>عدد النقاط</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ways?.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            ways?.data.map(way => (
              <TableRow key={way.id}>
                <TableCell className=''>{way.name}</TableCell>
                <TableCell className=''>{ConcatListOfString(way.points.map(point => point.name))}</TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      // TODO : add dialog for show Details
                      //   {type: 'link', link: `/manager/ways/${way.id}`, text: 'عرض التفاصيل'},
                      {type: 'dialog', item: <WayDialog type='edit' triggerTitle='تعديل بيانات المسار' data={{name: way.name, points: way.points}} />}
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
      <CustomPagination pageSize={ways.pageSize} totalCount={ways.totalCount} currentPage={ways.currentPage} hasNext={ways.hasNext} hasPrevious={ways.hasPrevious} totalPages={ways.totalPages} />
    </>
  );
}
