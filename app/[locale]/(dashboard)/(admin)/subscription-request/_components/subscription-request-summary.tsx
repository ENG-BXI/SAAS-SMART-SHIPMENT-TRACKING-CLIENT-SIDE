import {Badge} from '@/components/ui/badge';
import {cn} from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface ISubscriptionRequestSummary {
  pendingCompanyCount: number;
  changeCompanyCount: number;
}




function SubscriptionRequestSummary({pendingCompanyCount, changeCompanyCount}: ISubscriptionRequestSummary) {
  const t = useTranslations('adminSubscriptionRequestPage');
  const totalCount = pendingCompanyCount + changeCompanyCount;
  const summaryCards = [
    {
      title: t('summary.pending.title'),
      description: t('summary.pending.description'),
      badge: 'pending'
    },
    {
      title: t('summary.change.title'),
      description: t('summary.change.description'),
      badge: 'change'
    },
    {
      title: t('summary.total.title'),
      description: t('summary.total.description'),
      badge: 'total'
    }
  ];

  const getCardValue = (badge: string) => {
    if (badge === 'pending') return pendingCompanyCount;
    if (badge === 'change') return changeCompanyCount;
    return totalCount;
  };

  const getBadgeClass = (badge: string) => {
    if (badge === 'pending') return 'bg-amber-100 text-amber-900 border border-amber-200';
    if (badge === 'change') return 'bg-cyan-100 text-cyan-900 border border-cyan-200';
    return 'bg-slate-100 text-slate-900 border border-slate-200';
  };

  return (
    <div className='grid gap-4 sm:grid-cols-3 mb-6'>
      {summaryCards.map(card => (
        <div key={card.title} className='rounded-3xl border border-slate-200 bg-card p-5'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <p className='text-sm text-muted-foreground'>{card.description}</p>
              <h4 className='mt-3 text-2xl font-semibold text-slate-900'>{getCardValue(card.badge)}</h4>
            </div>
            <Badge className={cn('text-xs uppercase tracking-[0.16em]', getBadgeClass(card.badge))}>{card.title}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SubscriptionRequestSummary;
