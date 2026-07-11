'use client';
import {useState} from 'react';
import {Pagination, PaginationContent, PaginationItem, PaginationLink} from './ui/pagination';
import {useSearchParams} from '@/hooks/use-search';
import {useTranslations} from 'next-intl';
function CustomPagination({hasPrevious, hasNext, pageSize, currentPage, totalCount, totalPages, searchParamsKey = 'page'}: {hasPrevious: boolean; hasNext: boolean; pageSize: number; currentPage: number; totalCount: number; totalPages: number; searchParamsKey?: string}) {
  const t = useTranslations('shared.pagination');
  const [page, setPage] = useState(currentPage);
  useSearchParams({key: searchParamsKey, search: page, time: 0});
  return (
    <div dir='ltr' className='flex items-center justify-between bg-white dark:bg-[#18191b] p-2 mt-4 rounded-2xl'>
      <Pagination className='mx-0 w-auto'>
        <PaginationContent className='gap-2'>
          {/* NEXT */}
          <PaginationItem
            onClick={() => {
              if (hasNext && page < totalPages) setPage(prev => prev + 1);
            }}
          >
            <PaginationLink className={`${hasNext && page < totalPages ? 'cursor-pointer text-gray-400  hover:bg-gray-50' : 'cursor-not-allowed text-gray-400'} px-4 select-none border border-gray-100 dark:border-[#2c2c2c]`} size='default'>
              {t('next')}
            </PaginationLink>
          </PaginationItem>
          {/* CURRENT */}
          <PaginationItem>
            <PaginationLink className='cursor-pointer bg-custom-primary-color text-white hover:bg-[#00a878] border-0 px-4 select-none' isActive size='default'>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          {/* PREVIOUS */}
          <PaginationItem
            onClick={() => {
              if (hasPrevious && page > 1) setPage(prev => prev - 1);
            }}
          >
            <PaginationLink className={`${hasPrevious && page > 1 ? 'cursor-pointer text-gray-400 ' : 'cursor-not-allowed text-gray-400 '} px-4 select-none border border-gray-100 dark:border-[#2c2c2c]`} size='default'>
              {t('previous')}
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className='text-gray-500 text-sm px-4 select-none'>
        {t('showing')} {(currentPage - 1) * pageSize + 1} {t('to')} {hasNext ? pageSize * currentPage : totalCount} {t('of')} {totalCount} {t('items')}
      </div>
    </div>
  );
}
export default CustomPagination;
