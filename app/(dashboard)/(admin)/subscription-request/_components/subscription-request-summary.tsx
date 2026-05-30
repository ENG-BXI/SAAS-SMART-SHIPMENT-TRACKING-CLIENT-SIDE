import {Badge} from '@/components/ui/badge';
import {cn} from '@/lib/utils';
import {ISubscriptionRequest} from '../_services/get-subscription-requests';

interface ISubscriptionRequestSummary {
  pendingCompanyCount: number;
  changeCompanyCount: number;
}

const summaryCards = [
  {
    title: 'الطلبات المعلقة',
    description: 'طلبات التفعيل الجديدة في حالتها المعلقة',
    badge: 'pending'
  },
  {
    title: 'طلبات تغيير الباقة',
    description: 'شركات طلبت الانتقال إلى باقة جديدة',
    badge: 'change'
  },
  {
    title: 'الطلبات الإجمالية',
    description: 'عدد طلبات الاشتراك المعلقة حالياً',
    badge: 'total'
  }
];

function SubscriptionRequestSummary({pendingCompanyCount, changeCompanyCount}: ISubscriptionRequestSummary) {
  const totalCount = pendingCompanyCount + changeCompanyCount;

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
