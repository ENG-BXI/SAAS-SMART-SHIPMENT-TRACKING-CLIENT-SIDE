import Link from 'next/link';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from '../ui/breadcrumb';
import React, {ReactNode} from 'react';
import { cn } from '@/lib/utils';

interface IBreadcrumbList {
  text: string;
  path: string;
}
type IPageDashboardHeaderWithAction = {hasAction?: true; actions: ReactNode} | {hasAction?: false};
type IPageDashboardHeader = {
  breadcrumbList?: IBreadcrumbList[];
  title: string;
  titleClassName?: string;
  description: string;
  descriptionClassName?: string;
} & IPageDashboardHeaderWithAction;
const PageDashboardHeader = ({breadcrumbList, title, description, titleClassName, descriptionClassName, ...props}: IPageDashboardHeader) => {
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
          <h3 className={cn('text-2xl font-semibold mb-1', titleClassName)}>{title}</h3>
          <p className={cn('text-muted-foreground', descriptionClassName)}>{description}</p>
        </div>
        {props.hasAction && props.actions}
      </div>
    </header>
  );
};

export default PageDashboardHeader;
