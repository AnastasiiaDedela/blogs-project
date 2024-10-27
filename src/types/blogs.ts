export interface Author {
  id: number;
  name: string;
  email: string;
  updated_at: string;
  created_at: string;
}

export interface Blog {
  author: Author;
  created_at: string;
  id: number;
  is_liked: boolean;
  likes_count: number;
  tags: string[];
  text: string;
  title: string;
  updated_at: string;
}
