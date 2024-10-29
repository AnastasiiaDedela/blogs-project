import { editPost } from '@/services/postsServices';

export const updateBlogPost = (id: number, updatedData: { newTitle: string; newText: string }) => {
  const token = localStorage.getItem('@token');

  const payload = {
    title: updatedData.newTitle,
    text: updatedData.newText,
  };
  return editPost(id, payload, token);
};
