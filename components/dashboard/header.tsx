import Link from 'next/link';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from '../ui/breadcrumb';
import React, {ReactNode} from 'react';

interface IBreadcrumbList {
  text: string;
  path: string;
}
type IPageDashboardHeaderWithAction = {hasAction?: true; actions: ReactNode} | {hasAction?: false};
type IPageDashboardHeader = {
  breadcrumbList?: IBreadcrumbList[];
  title: string;
  description: string;
} & IPageDashboardHeaderWithAction;
const PageDashboardHeader = ({breadcrumbList, title, description, ...props}: IPageDashboardHeader) => {
  return (
    <header className='mb-4'>
      {breadcrumbList && (
        <Breadcrumb className='mb-1'>
          <BreadcrumbList>
            {breadcrumbList.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.path}>{item.text}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbList.length - 1 != index && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-2xl font-semibold mb-1'>{title}</h3>
          <p>{description}</p>
        </div>
        {props.hasAction && props.actions}
      </div>
    </header>
  );
};

export default PageDashboardHeader;
