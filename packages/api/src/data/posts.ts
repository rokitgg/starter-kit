export const posts: Post[] = [
  {
    id: "1",
    title: "My first post",
    content: "This is my first post",
  },
  {
    id: "2",
    title: "My second post",
    content: "This is my second post",
  },
];

export interface Post {
  id: string;
  title: string;
  content: string;
}
