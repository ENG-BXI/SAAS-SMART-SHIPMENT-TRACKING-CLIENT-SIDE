'use client';
import {socket} from '@/lib/socket.io';
import {useEffect} from 'react';
import { CompanyEvent } from '../company.event';
import { RevalidateCompany } from '../_action';


const CompanyRealTime = () => {
  useEffect(() => {
    socket.on(CompanyEvent.ADD, data => {
      console.log(data);
      RevalidateCompany();
    });
    socket.on(CompanyEvent.EDIT, data => {
      console.log(data);
      RevalidateCompany();
    });
    socket.on(CompanyEvent.DELETE, data => {
      console.log(data);
      RevalidateCompany();
    });
  }, []);
  return null;
};

export default CompanyRealTime;
