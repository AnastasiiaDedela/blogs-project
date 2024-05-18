import BlogList from '@/components/BlogList';
import styles from './UresPage.module.scss';

export default function UserPage() {
  return (
    <div className={styles.container}>
      <div className={styles.userContainer}>
        <div className={styles.user}>
          <div className={styles.userAvatar}>
            <img src="/avatar.png" alt="avatar" />
          </div>
          <h2 className={styles.userName}>Alex Redklif</h2>
        </div>
        <div className={styles.followButton}>
          <button>+ Follow Alex Redklif</button>
        </div>
      </div>
      <div className={styles.blogsContainer}>
        <BlogList />
      </div>
    </div>
  );
}
