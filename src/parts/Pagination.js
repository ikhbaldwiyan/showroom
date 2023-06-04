import React, { useState, useEffect } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationComponent = ({ page, perPage, totalCount, setPage }) => {
  const [currentPage, setCurrentPage] = useState(page);
  const totalPages = Math.ceil(totalCount / perPage);
  const maxPaginationItems = 10;

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage, endPage;

    const currentGroup = Math.ceil(currentPage / maxPaginationItems);
    startPage = (currentGroup - 1) * maxPaginationItems + 1;
    endPage = currentGroup * maxPaginationItems;

    if (endPage > totalPages) {
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          previous
          onClick={() => handlePageClick(currentPage - 1)}
        />
      </PaginationItem>
      {getPageNumbers().map((pageNumber) => (
        <PaginationItem key={pageNumber} active={currentPage === pageNumber}>
          <PaginationLink onClick={() => handlePageClick(pageNumber)}>
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next onClick={() => handlePageClick(currentPage + 1)} />
      </PaginationItem>
      <PaginationItem
        disabled={
          currentPage >= totalPages || currentPage % maxPaginationItems === 0
        }
      >
        <PaginationLink
          next
          onClick={() =>
            handlePageClick(
              currentPage +
                maxPaginationItems -
                (currentPage % maxPaginationItems) +
                1
            )
          }
        />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationComponent;
