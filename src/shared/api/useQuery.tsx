import { useEffect, useState } from "react";

export function useQuery<T>(url: string) {
  const [data, setData] = useState<T[]>([]);

  const fetchingData = async (signal: AbortSignal) => {
    try {
      const res = await fetch(`http://localhost:8080/${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: signal,
      });

      if (!res.ok) throw new Error("Ошибка запроса");

      const data = await res.json();
      setData(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchingData(abortController.signal);
    return () => abortController.abort();
  }, [url]); // Добавьте url в зависимости

  return { data };
}
