import { toNextJsHandler } from "@acme/auth/nextjs"; // path to your auth file
import { auth } from "@acme/auth/server"; // path to your auth file

export const { POST, GET } = toNextJsHandler(auth);
