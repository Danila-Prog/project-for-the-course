import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";

export function useUpdate() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  const { drivers } = useFetch(userId);

  const updateDriverStatus = async (status: number) => {
    const response = await fetch("http://localhost:8080/api/drivers", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        driver_id: drivers?.driver_id,
        status_driver_id: status,
      }),
    });

    const data = await response.json();
    return data;
  };

  return { updateDriverStatus };
}
