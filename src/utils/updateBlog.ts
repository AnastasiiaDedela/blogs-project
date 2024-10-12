import axios from 'axios';

export const updateBlogPost = (id: number, updatedData: { newTitle: string; newText: string }) => {
  const token = localStorage.getItem('@token');

  const payload = {
    title: updatedData.newTitle,
    text: updatedData.newText,
  };
  return axios.patch(`http://localhost:8001/api/posts/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
