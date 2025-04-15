import { os } from "@orpc/server";

import { postsRouter } from "./routers/example";

export const router = os.router({
  posts: postsRouter,
});
