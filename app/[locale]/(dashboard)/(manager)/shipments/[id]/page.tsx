import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import ShipmentDetailsHeader from './_components/shipment-details-header';
import ShipmentInfo from './_components/shipment-info';
import ShipmentTableAndPagination from './_components/shipment-table-and-pagination';
import ShipmentItemDialog from './_components/shipment-item-dialog';
import ShipmentDetailsRealTime from './_components/shipment-details-real-time';
import {getTranslations} from 'next-intl/server';

interface PageProps {
  params: Promise<{id: string}>;
  searchParams: Promise<{search?: string; page?: string}>;
}
const Page = async ({params, searchParams}: PageProps) => {
  const {id} = await params;
  const {search, page} = await searchParams;
  const t = await getTranslations('shipmentDetails.page');
  const tBread = await getTranslations('shipmentDetails.breadcrumb');
  const tSections = await getTranslations('shipmentDetails.sections');
  const tActions = await getTranslations('shipmentDetails.actions');
  return (
    <div>
      <ShipmentDetailsRealTime id={id} />
      <PageDashboardHeader
        title={t('title')}
        description={t('description')}
        breadcrumbList={[
          {text: tBread('shipments'), path: '/shipments'},
          {text: tBread('details'), path: `/shipments/${id}`}
        ]}
      />
      <ShipmentDetailsHeader id={id} />
      <ShipmentInfo id={id} />
      <PageDashboardHeader title={tSections('items.title')} description={tSections('items.description')} hasAction actions={<ShipmentItemDialog shipmentId={id} triggerTitle={tActions('addItem')} type='add' />} />
      <DashboardSearchAndActionPage />
      <ShipmentTableAndPagination id={id} search={search} page={page} />
    </div>
  );
};

export default Page;
