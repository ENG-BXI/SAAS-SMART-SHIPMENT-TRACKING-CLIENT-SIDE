'use client';
import {BanknoteIcon, Building2Icon, LogOut, LucideHome, Menu, NotepadText, Settings} from 'lucide-react';
import SideBarLogo from './side-bar-logo';
import SidebarItem, {ISidebarItem} from './sidebar-item';
import {useIsMobile} from '@/hooks/use-mobile';
import {Sheet, SheetContent, SheetTrigger} from '../ui/sheet';
import {Button} from '../ui/button';
import {usePathname} from 'next/navigation';
import {enUserRoleForSaasAdmin, UserRoleForSaasAdmin} from '@/lib/Constant/user-role';
import {useAuth} from '@/context/auth-context';
const listOfSideBarItem: Record<UserRoleForSaasAdmin, ISidebarItem[]> = {
  [enUserRoleForSaasAdmin.ADMIN]: [
    {text: 'الرئيسية', icon: <LucideHome />, link: '/statistics'},
    {text: 'الشركات', icon: <Building2Icon />, link: '/company'},
    {text: 'الاشتراكات', icon: <BanknoteIcon />, link: '/subscription'},
    {text: 'المستخدمين', icon: <NotepadText />, link: '/users'},
    {text: 'الملاحظات', icon: <NotepadText />, link: '/notes'},
    {text: 'تسجيل الخروج', icon: <LogOut />, link: '/logout'}
  ],
  [enUserRoleForSaasAdmin.MANAGER]: [
    {text: 'الرئيسية', icon: <LucideHome />, link: '/statistics'},
    {text: 'الشحنات', icon: <Building2Icon />, link: '/shipments'},
    {text: 'العملاء', icon: <BanknoteIcon />, link: '/clients'},
    {text: 'المسارات', icon: <NotepadText />, link: '/ways'},
    {text: 'الملاحظات', icon: <LogOut />, link: '/notes'},
    {text: 'الاعدادات', icon: <Settings />, link: '/settings'}
  ],
  [enUserRoleForSaasAdmin.EMPLOYEE]: [],
  [enUserRoleForSaasAdmin.DRIVER]: []
};
const SideBar = () => {
  // TODO :
  // optimize this code
  // Error active link in nested routes
  const path = usePathname();
  const user = useAuth().user;
  const pathName = path.split('/').pop();
  const isSelected = (link?: string) => link?.split('/').pop() === pathName;
  const sideBarData = listOfSideBarItem[user?.role ?? enUserRoleForSaasAdmin.DRIVER];
  return (
    <aside className='min-w-60 bg-[#F9F9F9] py-8 px-4'>
      <SideBarLogo />
      <div className='flex flex-col gap-y-1.5'>
        {sideBarData.map((item, index) => (
          <SidebarItem key={index} item={{...item, isSelected: isSelected(item.link)}} />
        ))}
      </div>
    </aside>
  );
};
function AppSideBar() {
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

export default AppSideBar;
