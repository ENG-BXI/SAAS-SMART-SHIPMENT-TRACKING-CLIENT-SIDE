import {enUserRoleForSaasAdmin, UserRoleForSaasAdmin} from '@/lib/Constant/user-role';
import {getUser} from '@/lib/utils';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {JSX} from 'react';
import AdminNotes from './(admin)/admin-notes';
import ManagerNotes from './(manager)/manager-notes';
const AllPageContent: Record<UserRoleForSaasAdmin, (() => JSX.Element) | undefined> = {
  [enUserRoleForSaasAdmin.ADMIN]: AdminNotes,
  [enUserRoleForSaasAdmin.MANAGER]: ManagerNotes,
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
