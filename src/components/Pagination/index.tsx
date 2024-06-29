import { useEffect, useState } from 'react';
import styles from './pagination.module.scss';

type PaginationProps = {
  elementsPerPage: number;
  pageOnClick: (pageNum: number) => void;
  count: number;
};

export default function Pagination({ elementsPerPage, pageOnClick, count }: PaginationProps) {
  const [currentPage, setCurrentpage] = useState(1);
  const pages = count / elementsPerPage;
  const arrayOfPages = Array.from({ length: pages }, (_, i) => i + 1);

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
