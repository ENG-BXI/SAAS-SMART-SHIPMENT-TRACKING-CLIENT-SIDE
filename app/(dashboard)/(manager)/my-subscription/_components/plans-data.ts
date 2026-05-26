import {CalendarDays, CalendarRange, LucideIcon} from 'lucide-react';

export interface PlanFeature {
  text: string;
  available: boolean;
}

export interface Plan {
  id: string;
  name: string;
  enName: string;
  price: string;
  billingCycle: string;
  durationText: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  features: PlanFeature[];
  isCurrent: boolean;
  isPopular?: boolean;
  buttonText: string;
  badgeText?: string;
  badgeStyle?: string;
}

export const PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'الاشتراك الشهري',
    enName: 'Monthly Plan',
    price: '150',
    billingCycle: 'شهري',
    durationText: 'مدة الاشتراك شهر واحد',
    description: 'خيار مرن لتشغيل النظام وتجديد الاشتراك بشكل شهري حسب احتياج الشركة.',
    icon: CalendarDays,
    iconColor: 'text-blue-600 bg-blue-50 border-blue-100',
    features: [
      {text: 'تجديد شهري تلقائي أو يدوي حسب إعدادات الاشتراك', available: true},
      {text: 'الوصول إلى خدمات إدارة الشحنات والعملاء داخل النظام', available: true},
      {text: 'إمكانية تغيير نوع الاشتراك عند انتهاء الفترة الحالية', available: true},
      {text: 'مناسب للشركات التي تفضل الالتزام قصير المدى', available: true}
    ],
    isCurrent: false,
    buttonText: 'اختيار الاشتراك الشهري',
    badgeText: 'مرونة شهرية',
    badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'yearly',
    name: 'الاشتراك السنوي',
    enName: 'Yearly Plan',
    price: '1500',
    billingCycle: 'سنوي',
    durationText: 'مدة الاشتراك سنة كاملة',
    description: 'خيار مناسب للشركات المستقرة التي تريد تفعيل النظام لفترة أطول وتجديد أقل تكراراً.',
    icon: CalendarRange,
    iconColor: 'text-[#1B8354] bg-[#1B8354]/10 border-[#1B8354]/20',
    features: [
      {text: 'تجديد سنوي بفترة اشتراك أطول', available: true},
      {text: 'الوصول إلى خدمات إدارة الشحنات والعملاء داخل النظام', available: true},
      {text: 'تقليل تكرار عمليات التجديد والفوترة', available: true},
      {text: 'مناسب للشركات التي تعتمد على النظام بشكل دائم', available: true}
    ],
    isCurrent: true,
    isPopular: true,
    buttonText: 'باقتك الحالية',
    badgeText: 'الأفضل للاستمرار',
    badgeStyle: 'bg-[#1B8354]/15 text-[#1B8354] border-[#1B8354]/30'
  },
  {
    id: '3yearly',
    name: 'الاشتراك لثلاث سنين',
    enName: '3 Year Plan',
    price: '2500',
    billingCycle: 'سنوي',
    durationText: 'مدة الاشتراك ثلاث سنوات كاملة',
    description: 'خيار مناسب للشركات المستقرة التي تريد تفعيل النظام لفترة أطول وتجديد أقل تكراراً.',
    icon: CalendarRange,
    iconColor: 'text-[#1B8354] bg-[#1B8354]/10 border-[#1B8354]/20',
    features: [
      {text: 'تجديد سنوي بفترة اشتراك أطول', available: true},
      {text: 'الوصول إلى خدمات إدارة الشحنات والعملاء داخل النظام', available: true},
      {text: 'تقليل تكرار عمليات التجديد والفوترة', available: true},
      {text: 'مناسب للشركات التي تعتمد على النظام بشكل دائم', available: true}
    ],
    isCurrent: true,
    isPopular: true,
    buttonText: 'باقتك الحالية',
    badgeText: 'الأفضل للاستمرار',
    badgeStyle: 'bg-[#1B8354]/15 text-[#1B8354] border-[#1B8354]/30'
  },

];

export const FAQS = [
  {
    q: 'هل يمكنني تغيير باقة اشتراكي في أي وقت؟',
    a: 'نعم، يمكن تعديل نوع الاشتراك بين الشهري والسنوي بحسب آلية النظام وفترة الاشتراك الحالية.'
  },
  {
    q: 'ما البيانات التي تظهر في تفاصيل الباقة؟',
    a: 'تعرض الصفحة نوع الاشتراك والسعر وفترة الاشتراك لأنها البيانات المتوفرة في نموذج الباقات الحالي.'
  },
  {
    q: 'هل توجد رسوم خفية أو عقود طويلة الأجل؟',
    a: 'الواجهة تعرض السعر ونوع الاشتراك كما هما في بيانات الباقة، وأي تفاصيل دفع إضافية تعتمد على إعدادات النظام.'
  }
];
