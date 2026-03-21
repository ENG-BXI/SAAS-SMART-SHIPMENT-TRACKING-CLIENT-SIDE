'use client';
import {BanknoteIcon, Building2Icon, LogOut, LucideHome, Menu, NotepadText, Settings} from 'lucide-react';
import SideBarLogo from './side-bar-logo';
import SidebarItem, {ISidebarItem} from './sidebar-item';
import {useIsMobile} from '@/hooks/use-mobile';
import {Sheet, SheetContent, SheetTrigger} from '../ui/sheet';
import {Button} from '../ui/button';
import {usePathname} from 'next/navigation';
const listOfSideBarItem: ISidebarItem[] = [
  {text: 'الرئيسية', icon: <LucideHome />, link: '/admin'},
  {text: 'الشركات', icon: <Building2Icon />, link: '/admin/company'},
  {text: 'الاشتراكات', icon: <BanknoteIcon />, link: '/admin/subscription'},
  {text: 'الملاحظات', icon: <NotepadText />, link: '/admin/notes'},
  {text: 'تسجيل الخروج', icon: <LogOut />, link: '/admin/logout'},
  // Manager Route (Temp)
  {text: 'الرئيسية', icon: <LucideHome />, link: '/manager'},
  {text: 'الشحنات', icon: <Building2Icon />, link: '/manager/shipments'},
  {text: 'العملاء', icon: <BanknoteIcon />, link: '/manager/clients'},
  {text: 'المسارات', icon: <NotepadText />, link: '/manager/ways'},
  {text: 'الملاحظات', icon: <LogOut />, link: '/manager/notes'},
  {text: 'الاعدادات', icon: <Settings />, link: '/manager/settings'}
];
const SideBar = () => {
  // TODO :
  // optimize this code
  // Error active link in nested routes
  const path = usePathname();
  const pathName = path.split('/').pop();
  const isSelected = (link?: string) => link?.split('/').pop() === pathName;
  return (
    <aside className='w-60 bg-[#F9F9F9] py-8 px-4'>
      <SideBarLogo />
      <div className='flex flex-col gap-y-1.5'>
        {listOfSideBarItem.map((item, index) => (
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
