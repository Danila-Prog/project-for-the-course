"use client";

import { User } from "@/entities";
import { createStrictContext, useStrictContext } from "@/shared/lib";
import { PropsWithChildren } from "react";

export interface AuthCtxProps {
  user: Omit<User, "password"> | null;
}
const AuthCtx = createStrictContext<AuthCtxProps>();

export const AuthCtxProvider = ({
  user,
  children,
}: PropsWithChildren<AuthCtxProps>) => {
  return <AuthCtx.Provider value={{ user }}>{children}</AuthCtx.Provider>;
};

export const useAuth = () => useStrictContext(AuthCtx);
