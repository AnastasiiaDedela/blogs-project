import { Blog } from '@/types/blogs';
import { getPostsUrl } from '@/utils/getPostsUrl';
import axios from 'axios';

type PostData = {
  text: string;
  title: string;
  tags: string[];
};

type TagsData = {
  tags: string[];
};

export interface BlogsData {
  count: number;
  items: Blog[];
}

export const getPosts = async (q: string, limit: number, offset: number, authorId: number) => {
  const createdUrl = getPostsUrl(limit, offset, q, authorId);
  try {
    const response = await axios.get<BlogsData>(createdUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addPost = async (token: string, postData: PostData) => {
  try {
    const response = await axios.post<Blog>('http://localhost:8001/api/posts', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTags = async () => {
  try {
    const response = await axios.get<TagsData>('http://localhost:8001/api/posts/tags');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPostById = async (id: number) => {
  try {
    const response = await axios.get<Blog>(`http://localhost:8001/api/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editPost = async (id: number, postData: PostData) => {
  try {
    const response = await axios.patch<Blog>(`http://localhost:8001/api/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (id: number) => {
  try {
    const response = await axios.delete<Blog>(`http://localhost:8001/api/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
