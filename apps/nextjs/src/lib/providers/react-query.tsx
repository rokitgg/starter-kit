"use client";

import { api } from "@acme/api/clients/react";

import { useState } from "react";
import { ORPCContext } from "../context/orpc";
import { createORPCReactQueryUtils } from "@orpc/react-query";

export function ReactQueryProvider({
  children,
}: { children: React.ReactNode }) {
  const [orpc] = useState(() => createORPCReactQueryUtils(api));

  return <ORPCContext.Provider value={orpc}>{children}</ORPCContext.Provider>;
}
