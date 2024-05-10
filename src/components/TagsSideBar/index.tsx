import styles from './TagsSideBar.module.scss';

export default function TagsSideBar() {
  return (
    <div className={styles.tagsContainer}>
      <div>
        <p className={styles.tagsTitle}>Popular Tags</p>
        <div className={styles.tagsList}>
          <button>eos</button>
          <button>est</button>
          <button>ipsum</button>
          <button>enim</button>
          <button>repellat</button>
          <button>quia</button>
          <button>consequatur</button>
          <button>facilis</button>
          <button>exercitationem</button>
          <button>tenetur</button>
        </div>
      </div>
    </div>
  );
}
