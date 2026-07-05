'use client';
import {BanknoteIcon, Building2Icon, Loader2, LogOut, LogOutIcon, LucideHome, Menu, NotepadText, Settings} from 'lucide-react';
import SideBarLogo from './side-bar-logo';
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
import {useLocale} from 'next-intl';
const listOfSideBarItem: Record<UserRoleForSaasAdmin, ISidebarItem[]> = {
  [enUserRoleForSaasAdmin.ADMIN]: [
    {text: 'home', icon: <LucideHome />, link: '/statistics'},
    {text: 'companies', icon: <Building2Icon />, link: '/company'},
    {text: 'subscriptions', icon: <BanknoteIcon />, link: '/subscription'},
    {text: 'subscriptionRequests', icon: <BanknoteIcon />, link: '/subscription-request'},
    {text: 'notes', icon: <NotepadText />, link: '/notes'}
  ],
  [enUserRoleForSaasAdmin.MANAGER]: [
    {text: 'home', icon: <LucideHome />, link: '/statistics'},
    {text: 'shipments', icon: <Building2Icon />, link: '/shipments', canLock: true},
    {text: 'clients', icon: <BanknoteIcon />, link: '/clients', canLock: true},
    {text: 'ways', icon: <NotepadText />, link: '/ways', canLock: true},
    {text: 'users', icon: <NotepadText />, link: '/users', canLock: true},
    {text: 'mySubscription', icon: <BanknoteIcon />, link: '/my-subscription', canLock: false},
    {text: 'notes', icon: <LogOut />, link: '/notes', canLock: true},
    {text: 'settings', icon: <Settings />, link: '/settings', canLock: true}
  ],
  [enUserRoleForSaasAdmin.EMPLOYEE]: [
    {text: 'home', icon: <LucideHome />, link: '/statistics'},
    {text: 'shipments', icon: <Building2Icon />, link: '/shipments'},
    {text: 'clients', icon: <BanknoteIcon />, link: '/clients'},
    {text: 'ways', icon: <NotepadText />, link: '/ways'},
    {text: 'notes', icon: <LogOut />, link: '/notes'},
    {text: 'settings', icon: <Settings />, link: '/settings'}
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
          <SidebarItem item={{icon: isPending ? <Loader2 className='animate-spin' /> : <LogOutIcon />, text: 'logout', onClick: handleLogout}} />
        </div>
      )}
      {isSubscriptionEnd && <AlertForRenewSubscription />}
      {isError && <p className='text-red-500 text-center'>{error?.message}</p>}
    </aside>
  );
};

function AppSideBarClient() {
  const isMobile = useIsMobile();
  const locale = useLocale();
  const isRtl = locale == 'ar' ||locale == 'mo';
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild className='absolute rtl:right-0 ltr:left-0 top-0'>
          <Button variant='outline' className='m-2'>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side={isRtl ? 'right' : 'left'} className='w-60'>
          <SideBar />
        </SheetContent>
      </Sheet>
    );
  }
  return <SideBar />;
}

export default AppSideBarClient;
