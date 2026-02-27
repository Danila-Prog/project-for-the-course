"use client";

import { Route } from "@/entities/Route";
import { createStrictContext, useStrictContext } from "@/shared/lib";
import { StateSetter } from "@/shared/types";
import { ComponentType, PropsWithChildren, useState } from "react";

interface Props {
  RouteItem: ComponentType<{ route: Route; driverId: number }>;
  isUpdateRoute: boolean;
  setIsUpdateRoute: StateSetter<boolean>;
}

const InjectRouteCtx = createStrictContext<Props>();

export const InjectRouteProvider = ({
  children,
  RouteItem,
}: PropsWithChildren<Props>) => {
  const [isUpdateRoute, setIsUpdateRoute] = useState(false);

  return (
    <InjectRouteCtx.Provider
      value={{ RouteItem, isUpdateRoute, setIsUpdateRoute }}
    >
      {children}
    </InjectRouteCtx.Provider>
  );
};

export const useRouteDI = () => useStrictContext(InjectRouteCtx);
