"use client";

import { useEffect, useState } from "react";

export function useQuery<T>(url: string) {
  const [data, setData] = useState<T[]>([]);

  const fetchingData = async (signal: AbortSignal) => {
    try {
      const res = await fetch(`http://localhost:8080/${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Headers": "",
          "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE,OPTIONS",
        },
        signal: signal,
      });

      if (!res.ok) {
        throw new Error("Ошибка запроса");
      }

      const data = await res.json();

      setData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetchingData(signal);

    return () => abortController.abort("Abort controlled called");
  }, []);

  return { data };
}
