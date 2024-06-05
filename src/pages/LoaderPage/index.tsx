import styles from './LoaderPage.module.scss';

const LoaderPage = () => {
  return (
    <div className={styles.loaderPage}>
      <img src={'/loading.svg'} alt="loading" />
    </div>
  );
};

export default LoaderPage;
