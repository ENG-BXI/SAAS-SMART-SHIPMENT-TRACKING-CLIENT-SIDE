import {usePathname, useRouter, useSearchParams as useNextSearchParams} from 'next/navigation';
import useDebounce from '@/lib/debounce';
import {useEffect} from 'react';

export function useSearchParams({key, search, time = 500}: {key: string; search: string | number; time?: number}) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useNextSearchParams();

  const debounced = useDebounce({
    value: search.toString(),
    time
  });
  useEffect(() => {
    const query = new URLSearchParams(searchParams.toString());
    if (debounced) {
      query.set(key, debounced);
    }
    else {
      query.delete(key);
    }
    const url = `${pathName}?${query.toString()}`;
    router.replace(url,{scroll:false});
  }, [debounced]);
}
