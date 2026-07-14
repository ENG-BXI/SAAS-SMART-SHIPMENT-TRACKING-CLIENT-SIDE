import RegisterCompanyForm from '@/components/landing/register-company-form';
import Image from 'next/image';

const page = () => {
  return (
    <div className='p-4'>
      <div className='bg-green-400 relative rounded-2xl w-full h-100 flex flex-col p-6 overflow-hidden'>
        <h3 className='text-5xl font-bold uppercase z-1 m-auto text-white'>Register Company</h3>
        <Image src={'/assets/register-company.jpg'} className=' absolute inset-1' fill alt='Register Image' />
      </div>
      <RegisterCompanyForm />
    </div>
  );
};

export default page;
