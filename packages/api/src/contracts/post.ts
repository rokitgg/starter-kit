import { oc } from "@orpc/contract";
import { z } from "zod";

import type { Post } from "../data/posts";

const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
}) satisfies z.ZodType<Post>;

// Base contract, defines common errors for posts contract
const base = oc.errors({
  NOT_FOUND: {
    message: "Not found",
  },
});

export const listPostsContract = base
  .input(
    z
      .object({
        limit: z.number().int().min(1).max(100).optional(),
        cursor: z.number().int().min(0).default(0),
      })
      .optional(),
  )
  .output(z.array(PostSchema));

export const findPostContract = base
  .input(PostSchema.pick({ id: true }))
  .output(PostSchema)
  .errors({
    NOT_FOUND: {
      message: "Post not found",
    },
  });

export const createPostContract = base
  .input(PostSchema.omit({ id: true }))
  .output(PostSchema);

export const removePostContract = base
  .input(PostSchema.pick({ id: true }))
  .output(
    z.object({
      success: z.boolean(),
    }),
  )
  .errors({
    NOT_FOUND: {
      message: "Post not found",
    },
  });

export const contract = {
  list: listPostsContract,
  find: findPostContract,
  delete: removePostContract,
  create: createPostContract,
};
