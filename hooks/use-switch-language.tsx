'use client';

import {usePathname, useRouter} from '@/i18n/navigation';

function useSwitchLanguage() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (locale: string) => {
    router.replace(pathname, {locale});
    router.refresh();
  };

  return {switchLocale};
}

export default useSwitchLanguage;
