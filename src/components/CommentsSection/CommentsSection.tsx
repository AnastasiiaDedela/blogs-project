import { useState } from 'react';
import styles from './CommentsSection.module.scss';
import { useNavigate } from 'react-router-dom';
import { addComment, getComments } from '@/services/commentsServices';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CommentItem from '../CommentItem/CommentItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { setLimit } from '@/redux/slices/comments/slice';
import { SubmitHandler, useForm } from 'react-hook-form';
interface CommentsProps {
  postId: number;
  limit: number;
  offset: number;
}

interface CommentText {
  text: string;
}

const CommentsSection = ({ postId, limit, offset }: CommentsProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const token = localStorage.getItem('@token') || '';
  const dispatch = useDispatch();

  const { data: comments, refetch } = useQuery({
    queryKey: ['comments', limit],
    queryFn: () => getComments(postId, limit, offset),
  });

  const { register, handleSubmit, reset } = useForm<CommentText>({
    mode: 'onTouched',
  });

  const addMutation = useMutation({
    mutationFn: (data: CommentText) => addComment(postId, data.text, token),
    onSuccess: () => {
      refetch();
      reset({ text: '' });
    },
  });

  const onSubmit: SubmitHandler<CommentText> = (data) => {
    addMutation.mutate(data);
    console.log('data comment', data);
  };

  const handleAddComment = async () => {
    if (!isLoggedIn) {
      console.error('User is not authenticated. Redirect to sign-in.');
      navigate('/sign-in');
      return;
    }
  };

  return (
    <div className={styles.commentsWrapper}>
      <div className={styles.commentForm}>
        <form className={styles.editForm} onSubmit={handleSubmit(onSubmit)}>
          <label>
            <i>Leave your comment</i>
            <textarea className={styles.textarea} {...register('text')} />
          </label>
          <div className={styles.submitBtn}>
            <button
              type="submit"
              onClick={() => {
                handleAddComment();
              }}>
              Comment
            </button>
          </div>
        </form>
      </div>
      <div className={styles.commentsList}>
        {comments &&
          comments.items.map((comment) => (
            <CommentItem
              comment={comment}
              key={comment.id}
              postId={postId}
              refetchComments={() => {
                refetch();
              }}
            />
          ))}
      </div>
      <div className={styles.seeMoreWrapper}>
        {comments &&
          comments.count > 3 &&
          (limit < comments.count ? (
            <div
              className={styles.seeMoreBtn}
              onClick={() => {
                dispatch(setLimit((limit += 3)));
              }}>
              See more
              <ChevronDown />
            </div>
          ) : (
            <div
              className={styles.seeMoreBtn}
              onClick={() => {
                dispatch(setLimit(3));
              }}>
              Hide
              <ChevronUp />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentsSection;
