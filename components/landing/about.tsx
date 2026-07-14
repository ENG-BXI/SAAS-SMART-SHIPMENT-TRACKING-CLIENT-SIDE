import Image from 'next/image';

const aboutItems = [
  {
    title: 'إدارة الشحنات',
    description: 'تحكم بجميع عمليات الشحن من الإنشاء حتى التسليم مع متابعة كاملة.',
    image: '/assets/manage-shipment.jpg'
  },
  {
    title: 'التتبع الذكي',
    description: 'تابع حالة الشحنات ومواقعها بشكل مباشر وسهل.',
    image: '/assets/track-shipment.jpg'
  },
  {
    title: 'إدارة العملاء',
    description: 'نظم بيانات العملاء وحسن تجربة التعامل معهم.',
    image: '/assets/manager-clients.jpg '
  }
];

const About = () => {
  return (
    <section id='about' className='m-3 grid grid-cols-1 gap-5 md:grid-cols-3'>
      {aboutItems.map((item, index) => (
        <div
          key={index}
          className='
            group
            relative
            aspect-square
            overflow-hidden
            rounded-3xl
          '
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className='
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            '
          />

          {/* Normal overlay */}

          <div
            className='
              absolute
              inset-0
              bg-gradient-to-t
              from-black/80
              via-black/20
              to-transparent
            '
          />

          {/* Green hover glow */}

          <div
            className='
              absolute
              inset-x-0
              bottom-0
              h-2/3
              translate-y-full
              bg-gradient-to-t
              from-custom-primary-color/70
              via-custom-primary-color/20
              to-transparent
              transition-transform
              duration-500
              group-hover:translate-y-0
            '
          />

          <div
            className='
              absolute
              bottom-0
              p-6
              text-white
            '
          >
            <div
              className='
                mb-3
                h-1
                w-10
                rounded-full
                bg-custom-primary-color
              '
            />

            <h3 className='text-2xl font-bold'>{item.title}</h3>

            <p
              className='
                mt-3
                max-h-0
                overflow-hidden
                text-sm
                leading-6
                text-white/90
                opacity-0
                transition-all
                duration-500
                group-hover:max-h-28
                group-hover:opacity-100
              '
            >
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default About;
