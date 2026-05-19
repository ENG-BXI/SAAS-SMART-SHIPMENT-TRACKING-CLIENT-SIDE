import {enUserRoleForSaasAdmin, UserRoleForSaasAdmin} from '@/lib/Constant/user-role';
import {getUser} from '@/lib/utils';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import StatisticsAdminPage from '@/app/(dashboard)/(shared-router)/statistics/(admin)/StatisticsAdminPage';
import StatisticsManagerPage from '@/app/(dashboard)/(shared-router)/statistics/(manager)/StatisticsManagerPage';
import {JSX, ReactNode} from 'react';
function AllPageContent(searchParams?: {page?: string}): Record<UserRoleForSaasAdmin, ReactNode | undefined> {
  return {
    [enUserRoleForSaasAdmin.ADMIN]: <StatisticsAdminPage />,
    [enUserRoleForSaasAdmin.MANAGER]: <StatisticsManagerPage searchParams={searchParams!} />,
    [enUserRoleForSaasAdmin.EMPLOYEE]: <StatisticsManagerPage searchParams={searchParams!} />,
    [enUserRoleForSaasAdmin.DRIVER]: undefined
  };
}
interface StatisticsManagerPageProps {
  searchParams: Promise<{page: string}>;
}
const Page = async ({searchParams}: StatisticsManagerPageProps) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const {page} = await searchParams;
  if (!token) {
    return redirect('/unauthorized');
  }
  const user = getUser(token);
  if (!user) {
    return redirect('/unauthorized');
  }
  const PageContent = AllPageContent({page})[user.role];

  if (!PageContent) {
    return redirect('/unauthorized');
  }
  return <div>{PageContent}</div>;
};

export default Page;
