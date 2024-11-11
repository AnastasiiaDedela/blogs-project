import { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setOffset } from '@/redux/slices/posts/slice';
import { getVisiblePages } from '@/utils/getVisiblePages';

type PaginationProps = {
  count: number;
};

export default function Pagination({ count }: PaginationProps) {
  const { limit, offset } = useSelector((state: RootState) => state.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(count / limit);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialPage = Math.floor(offset / limit) + 1;
    setCurrentPage(initialPage);
  }, [offset, limit]);

  const pageOnClick = (pageNum: number) => {
    setCurrentPage(pageNum);
    dispatch(setOffset(limit * (pageNum - 1)));
  };

  const visiblePages = getVisiblePages(pages, currentPage);

  return (
    <div className={styles.paginationContainer}>
      <ul className={styles.pagination}>
        <li
          onClick={() => {
            if (currentPage > 1) {
              pageOnClick(currentPage - 1);
            }
          }}
          className={currentPage === 1 ? `${styles.disabled}` : ''}>
          {'<'}
        </li>

        {visiblePages.map((page, index) => (
          <li
            key={index}
            onClick={() => {
              if (typeof page === 'number' && currentPage !== page) {
                pageOnClick(page);
              }
            }}
            className={currentPage === page ? `${styles.active}` : ''}>
            {page}
          </li>
        ))}

        <li
          onClick={() => {
            if (currentPage < pages) {
              pageOnClick(currentPage + 1);
            }
          }}
          className={currentPage === pages ? `${styles.disabled}` : ''}>
          {'>'}
        </li>
      </ul>
    </div>
  );
}
