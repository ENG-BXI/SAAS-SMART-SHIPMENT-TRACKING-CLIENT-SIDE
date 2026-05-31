'use client';
import useAddVisitCount from '@/hooks/use-add-visit-count';
import {ReactNode} from 'react';

const VisitCounterProvider = ({children}: {children: ReactNode}) => {
  useAddVisitCount();
  return <>{children}</>;
};

export default VisitCounterProvider;
