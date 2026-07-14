import {ElementType} from 'react';
import {Bell, Map, MessageSquare, Package, Route, Truck, Users} from 'lucide-react';
interface ServicesItem {
  icon: ElementType;
  title: string;
  description: string;
}

const listServiceItems: ServicesItem[] = [
  {
    icon: Map,
    title: 'تتبع الشحنات',
    description: 'صفحة خاصة للعملاء لمعرفة حالة الشحنة والموقع الحالي والنقطة القادمة وعدد نقاط الرحلة.'
  },
  {
    icon: Users,
    title: 'إدارة العملاء',
    description: 'تمكين كل شركة من إدارة جميع عملائها وبياناتهم وشحناتهم ومتابعة عمليات التوصيل بسهولة.'
  },
  {
    icon: Route,
    title: 'إدارة خطوط الشحن',
    description: 'إنشاء خطوط شحن مخصصة تحتوي على عدة نقاط ومناطق لتنظيم حركة الشحنات.'
  },
  {
    icon: Truck,
    title: 'إدارة السائقين',
    description: 'إضافة السائقين وربطهم بالشحنات المسؤولة عنهم مع تطبيق جوال خاص لمتابعة الرحلات.'
  },
  {
    icon: Package,
    title: 'إنشاء الشحنات بسهولة',
    description: 'إنشاء الشحنات وتحديد الخط والسائق وإضافة العملاء وأغراضهم بشكل منظم وسريع.'
  },
  {
    icon: Bell,
    title: 'إشعارات تلقائية للعملاء',
    description: 'إرسال رسائل للعملاء عند انتقال الشحنة من نقطة إلى أخرى مع رابط متابعة الشحنة.'
  },
  {
    icon: MessageSquare,
    title: 'الملاحظات والاقتراحات',
    description: 'إمكانية إرسال الملاحظات والاقتراحات والمشاكل لتحسين المنصة وتطوير الخدمات.'
  }
];
const Services = () => {
  return (
    <section id='services' className='my-20 flex flex-col items-center px-5 container mx-auto'>
      <h6 className='mb-2 text-xl text-custom-primary-color'>Our Services</h6>

      <h2 className='section__title text-center'>Trusted Logistics Partner for Worldwide Shipping</h2>

      <div className='mt-10 grid w-full grid-cols-1 gap-5 md:grid-cols-2'>
        {listServiceItems.map((item, index) => (
          <ServicesItem key={item.title} {...item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;

function ServicesItem({title, icon, description, index}: ServicesItem & {index: number}) {
  const Icon = icon;

  return (
    <div className={`group relative overflow-hidden rounded-3xl border bg-background p-8 transition-all duration-500 hover:shadow-xl ${index === 0 || index == 4 ? 'md:row-span-2' : ''} ${index == listServiceItems.length - 1 ? 'col-span-2' : ''}`}>
      {/* Hover background */}
      <div className='pointer-events-none absolute inset-0 bg-linear-to-br from-custom-primary-color/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />{' '}
      <div className='relative z-10 flex h-full flex-col justify-between'>
        <div>
          <div className='mb-8 flex size-16 items-center justify-center rounded-2xl bg-custom-primary-color/10'>
            <Icon className='size-9 stroke-1 text-custom-primary-color transition-transform duration-500 group-hover:scale-75' />
          </div>

          <h3 className='mb-3 text-2xl font-semibold transition-transform duration-500 group-hover:translate-x-2'>{title}</h3>

          <p className='max-w-md text-muted-foreground'>{description}</p>
        </div>

        <div className='mt-8 h-1 w-0 rounded-full bg-custom-primary-color transition-all duration-500 group-hover:w-16' />
      </div>
    </div>
  );
}
