import React from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { Button } from "../components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startPageIndex: number;
  endPageIndex: number;
  setCurrentPage: (page: any) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  startPageIndex,
  endPageIndex,
  setCurrentPage,
}) => {
  const goToPreviousPage = () => {
    setCurrentPage((prev: number) => Math.max((prev as number) - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev: number) =>
      Math.min((prev as number) + 1, totalPages)
    );
  };

  return (
    <ul className="mx-auto flex justify-end items-center pr-6 py-5 space-x-1">
      <li>
        <Button
          type="button"
          variant="outline"
          disabled={currentPage <= 1}
          onClick={goToPreviousPage}
        >
          <GrPrevious className="h-3 w-3" />
        </Button>
      </li>
      {Array.from({ length: endPageIndex - startPageIndex + 1 }, (_, i) => {
        const pageNumber = startPageIndex + i;
        return (
          <li key={i}>
            <Button
              type="button"
              variant={currentPage === pageNumber ? "secondary" : "outline"}
              onClick={() => {
                setCurrentPage(pageNumber);
              }}
            >
              {pageNumber}
            </Button>
          </li>
        );
      })}
      <li>
        <Button
          type="button"
          variant="outline"
          disabled={currentPage >= totalPages}
          onClick={goToNextPage}
        >
          <GrNext className="h-3 w-3" />
        </Button>
      </li>
    </ul>
  );
};

export default Pagination;
