import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import { Plan } from './plans-data';

interface PricingPlansProps {
  plans: Plan[];
  currentPlanId: string;
  onUpgradeClick: (plan: Plan) => void;
}

export default function PricingPlans({ plans, currentPlanId, onUpgradeClick }: PricingPlansProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-14 max-w-6xl mx-auto">
      {plans.map((plan) => {
        const isCurrent = plan.id === currentPlanId;
        const IconComponent = plan.icon;
        
        return (
          <div 
            key={plan.id}
            className={`relative bg-white rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
              isCurrent 
                ? 'border-[#1B8354] shadow-md ring-2 ring-[#1B8354]/10 scale-[1.01]' 
                : 'border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md'
            }`}
          >
            {/* إشارة التميز للباقة الاحترافية أو الباقة الحالية */}
            {plan.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <Badge className="bg-[#1B8354] text-white text-xs px-3.5 py-1 border-none font-bold rounded-full shadow-sm flex items-center gap-x-1">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                  {plan.badgeText}
                </Badge>
              </div>
            )}
            
            {isCurrent && !plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-gray-800 text-white text-xs px-3.5 py-0.5 border-none font-semibold rounded-full">
                  باقتك الحالية
                </Badge>
              </div>
            )}

            {/* تفاصيل رأس الباقة */}
            <div className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl border ${plan.iconColor}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <Badge variant="outline" className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${plan.badgeStyle}`}>
                  {plan.enName}
                </Badge>
              </div>

              <div className="mt-4 space-y-1">
                <h4 className="text-lg font-bold text-gray-900">{plan.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed h-12 overflow-hidden">
                  {plan.description}
                </p>
              </div>

              {/* السعر */}
              <div className="mt-5 flex items-baseline gap-x-1">
                <span className="text-4xl font-extrabold text-gray-950">${plan.price}</span>
                <span className="text-sm font-medium text-muted-foreground">/ {plan.billingCycle}</span>
              </div>

              <div className="mt-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700">
                {plan.durationText}
              </div>

              <div className="h-px bg-gray-50 my-5" />

              {/* قائمة المزايا */}
              <ul className="space-y-3">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-x-2.5 text-sm">
                    <Check className="h-4.5 w-4.5 text-[#1B8354] shrink-0 mt-0.5" />
                    <span className={feature.available ? 'text-gray-700 font-medium' : 'text-gray-400 line-through'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* زر الاشتراك بالأسفل */}
            <div className="p-6 pt-4 mt-auto">
              <button
                type="button"
                onClick={() => onUpgradeClick(plan)}
                disabled={isCurrent}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-x-2 ${
                  isCurrent 
                    ? 'bg-gray-50 border border-gray-200 text-gray-400 cursor-not-allowed font-medium'
                    : plan.isPopular
                      ? 'bg-[#1B8354] text-white hover:bg-[#156742] shadow-sm hover:shadow-md'
                      : 'bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {isCurrent ? (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    باقتك الحالية النشطة
                  </>
                ) : (
                  <>
                    اختيار هذه الباقة
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
