import CustomButton from '@/components/custom-button';
import CustomPagination from '@/components/custom-pagination';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Filter} from 'lucide-react';
import ClientDialog from './_components/client-dialog';
import GetAllClient from './_services/get-all-client';
import {cookies} from 'next/headers';
import {Suspense} from 'react';
interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}
const Page = async ({searchParams}: PageProps) => {
  const sp = await searchParams;
  return (
    <div>
      <PageDashboardHeader title='العملاء' description='عرض وإدارة قائمة العملاء المسجلين على النظام، مع إمكانية ربطهم بالشحنات ومتابعة نشاطهم المرتبط بعمليات الشحن.' breadcrumbList={[{text: 'العملاء', path: '/manager/clients'}]} />
      <DashboardSearchAndActionPage
        action={
          <div className='self-start flex gap-x-1'>
            <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
            <ClientDialog type='add' triggerTitle='اضافة عميل جديدة' />
          </div>
        }
      />
      <Suspense fallback={'Loading ...'}>
        <ClientTableAndPagination search={sp.search} page={sp.page} />
      </Suspense>
    </div>
  );
};

export default Page;
interface ClientTableAndPaginationProps {
  search?: string;
  page?: string;
}
async function ClientTableAndPagination({search, page}: ClientTableAndPaginationProps) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const clients = await GetAllClient({token, search, page});
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-start'>اسم العميل</TableHead>
            <TableHead className='text-start'>طرق التواصل</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients?.data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            clients?.data?.map(client => {
              const contactWays = client.contactWays.map(contactWay => contactWay.text).join(', ');
              return (
                <TableRow key={client.id}>
                  <TableCell className=''>{client.name}</TableCell>
                  <TableCell className=''>
                    {client.contactWays.length == 0 && 'لا يوجد طرق تواصل'}
                    {contactWays.slice(0, 40)} {contactWays.length > 40 && '...'}
                  </TableCell>
                  <TableCell>
                    <TablePopover
                      items={[
                        // TODO: add Dialog to show client details
                        // {type: 'link', link: `/manager/clients/${client.id}`, text: 'عرض التفاصيل'},
                        {type: 'dialog', item: <ClientDialog type='edit' triggerTitle='تعديل بيانات العميل' data={{name: client.name, contactWays: client.contactWays.map(contactWay => ({text: contactWay.text, contactType: contactWay.contactType, isPrimary: contactWay.isPrimary.toString()}))}} />}
                        // {
                        //   type: 'dialog',
                        //   item: <DeleteDialog title='حذف العميل' triggerText='حذف العميل' description='هل انت متاكد من حذف العميل' onclick={() => {}} open={open} setOpen={setOpen} />
                        // }
                      ]}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      <CustomPagination pageSize={clients.pageSize} totalCount={clients.totalCount} currentPage={clients.currentPage} hasNext={clients.hasNext} hasPrevious={clients.hasPrevious} totalPages={clients.totalPages} />
    </>
  );
}
