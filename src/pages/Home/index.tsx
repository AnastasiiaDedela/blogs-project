import styles from './Home.module.scss';

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.banner}>
          <h1>glossa</h1>
          <p>A place to share your knowledge.</p>
        </div>
        <div className="content"></div>
      </div>
    </main>
  );
}
