import { Blog } from '@/types/blogs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ArticleDetails.module.scss';
import AuthorBlock from '@/components/AuthorBlock';
import { Pencil, Trash2 } from 'lucide-react';
import EditModal from '@/components/EditModal/EditModal';

const ArticleDetails = () => {
  const params = useParams();
  const [article, setArticle] = useState<Blog | null>(null);

  const [modalOpened, setModalOpened] = useState(false);
  const openEditModal = () => setModalOpened(true);
  const closeEditModal = () => setModalOpened(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8001/api/posts/${params.id}`)
      .then((res) => {
        setArticle(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      {article && (
        <div className={styles.wrapper}>
          <div className={styles.bannerWrapper}>
            <div className={styles.contentWrapper}>
              <h1 className={styles.title}>{article.title}</h1>
              <div className={styles.authorBlockWrapper}>
                <AuthorBlock
                  authorName={article.author.name}
                  created_at={article.created_at}
                  titleStyle="light"
                  id={article.author.id}
                />
                <div className={styles.followBtns}>
                  <div>
                    <button>+ Follow {article.author.name}</button>
                  </div>
                  <div>
                    <button>💙 Favorite Article</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <p className={styles.acticleText}>{article.text}</p>
            <div className={styles.tags}>
              {article.tags.map((tag) => (
                <button className={styles.tag}>{tag}</button>
              ))}
            </div>
            <div className={styles.footerWrapper}>
              <div className={styles.authorBlockWrapper}>
                <AuthorBlock
                  authorName={article.author.name}
                  created_at={article.created_at}
                  id={article.author.id}
                />
                <div className={styles.followBtns}>
                  <div>
                    <button>+ Follow {article.author.name}</button>
                  </div>
                  <div>
                    <button>💙 Favorite Article</button>
                  </div>
                  <div>
                    <button className={styles.edit} onClick={openEditModal}>
                      <Pencil size={14} />
                    </button>
                    <button className={styles.delete}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EditModal
            id={article.id}
            text={article.text}
            title={article.title}
            onCloseEditModal={closeEditModal}
            modalOpened={modalOpened}
          />
        </div>
      )}
    </>
  );
};

export default ArticleDetails;
