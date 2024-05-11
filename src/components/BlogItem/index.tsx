import styles from './BlogItem.module.scss';

export default function BlogItem() {
  return (
    <article className={styles.blog}>
      <div className={styles.blogHeader}>
        <div className={styles.authorData}>
          <div className={styles.authorAvatar}>
            <img src="/avatar.png" alt="avatar" />
          </div>
          <div className={styles.autrhorInfo}>
            <p className={styles.authorName}>Alex Redklif</p>
            <p className={styles.date}>Thu Jan 04 2024</p>
          </div>
        </div>
        <button className={styles.likes}>💙500</button>
      </div>
      <div className={styles.blogContent}>
        <p className={styles.blogTitle}>
          quantifying the circuit wont do anything, we need to parse the back-end FTP interface!
        </p>
        <p className={styles.blogAbout}>
          Quo voluptatem quia numquam laudantium sit quibusdam aut. Veritatis omnis neque ea saepe
          hic enim. Nam odit dolor non consequuntur perspiciatis inventore ut sint. Velit quod
          praesentium adipisci modi.
        </p>
      </div>
      <div className={styles.blogFooter}>
        <p>Read more...</p>
        <div className={styles.blogTags}>
          <button>at</button>
          <button>quasi</button>
          <button>ullam</button>
          <button>nemo</button>
        </div>
      </div>
    </article>
  );
}
