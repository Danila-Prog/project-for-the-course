"use client";

import { User } from "@/entities";
import { PropsWithChildren } from "react";
import { createStrictContext } from "./createStrictContext";
import { useStrictContext } from "./useStrictContext";

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
