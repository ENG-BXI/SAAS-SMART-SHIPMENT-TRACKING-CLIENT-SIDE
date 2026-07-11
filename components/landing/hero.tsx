import CustomButton from "../custom-button";
import Header from "./header";

function Hero() {
  return (
    <div className='py-5 m-3 px-20 bg-custom-primary-color max-w-full rounded-3xl mb-3'>
      <Header />
      <div className='h-full w-full flex items-center'>
        <div className='flex flex-col gap-y-2'>
          <h2>اشحن شحنتك</h2>
          <h1 className='text-4xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, aspernatur.</h1>
          <CustomButton text='اشترك الان' className='border self-start' />
        </div>
        <div className='w-1/2 aspect-square bg-gray-400 rounded-2xl'></div>
      </div>
    </div>
  );
}

export default Hero;
