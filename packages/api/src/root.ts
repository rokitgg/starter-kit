import { os } from "@orpc/server";

import { postRouter } from "./routers/post";

export const router = os.router({
  posts: postRouter,
});
