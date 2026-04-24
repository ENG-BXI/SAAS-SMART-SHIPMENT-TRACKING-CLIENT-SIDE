'use client';
import {useState} from 'react';
import {Pagination, PaginationContent, PaginationItem, PaginationLink} from './ui/pagination';
import {useSearchParams} from '@/hooks/use-search';
//  "currentPage": 1,
//     "totalPages": 1,
//     "pageSize": 10,
//     "totalCount": 9,
//     "hasPrevious": false,
//     "hasNext": false
function CustomPagination({hasPrevious, hasNext, pageSize, currentPage, totalCount, totalPages, searchParamsKey = 'page'}: {hasPrevious: boolean; hasNext: boolean; pageSize: number; currentPage: number; totalCount: number; totalPages: number; searchParamsKey?: string}) {
  const [page, setPage] = useState(currentPage);
  useSearchParams({key: searchParamsKey, search: page, time: 0});
  return (
    <div dir='ltr' className='flex items-center justify-between bg-white p-2 mt-4 rounded-2xl'>
      <Pagination className='mx-0 w-auto'>
        <PaginationContent className='gap-2'>
          <PaginationItem
            onClick={() => {
              if (hasNext && page < totalPages) setPage(pre => pre + 1);
            }}
          >
            <PaginationLink className={`${hasNext && page < totalPages ? 'cursor-pointer text-gray-400 border border-gray-100 hover:bg-gray-50' : 'cursor-not-allowed text-gray-400 border border-gray-100 hover:bg-gray-50'} px-4 select-none`} size='default'>
              التالي
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className='cursor-pointer bg-custom-primary-color text-white hover:bg-[#00a878] hover:text-white border-0 px-4 select-none' isActive size='default'>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem
            onClick={() => {
              if (hasPrevious && page > 1) setPage(pre => pre - 1);
            }}
          >
            <PaginationLink className={`${hasPrevious && page > 1 ? 'cursor-pointer text-gray-400 border border-gray-100 hover:bg-gray-50' : 'cursor-not-allowed text-gray-400 border border-gray-100 hover:bg-gray-50'} px-4 select-none`} size='default'>
              السابق
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className='text-gray-500 text-sm px-4 select-none'>
        عرض {(currentPage - 1) * pageSize + 1} إلى {hasNext ? pageSize * currentPage : totalCount} من {totalCount} منتج
      </div>
    </div>
  );
}
export default CustomPagination;
