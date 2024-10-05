import { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setOffset } from '@/redux/slices/posts/slice';

type PaginationProps = {
  count: number;
};

export default function Pagination({ count }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { limit } = useSelector((state: RootState) => state.posts);

  const pages = Math.ceil(count / limit);
  const dispatch = useDispatch();

  const pageOnClick = (pageNum: number) => {
    dispatch(setOffset(limit * (pageNum - 1)));
  };

  useEffect(() => {
    pageOnClick(currentPage);
  }, [currentPage]);

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisiblePages = 5;

    // If total pages are less than or equal to max visible pages, show all
    if (pages <= maxVisiblePages) {
      for (let i = 1; i <= pages; i++) {
        visiblePages.push(i);
      }
    } else {
      // When on the first page
      if (currentPage === 1) {
        for (let i = 1; i <= 5; i++) {
          visiblePages.push(i);
        }
        visiblePages.push('...'); // Add ellipsis after 5
      }
      // When on the second page
      else if (currentPage === 2) {
        for (let i = 1; i <= 5; i++) {
          visiblePages.push(i);
        }
        visiblePages.push('...'); // Add ellipsis after 5
      }
      // When on pages 3, 4, or 5
      else if (currentPage <= 5) {
        for (let i = 1; i <= 5; i++) {
          visiblePages.push(i);
        }
        visiblePages.push('...'); // Add ellipsis after 5
      }
      // When on page 6
      else if (currentPage === 6) {
        visiblePages.push(1, '...', 3, 4, 5, 6);
      }
      // When on the last few pages
      else if (currentPage >= pages - 2) {
        visiblePages.push('...', pages - 4, pages - 3, pages - 2, pages - 1, pages);
      }
      // For pages in between
      else {
        visiblePages.push(1); // Always show the first page
        visiblePages.push('...'); // Add ellipsis before showing middle pages
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          visiblePages.push(i);
        }
        visiblePages.push('...'); // Add ellipsis after the last shown page
        visiblePages.push(pages); // Always show the last page
      }
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={styles.paginationContainer}>
      <ul className={styles.pagination}>
        <li
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}>
          {'<'}
        </li>
        {visiblePages.map((page, index) => (
          <li
            key={index}
            onClick={() => {
              if (typeof page === 'number') {
                setCurrentPage(page);
              }
            }}
            className={currentPage === page ? `${styles.active}` : ''}>
            {page}
          </li>
        ))}
        <li
          onClick={() => {
            if (currentPage < pages) {
              setCurrentPage(currentPage + 1);
            }
          }}>
          {'>'}
        </li>
      </ul>
    </div>
  );
}
