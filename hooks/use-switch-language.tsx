'use client';

import {useRouter, usePathname} from '@/i18n/navigation';

function useSwitchLanguage() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (locale: string) => {
    router.replace(pathname, {locale});
  };

  return {switchLocale};
}

export default useSwitchLanguage;
