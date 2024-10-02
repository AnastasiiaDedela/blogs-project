import { useEffect, useState } from 'react';
import styles from './pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setOffset } from '@/redux/slices/posts/slice';

type PaginationProps = {
  count: number;
};

export default function Pagination({ count }: PaginationProps) {
  const [currentPage, setCurrentpage] = useState(1);
  const { limit } = useSelector((state: RootState) => state.posts);

  const pages = Math.ceil(count / limit);

  const arrayOfPages = Array.from({ length: pages }, (_, i) => i + 1);
  const dispatch = useDispatch();

  const pageOnClick = (pageNum: number) => {
    dispatch(setOffset(limit * (pageNum - 1)));
  };

  useEffect(() => {
    pageOnClick(currentPage);
  }, [currentPage]);

  return (
    <div>
      <ul className={styles.pagination}>
        <li
          onClick={() => {
            if (currentPage > 1) {
              setCurrentpage(currentPage - 1);
            }
          }}>
          {'<'}
        </li>
        {arrayOfPages.map((_, index) => (
          <li
            key={index}
            onClick={() => {
              setCurrentpage(index + 1);
            }}
            className={currentPage === index + 1 ? `${styles.active}` : ''}>
            {index + 1}
          </li>
        ))}
        <li
          onClick={() => {
            if (currentPage < pages) {
              setCurrentpage(currentPage + 1);
            }
          }}>
          {'>'}
        </li>
      </ul>
    </div>
  );
}
