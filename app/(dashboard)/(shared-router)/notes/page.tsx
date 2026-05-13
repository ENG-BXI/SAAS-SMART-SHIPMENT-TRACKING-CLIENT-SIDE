import {enUserRoleForSaasAdmin, UserRoleForSaasAdmin} from '@/lib/Constant/user-role';
import {getUser} from '@/lib/utils';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {ReactNode} from 'react';
import AdminNotes from './(admin)/admin-notes';
import ManagerNotes from './(manager)/manager-notes';
interface AllPageContentProps {
  search?: string;
  page?: string;
}
function AllPageContent(searchParams: AllPageContentProps): Record<UserRoleForSaasAdmin, ReactNode | undefined> {
  const {page, search} = searchParams;
  return {
    [enUserRoleForSaasAdmin.ADMIN]: <AdminNotes />,
    [enUserRoleForSaasAdmin.MANAGER]: <ManagerNotes searchParams={{page, search}} />,
    [enUserRoleForSaasAdmin.EMPLOYEE]: <ManagerNotes searchParams={{page, search}} />,
    [enUserRoleForSaasAdmin.DRIVER]: undefined
  };
}
interface PageProps {
  searchParams: Promise<{search?: string; page?: string}>;
}
const Page = async ({searchParams}: PageProps) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  if (!token) {
    return redirect('/unauthorized');
  }
  const sp = await searchParams;
  const user = getUser(token);
  if (!user) {
    return redirect('/unauthorized');
  }
  const PageContent = AllPageContent(sp)[user.role];

  if (!PageContent) {
    return redirect('/unauthorized');
  }
  if (!PageContent) return null;
  return <div>{PageContent}</div>;
};

export default Page;
