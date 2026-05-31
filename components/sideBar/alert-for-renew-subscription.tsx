import Link from "next/link";
import { Button } from "../ui/button";

function AlertForRenewSubscription() {
  return (
    <div className='absolute bottom-5 left-1/2 -translate-x-1/2 w-full  max-w-sm rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900 shadow-md flex flex-col items-center gap-3'>
      <div className='flex items-center gap-3'>
        <div className='text-sm'>
          <div className='font-medium'>اشتراكك سينتهي قريبًا</div>
          <div className='text-xs text-amber-800'>قم بتجديد اشتراكك الآن للحفاظ على الوصول</div>
        </div>
      </div>
      <Link href='/my-subscription' className='w-full'>
        <Button className='bg-custom-primary-color w-full'>تجديد الاشتراك</Button>
      </Link>
    </div>
  );
}
export default AlertForRenewSubscription;