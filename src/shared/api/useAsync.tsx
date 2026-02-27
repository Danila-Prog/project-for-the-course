"use client";

import { useEffect, useState, type DependencyList } from "react";
import { StateSetter } from "../types";

type UseAsyncReturn<Data> = {
  data?: Data;
  setData: StateSetter<Data | undefined>;
  isError: boolean;
  isLoading: boolean;
  error?: Error;
};

export const useAsync = <Data,>(
  request: (() => Promise<Data>) | null | undefined,
  deps: DependencyList = [],
): UseAsyncReturn<Data> & { refetch: () => Promise<Data | undefined> } => {
  const [data, setData] = useState<Data | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const fetchData = async () => {
    if (!request) {
      setData(undefined);
      setIsLoading(false);
      setIsError(false);
      setError(undefined);
      return;
    }

    try {
      setIsLoading(true);
      const result = await request();
      setData(result);
      setIsError(false);
      setError(undefined);
      return result;
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      setError(err);
      setIsError(true);
      setData(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return {
    data,
    setData,
    isLoading,
    isError,
    error,
    refetch: fetchData,
  };
};
