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
import DeleteClientDialog from './_components/delete-client-dialog';
import {ClientTableSkeleton} from './_components/skeletons';
import ClientRealTime from './_components/client-real-time';
import {getTranslations} from 'next-intl/server';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}
const Page = async ({searchParams}: PageProps) => {
  const sp = await searchParams;
  const t = await getTranslations('clientsPage');
  return (
    <div>
      <ClientRealTime />
      <PageDashboardHeader
        title={t('page.title')}
        description={t('page.description')}
        breadcrumbList={[
          {text: t('page.breadcrumb.home'), path: '/'},
          {text: t('page.breadcrumb.clients'), path: '/manager/clients'}
        ]}
      />
      <DashboardSearchAndActionPage
        action={
          <div className='self-start flex gap-x-1'>
            <CustomButton text={t('actions.filter')} type='secondary' icon={<Filter />} />
            <ClientDialog type='add' triggerTitle={t('dialog.add.title')} />{' '}
          </div>
        }
      />
      <Suspense fallback={<ClientTableSkeleton />}>
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
  const t = await getTranslations('clientsPage');
  const tEmpty = await getTranslations('tableEmpty');
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-start'>{t('table.headers.name')}</TableHead>
            <TableHead className='text-start'>{t('table.headers.contacts')}</TableHead>
            <TableHead className='text-start'>{t('table.headers.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients?.data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <TableEmpty text={tEmpty('clients')} action={<ClientDialog type='add' triggerTitle={t('dialog.add.title')} />} />
              </TableCell>
            </TableRow>
          ) : (
            clients?.data?.map(client => {
              const contactWaysAsText = client.contactWays.map(contactWay => contactWay.text).join(', ');
              const contactWays = client.contactWays.map(contactWay => ({text: contactWay.text, contactType: contactWay.contactType, isPrimary: contactWay.isPrimary.toString()}));
              return (
                <TableRow key={client.id}>
                  <TableCell className=''>{client.name}</TableCell>
                  <TableCell className=''>
                    {client.contactWays.length == 0 && t('table.empty')}
                    {contactWaysAsText.slice(0, 40)} {contactWaysAsText.length > 40 && '...'}
                  </TableCell>
                  <TableCell>
                    <TablePopover
                      items={[
                        {type: 'dialog', item: <ClientDialog type='view' triggerTitle={t('dialog.view.title')} id={client.id} data={{name: client.name, contactWays: contactWays}} />},
                        {type: 'dialog', item: <ClientDialog type='edit' triggerTitle={t('dialog.edit.title')} id={client.id} data={{name: client.name, contactWays: contactWays}} />},
                        {
                          type: 'dialog',
                          item: <DeleteClientDialog id={client.id} name={client.name} />
                        }
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
