import { useEffect, useState } from 'react';
import styles from './CommentList.module.scss';
import { getComments } from '@/services/commentsServices';
import CommentItem from '../CommentItem/CommentItem';
import { CommentData } from '@/types/comments';

interface CommentsProps {
  postId: number;
  limit: number;
  offset: number;
}

const CommentsList = ({ postId, limit, offset }: CommentsProps) => {
  const [commentaList, setCommentsList] = useState<CommentData[]>([]);

  useEffect(() => {
    getComments(postId, limit, offset)
      .then((res) => setCommentsList(res.items))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.commentaList}>
      {commentaList &&
        commentaList.map((comment) => <CommentItem comment={comment} key={comment.id} />)}
    </div>
  );
};

export default CommentsList;
