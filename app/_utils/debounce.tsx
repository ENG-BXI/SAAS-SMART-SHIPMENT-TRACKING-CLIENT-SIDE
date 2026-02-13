import {useEffect, useState} from 'react';

const useDebounce = ({value}: {value: string}) => {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const st = setTimeout(() => {
      setDebounce(value);
    }, 1000);
    return () => clearTimeout(st);
  }, [value]);
  return debounce;
};

export default useDebounce;
