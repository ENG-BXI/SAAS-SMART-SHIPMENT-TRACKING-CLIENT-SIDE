import { Infinity } from "lucide-react";

function SideBarLogo() {
  return (
    <div className='flex ms-2 items-center gap-x-1 mb-5'>
      <div className='bg-custom-primary-color rounded-full p-0.5'>
        <Infinity className='text-white' />
      </div>
      <span className='text-xl font-semibold mb-1'>3S Tracking</span>
    </div>
  );
}
export default SideBarLogo