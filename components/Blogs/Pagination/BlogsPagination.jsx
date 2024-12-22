"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import UseGlobalContext from "@/customHooks/UseGlobalContext";

const BlogsPagination = () => {
  const globalContext = UseGlobalContext();
  const { globalState } = globalContext;
  const { totalPages, currentPage } = globalState;
  let pageNumbers = [];
  for (let i = currentPage - 3; i <= currentPage + 3; i++) {
    if (i < 1) continue;
    if (i > totalPages) break;
    pageNumbers.push(i);
  }
  return (
    <div className="w-full py-5">
      <Pagination className="w-full flex-col text-base items-center justify-between py-3">
        <PaginationContent className="flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
          {currentPage - 1 >= 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/${currentPage - 1}`} />
            </PaginationItem>
          )}
          <div className="w-full flex items-center justify-center gap-3">
            {pageNumbers.map((currentPageNumber) => {
              return (
                <PaginationContent
                  className="flex w-full items-center justify-center"
                  key={currentPageNumber}
                >
                  <PaginationItem>
                    <PaginationLink
                      href={`/${currentPageNumber}`}
                      isActive={currentPageNumber === currentPage}
                    >
                      {currentPageNumber}
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              );
            })}
          </div>
          {currentPage + 1 <= totalPages && (
            <PaginationItem>
              <PaginationNext href={`/${currentPage + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default BlogsPagination;
