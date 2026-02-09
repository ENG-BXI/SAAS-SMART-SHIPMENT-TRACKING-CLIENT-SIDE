import {Pagination, PaginationContent, PaginationItem, PaginationLink} from './ui/pagination';

function CustomPagination({page, pageCount, totalCount}: {page: number; pageCount: number; totalCount: number}) {
  return (
    <div dir='ltr' className='flex items-center justify-between bg-white p-2 mt-4 rounded-2xl'>
      <Pagination className='mx-0 w-auto'>
        <PaginationContent className='gap-2'>
          <PaginationItem>
            <PaginationLink className='cursor-pointer text-gray-400 border border-gray-100 hover:bg-gray-50 px-4' size='default'>
              التالي
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className='cursor-pointer bg-custom-primary-color text-white hover:bg-[#00a878] hover:text-white border-0 px-4' isActive size='default'>
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className='cursor-pointer text-gray-400 border border-gray-100 hover:bg-gray-50 px-4' size='default'>
              السابق
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className='text-gray-500 text-sm px-4'>
        عرض 1 إلى {pageCount} من {totalCount} منتج
      </div>
    </div>
  );
}
export default CustomPagination;
