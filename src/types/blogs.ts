export interface Author {
  id: number;
  name: string;
  email: string;
}

export interface Blog {
  author: Author;
  created_at: string;
  id: number;
  tags: string[];
  text: string;
  title: string;
  updated_at: string;
}
