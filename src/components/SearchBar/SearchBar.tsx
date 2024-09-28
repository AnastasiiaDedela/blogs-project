import styles from './SearchBar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '@/redux/slices/search/slice';
import { RootState } from '@/redux/store';

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchValue = useSelector((state: RootState) => state.search.searchValue);

  console.log('searchValue: ', searchValue);

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
        placeholder="Search..."
        className={styles.searchInput}
      />
    </div>
  );
}
