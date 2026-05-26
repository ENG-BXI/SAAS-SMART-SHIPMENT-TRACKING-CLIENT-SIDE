import React from 'react';
import { X, CreditCard, ArrowLeftRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { Plan } from './plans-data';

interface UpgradeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: Plan | null;
  currentPlan: Plan;
  isSubmitting: boolean;
  isSuccess: boolean;
  onConfirm: () => void;
}

export default function UpgradeDialog({
  isOpen,
  onClose,
  selectedPlan,
  currentPlan,
  isSubmitting,
  isSuccess,
  onConfirm
}: UpgradeDialogProps) {
  if (!isOpen || !selectedPlan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200" dir="rtl">
        
        {/* رأس المودال */}
        <div className="p-6 pb-4 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <ArrowLeftRight className="h-5 w-5 text-[#1B8354]" />
            <h3 className="font-bold text-lg text-gray-900">تأكيد تغيير الاشتراك</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* محتوى المودال */}
        <div className="p-6 space-y-5">
          {!isSuccess ? (
            <>
              <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-medium">الاشتراك الحالي</span>
                  <span className="font-bold text-gray-700">{currentPlan.name} (${currentPlan.price}/{currentPlan.billingCycle})</span>
                </div>
                <div className="flex justify-between items-center text-xs text-emerald-700 font-semibold bg-emerald-50/50 p-2 rounded-lg border border-emerald-100/50">
                  <span>الاشتراك الجديد</span>
                  <span className="font-extrabold">{selectedPlan.name} (${selectedPlan.price}/{selectedPlan.billingCycle})</span>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-xs text-gray-800">تفاصيل الدفع والفوترة:</h5>
                <div className="border border-gray-100 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">طريقة الدفع المستخدمة</span>
                    <span className="font-semibold text-gray-800 flex items-center gap-x-1">
                      <CreditCard className="h-3.5 w-3.5 text-gray-400" />
                      فيزا (4242****)
                    </span>
                  </div>
                  <div className="h-px bg-gray-50" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">مجموع المبلغ المستحق الآن</span>
                    <span className="font-bold text-gray-900">${selectedPlan.price} دولار</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-x-2 bg-amber-50 border border-amber-100 p-3 rounded-lg text-amber-800 text-xs">
                <AlertCircle className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  بالنقر على زر التأكيد أدناه، سيتم طلب تغيير اشتراك شركتك إلى <strong>{selectedPlan.name}</strong> وفق مدة وسعر الباقة المحددين في النظام.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="inline-flex p-3 bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-full animate-bounce">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-lg text-gray-900">تم تحديث الاشتراك بنجاح</h4>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  تم تغيير اشتراك شركتك إلى <strong>{selectedPlan.name}</strong>، وسيظهر نوع الاشتراك والسعر والمدة حسب بيانات الباقة.
                </p>
              </div>
              <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-lg text-emerald-800 text-xs inline-block">
                تم إرسال فاتورة الاشتراك لبريدك الإلكتروني المسجل.
              </div>
            </div>
          )}
        </div>

        {/* أزرار الإجراءات بالأسفل */}
        <div className="p-6 pt-4 border-t border-gray-50 bg-gray-50/50 flex gap-x-3 justify-end">
          {!isSuccess ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 rounded-xl text-xs font-bold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                إلغاء الأمر
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isSubmitting}
                className="py-2 px-5 rounded-xl text-xs font-bold bg-[#1B8354] hover:bg-[#156742] text-white transition-colors cursor-pointer flex items-center gap-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    جاري معالجة الطلب...
                  </>
                ) : (
                  <>تأكيد ودفع</>
                )}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#1B8354] hover:bg-[#156742] text-white transition-colors cursor-pointer"
            >
              الذهاب للوحة التحكم واستخدام المزايا
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
