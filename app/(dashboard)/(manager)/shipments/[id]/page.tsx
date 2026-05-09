import DashboardSearchAndActionPage from '@/components/dashboard/dashboard-search-and-action-page';
import PageDashboardHeader from '@/components/dashboard/header';
import ShipmentDetailsHeader from './_components/shipment-details-header';
import ShipmentInfo from './_components/shipment-info';
import ShipmentTableAndPagination from './_components/shipment-table-and-pagination';
import ShipmentItemDialog from './_components/shipment-item-dialog';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ search?: string; page?: string }>;
}
const Page = async ({params, searchParams}: PageProps) => {
  const {id} = await params;
  const {search, page} = await searchParams;
  return (
    <div>
      <PageDashboardHeader
        title='تفاصيل الشحنة'
        description='عرض معلومات الشحنة وحالتها الحالية، مع الاطلاع على سجل التتبع الكامل والتحديثات المرتبطة بها.'
        breadcrumbList={[
          {text: 'الشحنات', path: '/manager/shipments'},
          {text: 'تفاصيل الشحنة', path: '1'}
        ]}
      />
      <ShipmentDetailsHeader id={id} />
      <ShipmentInfo id={id} />
      <PageDashboardHeader title='اغراض الشحنة' description='عرض قائمة الأغراض المرفقة ضمن الشحنة، مع تفاصيل كل غرض من حيث الوصف والكمية وأي ملاحظات مرتبطة به.' hasAction actions={<ShipmentItemDialog shipmentId={id} triggerTitle='اضافة عميل للشحنة' type='add' />} />
      <DashboardSearchAndActionPage />
      <ShipmentTableAndPagination id={id} search={search} page={page} />
    </div>
  );
};

export default Page;
