import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import CustomInputWithLabelForViewPage from '@/components/custom-input-with-label-for-view-page';
import {ICompanyWithSubscription} from '../_interfaces/company-with-subscription';
import { formattedDate } from '@/lib/utils';
import { useTranslations } from 'next-intl';

function CompanyForm({company}: {company: ICompanyWithSubscription}) {
  const t = useTranslations('adminCompanyDetailPage.companyForm');
  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>{t('basicInfo')}</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-y-3'>
        <CustomInputWithLabelForViewPage label={t('companyName')} value={company.name} />
        <Separator />
        <CustomInputWithLabelForViewPage label={t('companyLocation')} value={company.location} />
        <Separator />
        <CustomInputWithLabelForViewPage label={t('email')} value={company.companyEmail} />
        <Separator />
        <CustomInputWithLabelForViewPage label={t('clientsCount')} value={company.numberOfClient} />
        <Separator />
        <h3>{t('subscriptionInfo')}</h3>
        <CustomInputWithLabelForViewPage label={t('subscriptionType')} value={company.subscriptionType} />
        <Separator />
        <CustomInputWithLabelForViewPage label={t('subscriptionStart')} value={formattedDate(company.subscriptionStartDate)} />
        <Separator />
        <CustomInputWithLabelForViewPage label={t('subscriptionEnd')} value={formattedDate(company.subscriptionEndDate)} />
        <Separator />
      </CardContent>
    </Card>
  );
}

export default CompanyForm;
