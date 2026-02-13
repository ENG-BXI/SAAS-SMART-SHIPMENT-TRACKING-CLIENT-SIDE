import {Dispatch, SetStateAction} from 'react';
import {Pagination, PaginationContent, PaginationItem, PaginationLink} from './ui/pagination';
//  "currentPage": 1,
//     "totalPages": 1,
//     "pageSize": 10,
//     "totalCount": 9,
//     "hasPrevious": false,
//     "hasNext": false
function CustomPagination({hasPrevious, hasNext, pageSize, currentPage, setPage, totalCount}: {hasPrevious: boolean; hasNext: boolean; pageSize: number; currentPage: number; setPage: Dispatch<SetStateAction<number>>; totalCount: number}) {
  return (
    <div dir='ltr' className='flex items-center justify-between bg-white p-2 mt-4 rounded-2xl'>
      <Pagination className='mx-0 w-auto'>
        <PaginationContent className='gap-2'>
          <PaginationItem
            onClick={() => {
              if (hasNext) setPage(pre => pre + 1);
            }}
          >
            <PaginationLink className={`${hasNext ? 'cursor-pointer text-gray-400 border border-gray-100 hover:bg-gray-50' : 'cursor-not-allowed text-gray-400 border border-gray-100 hover:bg-gray-50'} px-4 select-none`} size='default'>
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
              if (hasPrevious) setPage(pre => pre - 1);
            }}
          >
            <PaginationLink className={`${hasPrevious ? 'cursor-pointer text-gray-400 border border-gray-100 hover:bg-gray-50' : 'cursor-not-allowed text-gray-400 border border-gray-100 hover:bg-gray-50'} px-4 select-none`} size='default'>
              السابق
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className='text-gray-500 text-sm px-4 select-none'>
        عرض 1 إلى {pageSize} من {totalCount} منتج
      </div>
    </div>
  );
}
export default CustomPagination;
