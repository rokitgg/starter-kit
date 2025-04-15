import { implement } from "@orpc/server";

import { contract } from "../contracts/post";
import { posts } from "../data/posts";
import { randomUUID as uuid } from "node:crypto";

const os = implement(contract);

export const listPosts = os.list.handler(() => posts);

export const findPost = os.find.handler(({ input, errors }) => {
  // In the production app, we would perform a database query here
  const post = posts.find((post) => post.id === input.id);

  if (!post) {
    throw errors.NOT_FOUND();
  }

  return post;
});

export const deletePost = os.delete.handler(({ input, errors }) => {
  const post = posts.find((post) => post.id === input.id);

  if (!post) {
    throw errors.NOT_FOUND();
  }

  posts.splice(posts.indexOf(post), 1);

  return { success: true };
});

export const createPost = os.create.handler(({ input, errors }) => {
  const post = { id: uuid(), ...input };
  posts.push(post);
  return post;
});

export const postRouter = os.router({
  list: listPosts,
  find: findPost,
  create: createPost,
  delete: deletePost,
});
