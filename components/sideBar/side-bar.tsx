'use client';
import {BanknoteIcon, Building2Icon, Loader2, LogOut, LogOutIcon, LucideHome, Menu, NotepadText, Settings} from 'lucide-react';
import SideBarLogo from './side-bar-logo';
import Link from 'next/link';
import SidebarItem, {ISidebarItem} from './sidebar-item';
import {useIsMobile} from '@/hooks/use-mobile';
import {Sheet, SheetContent, SheetTrigger} from '../ui/sheet';
import {Button} from '../ui/button';
import {enUserRoleForSaasAdmin, UserRoleForSaasAdmin} from '@/lib/Constant/user-role';
import SideBarSkeleton from './side-bar-skeleton';
import {useTransition} from 'react';
import {logout} from '@/actions/logout';
import {toast} from 'sonner';
import AlertForRenewSubscription from './alert-for-renew-subscription';
import useSidebar from '@/hooks/use-sidebar';
const listOfSideBarItem: Record<UserRoleForSaasAdmin, ISidebarItem[]> = {
  [enUserRoleForSaasAdmin.ADMIN]: [
    {text: 'الرئيسية', icon: <LucideHome />, link: '/statistics'},
    {text: 'الشركات', icon: <Building2Icon />, link: '/company'},
    {text: 'الاشتراكات', icon: <BanknoteIcon />, link: '/subscription'},
    {text: 'طلبات الاشتراك', icon: <BanknoteIcon />, link: '/subscription-request'},
    {text: 'الملاحظات', icon: <NotepadText />, link: '/notes'}
  ],
  [enUserRoleForSaasAdmin.MANAGER]: [
    {text: 'الرئيسية', icon: <LucideHome />, link: '/statistics'},
    {text: 'الشحنات', icon: <Building2Icon />, link: '/shipments', canLock: true},
    {text: 'العملاء', icon: <BanknoteIcon />, link: '/clients', canLock: true},
    {text: 'المسارات', icon: <NotepadText />, link: '/ways', canLock: true},
    {text: 'المستخدمين', icon: <NotepadText />, link: '/users', canLock: true},
    {text: 'اشتراكي', icon: <BanknoteIcon />, link: '/my-subscription', canLock: false},
    {text: 'الملاحظات', icon: <LogOut />, link: '/notes', canLock: true},
    {text: 'الاعدادات', icon: <Settings />, link: '/settings', canLock: true}
  ],
  [enUserRoleForSaasAdmin.EMPLOYEE]: [
    {text: 'الرئيسية', icon: <LucideHome />, link: '/statistics'},
    {text: 'الشحنات', icon: <Building2Icon />, link: '/shipments'},
    {text: 'العملاء', icon: <BanknoteIcon />, link: '/clients'},
    {text: 'المسارات', icon: <NotepadText />, link: '/ways'},
    {text: 'الملاحظات', icon: <LogOut />, link: '/notes'},
    {text: 'الاعدادات', icon: <Settings />, link: '/settings'}
  ],
  [enUserRoleForSaasAdmin.DRIVER]: []
};

const SideBar = () => {
  const {isLoading, isSelected, user, isSubscriptionEnd, isError, error, isLock} = useSidebar();
  const sideBarData = listOfSideBarItem[user?.role ?? enUserRoleForSaasAdmin.DRIVER];
  const [isPending, startTransition] = useTransition();
  function handleLogout() {
    startTransition(async () => {
      const {message} = await logout();
      if (message) {
        toast.success(message);
        window.location.href = '/';
      }
    });
  }
  return (
    <aside className='min-w-60 relative bg-[#F9F9F9] py-8 px-4'>
      <SideBarLogo />
      {isLoading && <SideBarSkeleton />}
      {sideBarData.length > 0 && (
        <div className='flex flex-col gap-y-1.5'>
          {sideBarData.map((item, index) => (
            <SidebarItem key={index} item={{...item, isSelected: isSelected(item.link), isLock}} />
          ))}
          <SidebarItem item={{icon: isPending ? <Loader2 className='animate-spin' /> : <LogOutIcon />, text: 'تسجيل الخروج', onClick: handleLogout}} />
        </div>
      )}
      {isSubscriptionEnd && <AlertForRenewSubscription />}
      {isError && <p className='text-red-500 text-center'>{error?.message}</p>}
    </aside>
  );
};

function AppSideBarClient() {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild className='absolute right-0 top-0'>
          <Button variant='outline' className='m-2'>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent dir='rtl' side='right' className='w-60'>
          <SideBar />
        </SheetContent>
      </Sheet>
    );
  }
  return <SideBar />;
}

export default AppSideBarClient;
