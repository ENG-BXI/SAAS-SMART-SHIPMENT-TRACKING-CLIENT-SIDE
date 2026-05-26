'use client';

import React, { useState } from 'react';
import PageDashboardHeader from '@/components/dashboard/header';
import { toast } from 'sonner';

// استيراد المكونات الفرعية والبيانات المشتركة
import { PLANS, FAQS, Plan } from './_components/plans-data';
import CurrentSubscription from './_components/current-subscription';
import PricingPlans from './_components/pricing-plans';
import UpgradeDialog from './_components/upgrade-dialog';
import FAQSection from './_components/faq-section';

export default function MySubscriptionPage() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // حالة تمثيلية للباقة الحالية النشطة
  const [currentPlanId, setCurrentPlanId] = useState('yearly');

  const handleOpenUpgrade = (plan: Plan) => {
    if (plan.id === currentPlanId) return;
    setSelectedPlan(plan);
    setShowUpgradeModal(true);
    setIsSuccess(false);
  };

  const handleConfirmUpgrade = () => {
    setIsSubmitting(true);
    // محاكاة إرسال الطلب للسيرفر والرد بنجاح
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setCurrentPlanId(selectedPlan?.id || 'yearly');
      
      // إرسال توست نجاح
      try {
        toast.success(`تم تغيير اشتراكك بنجاح إلى ${selectedPlan?.name}`);
      } catch {
        console.log('Toast triggered:', selectedPlan?.name);
      }
    }, 1500);
  };

  // الحصول على بيانات الباقة الحالية النشطة
  const currentPlan = PLANS.find(p => p.id === currentPlanId) || PLANS[1];

  return (
    <div className="w-full pb-10 font-sans" dir="rtl">
      {/* هيدر الصفحة الرئيسي بنفس هوية لوحات التحكم */}
      <PageDashboardHeader 
        title="اشتراكاتي" 
        description="إدارة تفاصيل اشتراك شركتك الحالي، ومراجعة نوع الباقة والسعر وفترة الاشتراك، واستكشاف خيارات التجديد المتاحة." 
        breadcrumbList={[
          { text: 'الرئيسية', path: '/' },
          { text: 'إدارة النظام', path: '/settings' },
          { text: 'اشتراكاتي', path: '/my-subscription' }
        ]} 
      />

      {/* 1. تفاصيل الاشتراك الحالي (Current Subscription Details) */}
      <CurrentSubscription 
        plan={currentPlan} 
        currentPlanId={currentPlanId} 
      />

      {/* عنوان الباقات المتاحة */}
      <div className="mb-4 flex flex-col gap-1 border-b pb-3">
        <h3 className="text-lg font-semibold text-gray-900">الباقات والخطط المتاحة</h3>
        <p className="text-muted-foreground text-sm">
          اختر مدة الاشتراك المناسبة لشركتك. الباقات الحالية تعتمد على مدة الاشتراك والسعر فقط حسب بنية قاعدة البيانات.
        </p>
      </div>

      {/* 2. شبكة الباقات المتاحة */}
      <PricingPlans 
        plans={PLANS} 
        currentPlanId={currentPlanId} 
        onUpgradeClick={handleOpenUpgrade} 
      />

      {/* قسم الأسئلة الشائعة حول الفوترة والاشتراكات */}
      <FAQSection faqs={FAQS} />

      {/* 3. نافذة الاشتراك التفاعلية (Upgrade Dialog Modal) */}
      <UpgradeDialog 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
        selectedPlan={selectedPlan} 
        currentPlan={currentPlan} 
        isSubmitting={isSubmitting} 
        isSuccess={isSuccess} 
        onConfirm={handleConfirmUpgrade} 
      />
    </div>
  );
}
