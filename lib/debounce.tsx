import {useEffect, useState} from 'react';

const useDebounce = ({value, time = 1000}: {value: string; time?: number}) => {
  const [debounce, setDebounce] = useState('');
  useEffect(() => {
    const st = setTimeout(() => {
      setDebounce(value);
    }, time);
    return () => clearTimeout(st);
  }, [value, time]);
  return debounce;
};

export default useDebounce;
