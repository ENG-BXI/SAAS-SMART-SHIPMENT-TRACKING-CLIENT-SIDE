'use client';

import {addVisitNumber} from '@/actions/add-visit-count';
import {useEffect, useTransition} from 'react';
import Cookies from 'universal-cookie';

const VISIT_KEY_IN_COOKIE = 'S3-VISITED';

const useAddVisitCount = () => {
  const [, startTransition] = useTransition();

  useEffect(() => {
    const cookie = new Cookies();
    const isExist = cookie.get(VISIT_KEY_IN_COOKIE);
    if (isExist) return;
    startTransition(async () => {
      const {error} = await addVisitNumber();
      if (!error) {
        cookie.set(VISIT_KEY_IN_COOKIE, true, {
          path: '/',
          maxAge: 60 * 60 * 24
        });
        console.log('[INCREASE VISIT NUMBER SUCCESSFUL]');
      }
    });
  }, []);
};

export default useAddVisitCount;
