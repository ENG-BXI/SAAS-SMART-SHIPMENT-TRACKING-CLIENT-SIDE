import React from 'react';
import {userRoleName} from '@/lib/Constant/user-role';
import {GetAllUsers} from '../_services/get-all-users';
import {cookies} from 'next/headers';
import {TableEmpty} from '@/components/table-empty';
import TablePopover from '@/components/table-popover';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import CustomPagination from '@/components/custom-pagination';
import UserDialog from './user-dialog';
import DeleteUserDialog from './delete-user-dialog';

async function UserTableAndPagination({search, page}: {search: string; page: string}) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const response = await GetAllUsers(token, search, page);

  return (
    <>
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
          {response.data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <TableEmpty />
              </TableCell>
            </TableRow>
          ) : (
            response.data?.map(user => (
              <TableRow key={user.id}>
                <TableCell className='w-50'>{user.userName}</TableCell>
                <TableCell className='w-60'>{user.email}</TableCell>
                {/* //TODO: add badge here by user role  */}
                <TableCell className=''>{userRoleName[user.role]}</TableCell>
                <TableCell>
                  <TablePopover
                    items={[
                      // TODO : add dialog for show Details
                      //   {type: 'link', link: `/manager/ways/${way.id}`, text: 'عرض التفاصيل'},
                      {type: 'dialog', item: <UserDialog type='edit' id={user.id} triggerTitle='تعديل بيانات المستخدم' data={{name: user.userName, email: user.email, password: '', role: user.role}} />},
                      {
                        type: 'dialog',
                        item: <DeleteUserDialog id={user.id} />
                      }
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <CustomPagination pageSize={response.pageSize} totalCount={response.totalCount} currentPage={response.currentPage} hasNext={response.hasNext} hasPrevious={response.hasPrevious} totalPages={response.totalPages} />
    </>
  );
}

export default UserTableAndPagination;
