'use client';
import { Link } from '@/i18n/navigation';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {formattedDate} from '@/lib/utils';
import {SUBSCRIPTION_STATUS, SUBSCRIPTION_TEXT} from '@/lib/Constant/enum';
import {ICompany} from '../_services/get-subscription-requests';
import {useTransition} from 'react';
import {acceptCompany} from '../_actions';
import {toast} from 'sonner';

interface ISubscriptionRequestCard {
  company: ICompany;
}
// TODO : Add Show bill
function SubscriptionRequestCard({company}: ISubscriptionRequestCard) {
  const isChangeRequest = company.subscription.status === SUBSCRIPTION_STATUS.CHANGE;
  const t = useTranslations('adminSubscriptionRequestPage');
  const tShared = useTranslations('shared');
  const label = isChangeRequest ? t('card.requestTypeChange') : t('card.requestTypeNew');
  const isYearly = company.subscription.type.durationByMonth >= 12;
  const duration = isYearly ? company.subscription.type.durationByMonth / 12 : company.subscription.type.durationByMonth;
  const [isPending, startTransition] = useTransition();
  function handleAcceptCompany() {
    const subscriptionType = company.subscription.newTypeId ? company.subscription.newTypeId : company.subscription.type.id;
    startTransition(async () => {
      const {error, message} = await acceptCompany(company.id, subscriptionType);
      if (error) toast.error(message);
      else toast.success(message);
    });
  }

  return (
    <Card className='border border-slate-200/80 bg-card shadow-sm'>
      <CardHeader className='flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between'>
        <div>
          <CardTitle className='text-lg font-semibold text-slate-900'>{company.name}</CardTitle>
          <CardDescription className='text-sm text-slate-500'>
            {company.location} · {company.users[0].email}
          </CardDescription>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <Badge variant='outline' className='px-3 py-1 text-xs tracking-[0.12em]'>
            {label}
          </Badge>
          <Badge variant={isChangeRequest ? 'secondary' : 'default'} className='px-3 py-1 text-xs tracking-[0.12em]'>
            {SUBSCRIPTION_TEXT[company.subscription.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='grid gap-4 sm:grid-cols-2'>
        <div className='rounded-2xl border border-slate-200/80 bg-slate-50 p-4'>
          <p className='text-sm text-muted-foreground'>{t('card.requiredPlan')}</p>
          <p className='mt-2 text-base font-semibold text-slate-900'>{company.subscription.type.type}</p>
          <p className='mt-4 text-sm text-muted-foreground'>{t('card.planPrice')}</p>
          <p className='text-base font-semibold text-slate-900'>{`${company.subscription.type.price} ${tShared('currencyRiyal')}`}</p>
        </div>
        <div className='rounded-2xl border border-slate-200/80 bg-slate-50 p-4'>
          <p className='text-sm text-muted-foreground'>{t('card.duration')}</p>
          <p className='mt-2 text-base font-semibold text-slate-900'>{isYearly ? `${duration} ${t('card.year')}` : `${duration} ${t('card.month')}`}</p>
          <p className='mt-4 text-sm text-muted-foreground'>{t('card.subscriptionStart')}</p>
          <p className='text-base font-semibold text-slate-900'>{company.subscription.startDate ? formattedDate(company.subscription.startDate) : t('card.notSet')}</p>
          <p className='mt-4 text-sm text-muted-foreground'>{t('card.subscriptionEnd')}</p>
          <p className='text-base font-semibold text-slate-900'>{company.subscription.endDate ? formattedDate(company.subscription.endDate) : t('card.notSet')}</p>
        </div>
      </CardContent>
      <CardFooter className='flex flex-wrap items-center gap-3'>
        <Button asChild variant='outline' size='sm'>
          <Link href={`/company/${company.id}`}>{t('card.viewCompany')}</Link>
        </Button>
        <Button size='sm' onClick={handleAcceptCompany} disabled={isPending} className='bg-custom-primary-color'>
          {t('card.acceptAndActivate')}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SubscriptionRequestCard;
