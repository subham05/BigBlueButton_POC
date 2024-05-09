export interface Post {
  body: any;
}
export interface CreatePost {
  userName: string;
  caption: string;
  tags: string[];
}
export interface UpdatePost {
  userName: string;
  caption: string;
  tags: string[];
  id: string;
}
