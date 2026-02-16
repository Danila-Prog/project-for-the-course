import { useEffect, useState } from "react";
import { useDI } from "@/shared/lib/di";
import { useAsync } from "./useAsync";

export function useUpdate() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);
  const { driverService } = useDI();

  const { data: drivers } = useAsync(() =>
    driverService.getDriverById(Number(userId)),
  );

  const updateDriverStatus = async (status: number) => {
    const response = await fetch("http://localhost:8080/api/drivers", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        driver_id: drivers?.driverId,
        update: { status_driver_id: status },
      }),
    });

    const data = await response.json();
    return data;
  };

  return { updateDriverStatus };
}
