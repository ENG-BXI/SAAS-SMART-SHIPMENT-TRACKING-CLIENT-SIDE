'use client';
import {socket} from '@/lib/socket.io';
import {useEffect} from 'react';
import {CompanyEvent} from '../company.event';
import {RevalidateCompanyDetails} from './_actions';

const CompanyDetailsRealTime = ({id}: {id: string}) => {
  useEffect(() => {
    socket.on(CompanyEvent.PAUSE, data => {
      console.log(data);
      RevalidateCompanyDetails(id);
    });
    socket.on(CompanyEvent.RESUME, data => {
      console.log(data);
      RevalidateCompanyDetails(id);
    });
  }, [id]);
  return null;
};

export default CompanyDetailsRealTime;
