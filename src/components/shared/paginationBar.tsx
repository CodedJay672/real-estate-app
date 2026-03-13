"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

function PaginationBar({ totalRows, defaultPageSize }: { totalRows: number; defaultPageSize: number }) {
  const paginationQueries = useSearchParams();
  const page = paginationQueries.get('page') || '1';
  const pageSize = paginationQueries.get('pageSize') || '25';
  const router = useRouter();

  const currentPage = parseInt(page);
  const currentPageSize = parseInt(pageSize);
  const totalPages = Math.ceil(totalRows / currentPageSize);

  const updateQuery = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(paginationQueries.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.push(`?${params.toString()}`);
  };

  const handlePageSizeChange = (newPageSize: string) => {
    updateQuery({ pageSize: newPageSize, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updateQuery({ page: newPage.toString() });
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const showEllipsis = totalPages > 3;

    // Always show first page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          isActive={currentPage === 1}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(1);
          }}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (showEllipsis && currentPage > 3) {
      items.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      if (i === 1 || i === totalPages) continue;
      items.push(
        <PaginationItem key={i}
        >
          <PaginationLink
            isActive={currentPage === i}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (showEllipsis && currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="w-full flex-between flex-col md:flex-row gap-4 p-6">
      <div className="flex items-center gap-1 order-2 md:order-1">
        <label className="text-sm md:text-base text-dark-50 whitespace-nowrap">Rows per page</label>
        <Select value={pageSize} defaultValue={`${defaultPageSize}`} onValueChange={handlePageSizeChange}>
          <SelectTrigger className="w-16 focus-visible:ring-0 focus-visible:ring-offset-0">
            <SelectValue placeholder="page size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="35">35</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-max order-1 md:order-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {renderPaginationItems()}
            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>

  );
}

export default PaginationBar;