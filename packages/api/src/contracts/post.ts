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
  .route({
    summary: "List Posts",
    method: "GET",
    description: "Retrieve all available posts",
    deprecated: false,
    tags: ["Posts"],
  })
  .output(z.array(PostSchema));

export const findPostContract = base
  .route({
    summary: "Find Post",
    method: "GET",
    description: "Retrieve a post by its ID",
    deprecated: false,
    tags: ["Posts"],
  })
  .input(PostSchema.pick({ id: true }))
  .output(PostSchema)
  .errors({
    NOT_FOUND: {
      message: "Post not found",
    },
  });

export const createPostContract = base
  .route({
    summary: "Create Post",
    description: "Create a new post",
    deprecated: false,
    successStatus: 201,
    tags: ["Posts"],
  })
  .input(PostSchema.omit({ id: true }))
  .output(PostSchema);

export const deletePostContract = base
  .route({
    summary: "Delete Post",
    description: "Delete a post by its ID",
    deprecated: false,
    tags: ["Posts"],
  })
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
  create: createPostContract,
  delete: deletePostContract,
};
