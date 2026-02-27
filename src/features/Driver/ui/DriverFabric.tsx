"use client";

import { useSearchParams } from "next/navigation";
import { DriverPersonAccount } from "./DriverPersonAccount";
import { DriverRoutes } from "./DriverRoutes";
import type { ComponentType } from "react";
import { useAuth, useDI } from "@/shared/lib";
import { useAsync } from "@/shared/api/useAsync";

type DriverTabValue = "personAccount" | "routes";

type DriverComponentProps = {
  userId: number;
  driverId: number;
};

const tabComponents: Record<
  DriverTabValue,
  ComponentType<DriverComponentProps>
> = {
  personAccount: DriverPersonAccount,
  routes: DriverRoutes,
};

export const DriverFabric = () => {
  const { user } = useAuth();
  const { driverService } = useDI();

  const { data: driver } = useAsync(() =>
    driverService.getDriverByUserId(user?.userId ?? 0),
  );
  const searchParams = useSearchParams();

  const currentTabName =
    (searchParams.get("tab") as DriverTabValue) || "personAccount";

  const ComponentToRender = tabComponents[currentTabName];

  return (
    <ComponentToRender
      driverId={driver?.driverId ?? 0}
      userId={user?.userId ?? 0}
    />
  );
};
