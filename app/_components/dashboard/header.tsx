import Link from 'next/link';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from '../ui/breadcrumb';

interface IBreadcrumbList {
  text: string;
  path: string;
}
interface IPageDashboardHeader {
  breadcrumbList: IBreadcrumbList[];
  title: string;
  description: string;
}
const PageDashboardHeader = ({breadcrumbList, title, description}: IPageDashboardHeader) => {
  return (
    <header className='mb-4'>
      <Breadcrumb className='mb-1'>
        <BreadcrumbList>
          {breadcrumbList.map((item, index) => (
            <>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink asChild>
                  <Link href={item.path}>{item.text}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbList.length - 1 != index && <BreadcrumbSeparator />}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <h3 className='text-2xl font-semibold mb-1'>{title}</h3>
      <p>{description}</p>
    </header>
  );
};

export default PageDashboardHeader;
