import React from "react";

/**
 * Custom Range Function
 *
 * @param {*} count
 * @param {number} [start=1]
 * @returns {*}
 */
const range = (count, start = 1) =>
  Array.from(new Array(count), (x, i) => i + start);

/**
 * Calculates a list of at most 7 pages to display.
 * Always includes the current, previous, next, first
 * and last ones if available.
 *
 * @returns an array with the page numbers to display.
 * It can include the special `'<'` and `'>'` elements
 * to represent skipped pages.
 *
 * @example
 * getVisiblePages(4, 5) // => [1, 2, 3, 4, 5]
 * getVisiblePages(4, 8) // => [1, 2, 3, 4, 5, '>', 8]
 * getVisiblePages(5, 8) // => [1, '<', 4, 5, 6, 7, 8]
 * getVisiblePages(5, 10) // => [1, '<', 4, 5, 6, '>', 10]
 */
const getVisiblePages = (current, total) => {
  if (total <= 7) return range(total);

  if (current < 5) return [...range(5), ">", total];

  if (current > total - 4) return [1, "<", ...range(5, total - 4)];

  return [1, "<", current - 1, current, current + 1, ">", total];
};

/**
 * Page Buttton
 *
 * @param {{ page: any; currentPage: any; onClick: any; }} param0
 * @param {*} param0.page
 * @param {*} param0.currentPage
 * @param {*} param0.onClick
 * @returns {*}
 */
const PageButton = ({ page, currentPage, onClick }) => {
  if (page === currentPage) {
    return (
      <button
        className="pagination-link is-current"
        aria-label={`Page ${page}`}
        aria-current="page"
      >
        {page}
      </button>
    );
  }
  if (page === "<" || page === ">") {
    return <span className="pagination-ellipsis">&hellip;</span>;
  }
  return (
    <button
      className="pagination-link"
      aria-label={`Go to page ${page}`}
      onClick={onClick}
    >
      {page}
    </button>
  );
};

/**
 * Pagination Bar Component
 *
 * @returns {*}
 */
const PaginationBar = () => {
  const pages = getVisiblePages(currentPage, totalPages);
  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <button
        className="pagination-previous"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &#x25C0;
      </button>
      <button
        className="pagination-next"
        arial-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &#x25B6;
      </button>
      <ul className="pagination-list">
        {pages.map((page) => (
          <li key={page}>
            <PageButton
              page={page}
              currentPage={currentPage}
              onClick={() => onPageChange(page)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationBar;
