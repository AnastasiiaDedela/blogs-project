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

  const visiblePages = getVisiblePages(pages, currentPage);

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
