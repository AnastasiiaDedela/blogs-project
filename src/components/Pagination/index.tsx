import styles from './pagination.module.scss';

type PaginationProps = {
  page: number;
  setPage: (number: number) => void;
};

export default function Pagination({ page, setPage }: PaginationProps) {
  return (
    <div>
      <ul className={styles.pagination}>
        <li>{'<'}</li>
        {[...Array(7)].map((_, index) => (
          <li
            key={index}
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? 'active' : ''}>
            {index + 1}
          </li>
        ))}
        <li>{'>'}</li>
      </ul>
    </div>
  );
}
