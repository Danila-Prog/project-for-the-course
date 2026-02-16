"use client";

import { useSearchParams } from "next/navigation";
import { DriverPersonAccount } from "./DriverPersonAccount/DriverPersonAccount";
import { DriverRoutes } from "./DriverRoutes";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";

type DriverTabValue = "personAccount" | "routes";

type DriverComponentProps = {
  userId: string;
  driverId: string;
};

const tabComponents: Record<
  DriverTabValue,
  ComponentType<DriverComponentProps>
> = {
  personAccount: DriverPersonAccount,
  routes: DriverRoutes,
};

export const DriverFabric = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [driverId, setDriverId] = useState<string | null>(null);
  
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setDriverId(localStorage.getItem("driverId"));
  }, []);

  const searchParams = useSearchParams();

  const currentTabName =
    (searchParams.get("tab") as DriverTabValue) || "personAccount";

  const ComponentToRender = tabComponents[currentTabName];

  return <ComponentToRender driverId={driverId ?? ""} userId={userId ?? ""} />;
};
