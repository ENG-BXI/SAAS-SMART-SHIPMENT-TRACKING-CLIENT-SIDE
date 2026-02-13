import {Card, CardContent, CardHeader, CardTitle} from '@/app/_components/ui/card';
import {Separator} from '@/app/_components/ui/separator';
import CustomInputWithLabelForViewPage from '@/app/_components/CustomInputWithLabelForViewPage';
import {ICompanyWithSubscription} from '../_interfaces/ICompanyWithSubscription';
import UploadImage from '../[id]/_components/UploadImage';
function CompanyForm({company}: {company: ICompanyWithSubscription}) {
  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>المعلومات الاساسية</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-y-3'>
        <CustomInputWithLabelForViewPage label='اسم الشركة' value={company.name} />
        <Separator />
        <CustomInputWithLabelForViewPage label='موقع الشركة' value={company.location} />
        <Separator />
        <CustomInputWithLabelForViewPage label='البريد الالكتروني' value={company.companyEmail} />
        <Separator />
        <CustomInputWithLabelForViewPage label='عدد العملاء' value={company.numberOfClient} />
        <Separator />
        <h3>معلومات الاشتراك</h3>
        <CustomInputWithLabelForViewPage label='نوع الاشتراك' value={company.subscriptionType} />
        <Separator />
        <CustomInputWithLabelForViewPage label='بداية الاشتراك' value={company.subscriptionStartDate} />
        <Separator />
        <CustomInputWithLabelForViewPage label='نهاية الاشتراك' value={company.subscriptionEndDate} />
        <Separator />
        <UploadImage />
      </CardContent>
    </Card>
  );
}

export default CompanyForm;
