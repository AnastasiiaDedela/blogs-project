export interface Author {
  id: string;
  name: string;
  email: string;
}

export interface Blog {
  author: Author;
  created_at: string;
  id: string;
  tags: string[];
  text: string;
  title: string;
  updated_at: string;
}
