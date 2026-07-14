import Image from 'next/image';
import CustomButton from '../custom-button';
import {Link} from '@/i18n/navigation';

function Hero() {
  return (
    <section id='hero' className='relative m-3 min-h-175 overflow-hidden rounded-3xl px-6 py-5 md:px-20'>
      {/* Background */}
      <Image src='/assets/hero3-image.png' priority alt='Shipping platform' fill className='pointer-events-none object-cover' /> {/* Overlay */}
      <div className='pointer-events-none absolute inset-0 bg-black/50' />
      {/* Content */}
      <div className='relative z-10 flex h-full min-h-162.5 flex-col'>
        <div className='flex flex-1 items-center'>
          <div className='max-w-2xl space-y-6 text-white'>
            <span className='inline-flex rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur'>منصة إدارة الشحن الذكية</span>
            <h1 className='text-4xl font-bold leading-tight md:text-6xl'>
              إدارة شحناتك
              <br />
              أصبحت أسهل وأسرع
            </h1>
            <p className='max-w-xl text-lg text-white/80 md:text-xl'>منصة متكاملة تساعد شركات الشحن على متابعة الشحنات، إدارة العملاء، وتحسين عمليات التوصيل من مكان واحد.</p>
            <div className='flex gap-4'>
              <Link href='register-company'>
                <CustomButton text='اشترك الآن' className='border border-white bg-white text-black hover:bg-white/90' />
              </Link>
              <CustomButton text='تعرف أكثر' className='border border-white/40 bg-transparent text-white' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
