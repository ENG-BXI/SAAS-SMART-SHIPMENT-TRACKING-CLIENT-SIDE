import CustomButton from '@/components/custom-button';
import CustomPagination from '@/components/custom-pagination';
import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Filter} from 'lucide-react';
import UserDialog from './_components/user-dialog';
import {enUserRole, userRoleName} from '@/lib/Constant/user-role';
interface IUserForTable {
  id: string;
  name: string;
  email: string;
  role: enUserRole;
}
const listOfUsers: IUserForTable[] = [
  {
    id: '1',
    name: 'محمد احمد',
    email: 'mohamed@gmail.com',
    role: enUserRole.MANAGER
  },
  {
    id: '2',
    name: 'احمد محمد',
    email: 'ahmed@gmail.com',
    role: enUserRole.DRIVER
  },
  {
    id: '3',
    name: 'خالد محمد',
    email: 'khalid@gmail.com',
    role: enUserRole.EMPLOYEE
  }
];
const Page = () => {
  return (
    <div>
      <PageDashboardHeader title='المستخدمين' description='عرض وإدارة المستخدمين المسجلين على النظام، مع تحديد أدوارهم وصلاحياتهم المرتبطة بإدارة الشحنات والبيانات.' breadcrumbList={[{text: 'المستخدمين', path: '/manager/users'}]} />
      <DashboardSearchAndActionPage
        action={
          <div className='self-start flex gap-x-1'>
            <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
            <UserDialog type='add' triggerTitle='اضافة مستخدم جديد' />
          </div>
        }
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-start'>اسم المستخدم</TableHead>
            <TableHead className='text-start'>البريد الالكتروني</TableHead>
            <TableHead className='text-start'>الصلاحية</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listOfUsers?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            listOfUsers?.map(user => (
              <TableRow key={user.id}>
                <TableCell className='w-50'>{user.name}</TableCell>
                <TableCell className='w-60'>{user.email}</TableCell>
                {/* //TODO: add badge here by user role  */}
                <TableCell className=''>{userRoleName[user.role]}</TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      // TODO : add dialog for show Details
                      //   {type: 'link', link: `/manager/ways/${way.id}`, text: 'عرض التفاصيل'},
                      {type: 'dialog', item: <UserDialog type='edit' triggerTitle='تعديل بيانات المستخدم' data={{name: user.name, email: user.email, password: '', role: user.role}} />}
                      // {
                      //   type: 'dialog',
                      //   item: <DeleteDialog title='حذف المستخدم' triggerText='حذف المستخدم' description='هل انت متاكد من حذف المستخدم' onclick={() => {}} open={open} setOpen={setOpen} />
                      // }
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <CustomPagination pageSize={10} totalCount={100} currentPage={1} hasNext={true} hasPrevious={true} totalPages={10} />
    </div>
  );
};

export default Page;
