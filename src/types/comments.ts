import { Author } from './blogs';

export type CommentData = {
  id: number;
  created_at: string;
  updated_at: string;
  text: string;
  user_id: number;
  post_id: number;
  post: {
    id: number;
    user_id: number;
    author: Author;
    created_at: string;
    updated_at: string;
  };
  author: Author;
};

export interface CommentsResponse {
  count: number;
  items: CommentData[];
}
