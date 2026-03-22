'use client';
import CustomButton from '@/components/custom-button';
import CustomPagination from '@/components/custom-pagination';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import PageDashboardHeader from '@/components/dashboard/header';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Filter} from 'lucide-react';
import {useState} from 'react';
import ClientDialog from './_components/client-dialog';
interface IClient {
  id: string;
  name: string;
  contactWay: string;
}
const listOfClients: IClient[] = [
  {
    id: '1',
    name: 'العميل 1',
    contactWay: 'طريقة التواصل 1'
  },
  {
    id: '2',
    name: 'العميل 2',
    contactWay: 'طريقة التواصل 2'
  },
  {
    id: '3',
    name: 'العميل 3',
    contactWay: 'طريقة التواصل 3'
  }
];
const Page = () => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  return (
    <div>
      <PageDashboardHeader title='العملاء' description='عرض وإدارة قائمة العملاء المسجلين على النظام، مع إمكانية ربطهم بالشحنات ومتابعة نشاطهم المرتبط بعمليات الشحن.' breadcrumbList={[{text: 'العملاء', path: '/manager/clients'}]} />
      <DashboardSearchAndActionPage
        value={search}
        setValue={setSearch}
        action={
          <div className='self-start flex gap-x-1'>
            <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
            <ClientDialog type='add' triggerTitle='اضافة عميل جديدة' />
          </div>
        }
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-start'>اسم العميل</TableHead>
            <TableHead className='text-start'>طريقة التواصل</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listOfClients?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            listOfClients?.map(client => (
              <TableRow key={client.id}>
                <TableCell className=''>{client.name}</TableCell>
                <TableCell className=''>{client.contactWay}</TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      {type: 'link', link: `/manager/clients/${client.id}`, text: 'عرض التفاصيل'},
                      {type: 'dialog', item: <ClientDialog type='edit' triggerTitle='تعديل بيانات العميل' data={{name: client.name, contactWays: [{contactWay: client.contactWay, contactType: 'phoneNumber', isPrimary: 'false'}]}} />},
                      {
                        type: 'dialog',
                        item: <DeleteDialog title='حذف العميل' triggerText='حذف العميل' description='هل انت متاكد من حذف العميل' onclick={() => {}} open={open} setOpen={setOpen} />
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
};




export default Page;
