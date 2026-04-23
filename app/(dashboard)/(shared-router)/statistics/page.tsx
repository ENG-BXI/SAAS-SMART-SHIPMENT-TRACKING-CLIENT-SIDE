import {enUserRoleForSaasAdmin, UserRoleForSaasAdmin} from '@/lib/Constant/user-role';
import {getUser} from '@/lib/utils';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import StatisticsAdminPage from '@/app/(dashboard)/(shared-router)/statistics/(admin)/StatisticsAdminPage';
import StatisticsManagerPage from '@/app/(dashboard)/(shared-router)/statistics/(manager)/StatisticsManagerPage';
import {JSX} from 'react';
const AllPageContent: Record<UserRoleForSaasAdmin, (() => JSX.Element) | undefined> = {
  [enUserRoleForSaasAdmin.ADMIN]: StatisticsAdminPage,
  [enUserRoleForSaasAdmin.MANAGER]: StatisticsManagerPage,
  [enUserRoleForSaasAdmin.EMPLOYEE]: undefined,
  [enUserRoleForSaasAdmin.DRIVER]: undefined
};
const Page = async () => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;

  if (!token) {
    return redirect('/unauthorized');
  }
  const user = getUser(token);
  if (!user) {
    return redirect('/unauthorized');
  }
  const PageContent = AllPageContent[user.role];

  if (!PageContent) {
    return redirect('/unauthorized');
  }
  return (
    <div>
      <PageContent />
    </div>
  );
};

export default Page;
