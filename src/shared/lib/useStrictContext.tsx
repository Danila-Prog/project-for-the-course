"use client";

import { Context, useContext } from "react";

export const useStrictContext = <T,>(context: Context<T>) => {
  const value = useContext(context);

  if (value === null) {
    throw new Error("Пустое значение контекста");
  }

  return value;
};
