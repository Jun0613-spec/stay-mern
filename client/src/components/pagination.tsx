import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination = ({
  page,
  pages,
  onPageChange,
  maxVisiblePages = 5
}: PaginationProps) => {
  const getPageNumbers = () => {
    if (pages <= maxVisiblePages) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }

    let start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const end = Math.min(pages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = end - maxVisiblePages + 1;
    }

    const numbers = [];
    if (start > 1) numbers.push(1);
    if (start > 2) numbers.push("...");

    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }

    if (end < pages - 1) numbers.push("...");
    if (end < pages) numbers.push(pages);

    return numbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={cn(
          "p-2 rounded-md transition-colors duration-200",
          "hover:bg-indigo-100 dark:hover:bg-indigo-900/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "text-indigo-700 dark:text-neutral-300"
        )}
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((number, index) =>
          typeof number === "string" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-1.5 text-indigo-700 dark:text-neutral-300"
            >
              {number}
            </span>
          ) : (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200",
                "hover:bg-indigo-500 dark:hover:bg-indigo-900",
                page === number
                  ? "bg-indigo-600 text-white dark:bg-indigo-800"
                  : "text-indigo-700 dark:text-neutral-300"
              )}
            >
              {number}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min(pages, page + 1))}
        disabled={page === pages}
        className={cn(
          "p-2 rounded-md transition-colors duration-200",
          "hover:bg-indigo-100 dark:hover:bg-indigo-900/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "text-indigo-700 dark:text-neutral-300"
        )}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
